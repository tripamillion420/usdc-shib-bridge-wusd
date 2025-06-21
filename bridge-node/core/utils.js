function createEventMessage({ chain, type, user, amount, txid, timestamp }) {
  return {
    chain,
    type,
    user,
    amount,
    txid,
    timestamp,
  };
}

module.exports = {
  createEventMessage,
};
