const { mintOnETH } = require('./CrossChainMessenger');

async function relayLockEvent(event) {
  console.log("🔁 Relaying DOGE lock event to Ethereum...");

  const { user, amount } = event;

  const usdEquivalent = parseFloat(amount) * 0.01; // Example conversion: 1 DOGE = 0.01 USD
  await mintOnETH(user, usdEquivalent);
}

module.exports = { relayLockEvent };
