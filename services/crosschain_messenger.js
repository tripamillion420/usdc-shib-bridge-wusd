async function relayMint(destinationChainService, user, amount) {
    const event = {
        chain: 'manual',
        type: 'mint',
        user,
        value: amount.toString(),
    };
    destinationChainService.handleMessage(event);
}

async function relayBurn(destinationChainService, user, amount) {
    const event = {
        chain: 'manual',
        type: 'burn',
        user,
        value: amount.toString(),
    };
    destinationChainService.handleMessage(event);
}

module.exports = { relayMint, relayBurn };
