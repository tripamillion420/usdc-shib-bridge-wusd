# Dogecoin Integration for wUSD Bridge

## Summary

Dogecoin is integrated as a monitored UTXO source where users can lock DOGE, triggering a wUSD mint via relayer services.

## Flow

1. User sends DOGE to the bridge address.
2. `doge_relayer.js` detects the transaction.
3. The relayer computes DOGE→USD value.
4. `mintOnETH()` is called via CrossChainMessenger.js to mint wUSD.

## Conversion Rate

Example: 1 DOGE = $0.01 USD  
Values should be confirmed via price feed APIs.

## Future Improvements

- Real-time price feed integration
- DOGE burn-on-wUSD-burn via reverse UTXO mechanism
