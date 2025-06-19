# Binance Smart Chain Integration

## Summary

BSC support mirrors Ethereum’s architecture. It uses the same WrappedUSD contract and a dedicated BSCBridge contract for mint/burn control.

## Smart Contracts

- `WrappedUSD.sol` – deployed to BSC
- `BSCBridge.sol` – accepts cross-chain messages and mints/burns tokens

## Workflow

- Event is received from Ethereum or Solana.
- Relayer service calls `lockOnBSC()` or `releaseFromBSC()`.

## Deployment

Use `deploy_bsc.js` for Hardhat deployment to BSC mainnet or testnet.

## Security Considerations

- Relayer service must be trusted or decentralized
- Contract ownership should be transferred to DAO in the future
