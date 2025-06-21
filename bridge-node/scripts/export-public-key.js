const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const PRIVATE_KEY_PATH = path.join(__dirname, '../keys/node-private-key.pem');
const PUBLIC_KEY_PATH = path.join(__dirname, '../keys/node-public-key.pem');

// Read the private key from file
const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');

// Export the public key
const { publicKey } = crypto.createPublicKey({
  key: privateKey,
  format: 'pem'
});

fs.writeFileSync(PUBLIC_KEY_PATH, publicKey.export({ type: 'spki', format: 'pem' }));
console.log(`✅ Public key written to: ${PUBLIC_KEY_PATH}`);
