# 🪙 USDC–SHIB–wUSD Bridge (Multi-Chain)

## Overview

This repository contains a full-stack implementation of a decentralized bridge allowing USDC-to-SHIB conversion with stablecoin wrapping into `wUSD`, plus support for multi-chain mint/burn events and debit card interoperability.

## Chain Support

- **Ethereum** – USDC, SHIB, wUSD (core contracts)
- **BSC** – Mirror of Ethereum contracts
- **Solana** – Rust-based token program
- **XRP** – Off-chain event listener integration
- **Dogecoin** – UTXO-based relayer minting

## Key Components

- `contracts/` – Solidity + Rust smart contracts
- `scripts/` – Deployment and interaction scripts
- `services/` – Relayers, messaging, and event ingestion
- `frontend/` – React dApp for user interaction
- `docs/` – Technical whitepapers and integration guides

## Setup

```bash
git clone https://github.com/tripamillion420/usdc-shib-bridge-wusd.git
cd usdc-shib-bridge-wusd
npm install
npx hardhat compile
