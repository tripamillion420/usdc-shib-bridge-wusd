const EventEmitter = require('events');
const nodeBus = new EventEmitter();

// Broadcast message to simulated peers
function broadcastToPeers(signedMessage) {
  console.log(`📡 Broadcasting message from ${signedMessage.signerId}`);
  setTimeout(() => {
    nodeBus.emit('message', signedMessage);
  }, 100); // Simulated delay
}

// Subscribe to incoming messages
function onMessage(callback) {
  nodeBus.on('message', callback);
}

module.exports = {
  broadcastToPeers,
  onMessage,
};
