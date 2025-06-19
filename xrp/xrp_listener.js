const xrpl = require('xrpl');
require('dotenv').config();

const client = new xrpl.Client(process.env.XRP_RPC_URL);
const monitoredAddress = process.env.XRP_BRIDGE_ADDRESS;

async function listenForXRPDeposits(callback) {
  await client.connect();

  console.log(`🔍 Listening for XRP deposits to: ${monitoredAddress}`);

  client.request({
    command: 'subscribe',
    accounts: [monitoredAddress]
  });

  client.on('transaction', tx => {
    if (tx.transaction.Destination === monitoredAddress && tx.validated) {
      const amountXRP = parseFloat(tx.transaction.Amount) / 1_000_000;
      const userTag = tx.transaction.DestinationTag || 'unknown';

      console.log(`📩 Received ${amountXRP} XRP from tag: ${userTag}`);
      callback({
        userTag,
        amountXRP,
        txid: tx.transaction.hash,
        sourceAddress: tx.transaction.Account
      });
    }
  });
}

module.exports = { listenForXRPDeposits };
