const { ethers } = require('ethers');
const WrappedUSDAbi = require('../artifacts/contracts/WrappedUSD.sol/WrappedUSD.json').abi;

require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const wrappedUSD = new ethers.Contract(process.env.WRAPPEDUSD_ADDRESS, WrappedUSDAbi, wallet);

async function mintFromXRP(userEthAddress, xrpAmount) {
  const usdEquivalent = xrpAmount * 0.5; // Example: 1 XRP = $0.50
  const mintAmount = ethers.utils.parseUnits(usdEquivalent.toFixed(2), 18);

  console.log(`🪙 Minting ${usdEquivalent} wUSD to ${userEthAddress} from XRP...`);

  const tx = await wrappedUSD.mint(userEthAddress, mintAmount);
  await tx.wait();

  console.log(`✅ wUSD minted: ${tx.hash}`);
}

module.exports = { mintFromXRP };
