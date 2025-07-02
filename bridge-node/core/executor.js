const { ethers } = require('ethers');
const fs = require('fs');
const config = require('../config/node.config.json');
require('dotenv').config();

// Load ABI + Contract
const treatAbi = JSON.parse(fs.readFileSync('./abis/TREATToken.json', 'utf8'));
const treatAddress = config.treatTokenAddress; // Add this to node.config.json

const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const treatContract = new ethers.Contract(treatAddress, treatAbi, signer);

async function executeMint(recipient, usdAmount, quorumProof) {
  console.log(`✅ Executing mint of ${usdAmount} wUSD to ${recipient}`);

  // Your wUSD minting logic here...

  // ⛏ Reward node runner with TREAT
  const reward = ethers.parseUnits('0.001', 18); // Adjust as needed
  try {
    const rewardTx = await treatContract.mint(signer.address, reward);
    await rewardTx.wait();
    console.log(`🎉 Node rewarded with ${reward} TREAT`);
  } catch (err) {
    console.error(`❌ Reward mint failed:`, err);
  }
}

module.exports = { executeMint };