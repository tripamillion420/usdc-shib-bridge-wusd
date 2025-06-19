const { listenForXRPDeposits } = require('./xrp_listener');
const { mintFromXRP } = require('./xrp_minter');

// Example ETH address registry for user tags (you’d want a DB in production)
const userRegistry = {
  1001: "0xAbC123...User1",
  1002: "0xDeF456...User2"
};

listenForXRPDeposits(async ({ userTag, amountXRP, txid }) => {
  const userEthAddress = userRegistry[userTag];
  if (!userEthAddress) {
    console.warn(`⚠️ No ETH address found for tag: ${userTag}`);
    return;
  }

  console.log(`🔁 Relaying XRP deposit (${amountXRP}) to ETH address: ${userEthAddress}`);
  await mintFromXRP(userEthAddress, amountXRP);
});
