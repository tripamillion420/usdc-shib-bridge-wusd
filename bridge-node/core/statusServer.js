const express = require('express');
const fs = require('fs');
const { ethers } = require('ethers');
const config = require('../config/node.config.json');

const app = express();
const PORT = process.env.BRIDGE_NODE_PORT || 3000;

// /status – simple ping
app.get('/status', (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    nodeId: config.nodeId
  });
});

// /health – check RPC, private key, and contract fields
app.get('/health', async (req, res) => {
  const health = {
    nodeId: config.nodeId,
    rpcConnected: false,
    signerLoaded: false,
    contractsConfigured: true
  };

  try {
    const provider = new ethers.JsonRpcProvider(config.ethRpc);
    await provider.getBlockNumber();
    health.rpcConnected = true;
  } catch {
    health.rpcConnected = false;
  }

  try {
    const key = fs.readFileSync(config.privateKeyPath, 'utf8').trim();
    const wallet = new ethers.Wallet(key);
    health.signerLoaded = wallet.address.length === 42;
  } catch {
    health.signerLoaded = false;
  }

  const requiredContracts = [
    config.wusdContractAddress,
    config.boneBridgeAddress,
    config.treatBridgeAddress,
    config.boneTokenAddress,
    config.treatTokenAddress
  ];

  health.contractsConfigured = requiredContracts.every(addr => typeof addr === 'string' && addr.startsWith("0x"));

  res.json(health);
});

// /config – non-sensitive config echo
app.get('/config', (req, res) => {
  const safeConfig = {
    nodeId: config.nodeId,
    minSignaturesRequired: config.minSignaturesRequired,
    quorumNodes: config.quorumNodes,
    contracts: {
      wusd: config.wusdContractAddress,
      boneBridge: config.boneBridgeAddress,
      treatBridge: config.treatBridgeAddress
    }
  };
  res.json(safeConfig);
});

// Start server
app.listen(PORT, () => {
  console.log(`📡 Status server running at http://localhost:${PORT}/status`);
});