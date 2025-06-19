const { ethers } = require('ethers');
const WrappedUSDAbi = require('../artifacts/contracts/WrappedUSD.sol/WrappedUSD.json').abi;

const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const wrappedUSD = new ethers.Contract(process.env.WRAPPEDUSD_ADDRESS, WrappedUSDAbi, wallet);

async function mintOnETH(user, usdValue) {
  try {
    const tx = await wrappedUSD.mint(user, ethers.utils.parseUnits(usdValue.toString(), 18));
    await tx.wait();
    console.log(`✅ Minted ${usdValue} wUSD on Ethereum for ${user}`);
  } catch (err) {
    console.error("❌ Mint failed:", err.message);
  }
}

async function burnOnETH(user, usdValue) {
  try {
    const tx = await wrappedUSD.burn(user, ethers.utils.parseUnits(usdValue.toString(), 18));
    await tx.wait();
    console.log(`🔥 Burned ${usdValue} wUSD on Ethereum from ${user}`);
  } catch (err) {
    console.error("❌ Burn failed:", err.message);
  }
}

module.exports = {
  mintOnETH,
  burnOnETH,
};
