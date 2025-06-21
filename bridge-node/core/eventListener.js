const { createEventMessage } = require('./utils');

function simulateEventDetection(callback) {
  const message = createEventMessage({
    chain: 'DOGE',
    type: 'lock',
    user: 'D9ExampleDogecoinAddress',
    amount: '100.0',
    txid: 'abc123txid',
    timestamp: Date.now()
  });

  callback(message);
}

module.exports = { simulateEventDetection };
