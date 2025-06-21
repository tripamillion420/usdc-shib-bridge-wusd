const crypto = require('crypto');
const fs = require('fs');

const privateKey = fs.readFileSync('./keys/node-private-key.pem', 'utf8');

function signMessage(message) {
  const messageHash = crypto.createHash('sha256').update(JSON.stringify(message)).digest();
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(messageHash);
  const signature = signer.sign(privateKey, 'base64');

  return {
    ...message,
    signature,
    signerId: require('../config/node.config.json').nodeId
  };
}

module.exports = { signMessage };
