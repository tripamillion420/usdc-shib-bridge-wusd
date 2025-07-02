require('dotenv').config();
const fs = require('fs');
const { ethers } = require('ethers');

// ✅ Step 1: Validate configuration before anything else
const { validateConfig } = require('../utils/validateConfig');
const config = validateConfig();

// ✅ Step 2: Load private key
const privateKey = fs.readFileSync(config.privateKeyPath, 'utf8').trim();
const provider = new ethers.JsonRpcProvider(config.ethRpc);
const signer = new ethers.Wallet(privateKey, provider);

// ✅ Step 3: Start status server
require('../core/statusServer');

// ✅ Step 4: Import executor and simulate mint job
const { executeMint } = require('../core/executor');

// 🔁 Simulate event handling (replace this with relayer logic)
function simulateIncomingMint() {
  console.log(`👂 Node ${config.nodeId} is simulating event listener...`);

  setTimeout(async () => {
    const recipient = "0x1234567890abcdef1234567890abcdef12345678";
    const usdAmount = ethers.parseUnits("10", 18);
    const fakeProof = "mock-quorum-signatures";

    console.log(`📬 Received mock event for recipient: ${recipient}`);
    await executeMint(recipient, usdAmount, fakeProof);
  }, 3000);
}

simulateIncomingMint();