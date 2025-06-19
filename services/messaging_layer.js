const ethService = require('./messaging_service_eth');
const bscService = require('./messaging_service_bsc');
const solanaService = require('./messaging_service_solana');

console.log("Starting messaging layer...");

ethService.startListening((event) => {
    console.log("ETH event received:", event);
    bscService.handleMessage(event);
    solanaService.handleMessage(event);
});

bscService.startListening((event) => {
    console.log("BSC event received:", event);
    ethService.handleMessage(event);
    solanaService.handleMessage(event);
});

solanaService.startListening((event) => {
    console.log("Solana event received:", event);
    ethService.handleMessage(event);
    bscService.handleMessage(event);
});
