const { ethers } = require("ethers");
const bridgeAbi = require("../artifacts/contracts/BSCBridge.sol/BSCBridge.json").abi;

const provider = new ethers.providers.JsonRpcProvider(process.env.BSC_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const bridge = new ethers.Contract(process.env.BSC_BRIDGE_ADDRESS, bridgeAbi, wallet);

function startListening(callback) {
    bridge.on("TokensLocked", (user, amount) => {
        const event = {
            chain: 'bsc',
            user,
            value: amount.toString(),
            type: 'mint',
        };
        callback(event);
    });
}

function handleMessage(event) {
    if (event.type === 'mint') {
        console.log(`[BSC] Minting wUSD to ${event.user} from ${event.chain}`);
        bridge.lockOnBSC(event.user, event.value).then(tx => tx.wait());
    }
}

module.exports = { startListening, handleMessage };
