const doge = require('dogecoin-core');

const client = new doge({
  host: '127.0.0.1',
  port: 22555,
  username: 'rpcuser',     // Set this to your Dogecoin node RPC username
  password: 'rpcpassword', // Set this to your Dogecoin node RPC password
});

async function lockDOGE(amount, userAddress) {
  const bridgeAddress = process.env.DOGE_BRIDGE_ADDRESS;
  const txid = await client.sendToAddress(bridgeAddress, amount);
  console.log(`🔐 Locked ${amount} DOGE from ${userAddress} -> TXID: ${txid}`);

  emitLockEvent(userAddress, amount, txid);
}

function emitLockEvent(userAddress, amount, txid) {
  const event = {
    chain: 'dogecoin',
    user: userAddress,
    amount,
    txid,
    type: 'lock',
  };
  console.log("📡 Emitting lock event:", event);

  // This is where you would pass the event to a relay queue
  require('./doge_relayer').relayLockEvent(event);
}

module.exports = { lockDOGE };
