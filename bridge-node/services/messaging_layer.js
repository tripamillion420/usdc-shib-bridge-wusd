const fs = require('fs');
const { ethers } = require('ethers');
require('dotenv').config();

// 🔽 Load node config
const config = require('../config/node.config.json');

// 🔽 Initialize provider + signer
const provider = new ethers.JsonRpcProvider(config.ethRpc);
const privateKey = fs.readFileSync(config.privateKeyPath, 'utf8').trim();
const signer = new ethers.Wallet(privateKey, provider);

// 🔽 Mock listener to simulate event (replace with real listener logic)
function listenForBridgeEvents() {
  console.log("👂 Listening for bridge events...");
  
  // Simulate incoming event
  setTimeout(async () => {
    const recipient = "0xAbc123..."; // Replace with real user address
    const amount = ethers.parseUnits("10", 18);
    const quorumProof = "dummy-signatures";

    const { executeMint } = require('../core/executor');
    await executeMint(recipient, amount, quorumProof);
  }, 3000);
}

// Start service
listenForBridgeEvents();