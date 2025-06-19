const { ethers } = require("ethers");
const bridgeAbi = require("../artifacts/contracts/USDCtoSHIBBridge.sol/USDCtoSHIBBridge.json").abi;

const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const bridge = new ethers.Contract(process.env.ETH_BRIDGE_ADDRESS, bridgeAbi, wallet);

function startListening(callback) {
    bridge.on("Deposit", (user, usdcAmount, shibReceived, wrappedUsdMinted) => {
        const event = {
            chain: 'ethereum',
            user,
            value: wrappedUsdMinted.toString(),
            type: 'mint',
        };
        callback(event);
    });
}

function handleMessage(event) {
    if (event.type === 'burn') {
        console.log(`[ETH] Handling burn event from ${event.chain}`);
        // Example: emit equivalent off-chain instruction or log
    }
}

module.exports = { startListening, handleMessage };
