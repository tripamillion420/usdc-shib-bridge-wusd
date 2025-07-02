const fs = require('fs');
const path = require('path');

const configPath = path.resolve(__dirname, '../config/node.config.json');

function isAddress(value) {
  return typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value);
}

function validateConfig() {
  let config;

  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (err) {
    console.error("❌ Failed to load config file:", err.message);
    process.exit(1);
  }

  const requiredFields = [
    'nodeId',
    'ethRpc',
    'privateKeyPath',
    'wusdContractAddress',
    'boneTokenAddress',
    'treatTokenAddress',
    'boneBridgeAddress',
    'treatBridgeAddress',
    'minSignaturesRequired',
    'quorumNodes'
  ];

  let isValid = true;

  for (const field of requiredFields) {
    if (!(field in config)) {
      console.error(`❌ Missing required field: ${field}`);
      isValid = false;
    }
  }

  // Address format checks
  const addressFields = [
    'wusdContractAddress',
    'boneTokenAddress',
    'treatTokenAddress',
    'boneBridgeAddress',
    'treatBridgeAddress'
  ];

  for (const addr of addressFields) {
    if (!isAddress(config[addr])) {
      console.error(`❌ Invalid Ethereum address: ${addr} → ${config[addr]}`);
      isValid = false;
    }
  }

  if (!Array.isArray(config.quorumNodes) || config.quorumNodes.length < config.minSignaturesRequired) {
    console.error(`❌ quorumNodes must be an array and ≥ minSignaturesRequired`);
    isValid = false;
  }

  if (!isValid) {
    console.error("❌ Configuration validation failed. Fix errors and restart the node.");
    process.exit(1);
  }

  console.log("✅ Configuration is valid.");
  return config;
}

// Run validation if script is called directly
if (require.main === module) {
  validateConfig();
}

module.exports = { validateConfig };