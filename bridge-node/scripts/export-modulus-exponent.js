const fs = require('fs');
const path = require('path');
const forge = require('node-forge');

// Read the private key
const keyPath = path.join(__dirname, '../keys/node-private-key.pem');
const pem = fs.readFileSync(keyPath, 'utf8');

// Convert PEM to Forge private key object
const privateKey = forge.pki.privateKeyFromPem(pem);

// Extract modulus (n) and public exponent (e)
const modulusHex = privateKey.n.toString(16);
const exponentHex = privateKey.e.toString(16);

// Pad hex to even length
const formatHex = (h) => (h.length % 2 === 1 ? '0' + h : h);

console.log('🔐 RSA Public Key Components:');
console.log('Modulus (n):');
console.log(formatHex(modulusHex));
console.log('\nExponent (e):');
console.log(formatHex(exponentHex));
