const { ethers } = require('ethers');
const fs = require('fs');
require('dotenv').config();

// 🔽 Load bridge config
const config = require('../config/node.config.json');

// 🔽 Load TREAT ABI (assumes you placed it in ./abis/)
const treatAbi = JSON.parse(fs.readFileSync('./abis/TREATToken.json', 'utf8'));

// 🔽 Ethers provider and signer
const provider = new ethers.JsonRpcProvider(config.ethRpc);
const privateKey = fs.readFileSync(config.privateKeyPath, 'utf8').trim();
const signer = new ethers.Wallet(privateKey, provider);

// 🔽 TREAT contract instance
const treatContract = new ethers.Contract(config.treatTokenAddress, treatAbi, signer);

async function executeMint(recipient, usdAmount, quorumProof) {
  console.log(`✅ Executing mint of ${usdAmount} wUSD to ${recipient}`);

  // 👉 TODO: Call the actual mint function on wUSD contract here...

  // 🎁 Mint TREAT to this node as a reward
  const reward = ethers.parseUnits("0.001", 18); // 0.001 TREAT
  try {
    const tx = await treatContract.mint(signer.address, reward);
    await tx.wait();
    console.log(`🎉 Minted ${reward} TREAT to node ${signer.address}`);
  } catch (err) {
    console.error("❌ Reward mint failed:", err.message);
  }
}

module.exports = {
  executeMint
};