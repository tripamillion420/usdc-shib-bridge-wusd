const signatureStore = {};

// Save a signature for a transaction
function storeSignature(message) {
  const key = message.txid;
  if (!signatureStore[key]) {
    signatureStore[key] = [];
  }

  const alreadyExists = signatureStore[key].some(sig => sig.signerId === message.signerId);
  if (!alreadyExists) {
    signatureStore[key].push(message);
  }

  return signatureStore[key];
}

// Check if quorum is met
function hasQuorum(txid, quorumSize) {
  return (
    signatureStore[txid] &&
    signatureStore[txid].length >= quorumSize
  );
}

// Get full list of messages for a quorum
function getSignedQuorum(txid) {
  return signatureStore[txid] || [];
}

module.exports = {
  storeSignature,
  hasQuorum,
  getSignedQuorum,
};
