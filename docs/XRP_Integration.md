# XRP Integration for wUSD Bridge

## Overview

The XRP integration enables off-chain XRP deposits to trigger minting of wUSD on EVM-compatible chains. This is handled by a relayer service that watches XRP Ledger addresses and forwards valid transactions to the bridge.

## Architecture

- Users send XRP to a designated bridge wallet with metadata.
- The bridge relayer validates incoming payments.
- The relayer calls `XRPBridge.mintFromXRP()` on Ethereum with equivalent USD value.

## Components

- **Relayer Service:** Monitors XRP Ledger wallet activity.
- **XRPBridge.sol:** Solidity contract that allows controlled minting/burning of wUSD.
- **Conversion Logic:** USD value is computed using oracle or fixed exchange rate.

## Security

- XRP → ETH bridge is custodial; secure key management is required.
- Use transaction memos or off-chain auth to verify deposits.
