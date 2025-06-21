const { simulateEventDetection } = require('../core/eventListener');
const { signMessage } = require('../core/signer');
const { broadcastToPeers, onMessage } = require('../core/broadcaster');
const { storeSignature, hasQuorum, getSignedQuorum } = require('../core/quorumValidator');
const { executeMint } = require('../core/executor');
const config = require('../config/node.config.json');

function startNode() {
  simulateEventDetection(message => {
    const signedMessage = signMessage(message);
    broadcastToPeers(signedMessage);
  });

  onMessage(msg => {
    const sigs = storeSignature(msg);
    console.log(`🔏 Received signature from ${msg.signerId} for txid ${msg.txid}`);
    if (hasQuorum(msg.txid, config.quorumSize)) {
      executeMint(getSignedQuorum(msg.txid));
    }
  });
}

startNode();
