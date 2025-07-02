# 🪙 USDC–SHIB–wUSD Bridge (Multi-Chain)

## Overview

This open-source project implements a **decentralized, cross-chain bridge** that enables stablecoin minting from **USDC**, **SHIB**, **DOGE**, **BONE**, and **TREAT** across **Ethereum, BSC, Solana, XRP**, and **Dogecoin**. It includes support for event-driven minting/burning of `wUSD` (wrapped USD) and now supports **governance and rewards** via the SHIB ecosystem tokens **BONE** and **TREAT**.

---

## 🌐 Supported Chains

| Chain     | Assets              | Functionality                  |
|-----------|---------------------|-------------------------------|
| Ethereum  | USDC, SHIB, BONE, TREAT | Core smart contracts and mint logic |
| BSC       | USDC, SHIB          | Mirror of Ethereum logic      |
| Solana    | SHIB                | Rust-based SPL token program  |
| XRP       | XRP                 | Off-chain event relay to ETH  |
| Dogecoin  | DOGE                | UTXO listener and relayer     |

---

## 🧩 Key Components

- **contracts/** – Solidity + Rust smart contracts (WrappedUSD, BONEBridge, TREATBridge, relayer entrypoints)
- **scripts/** – Deployment scripts (e.g., deploy_eth.js, deploy_bone.js)
- **bridge-node/** – Independent node runner with quorum logic and mint execution
- **services/** – Event listeners for DOGE, XRP, Solana, Ethereum
- **frontend/** – React dApp UI to bridge SHIB, BONE, TREAT and more
- **docs/** – Technical whitepapers and per-chain integration details

---

## 🔁 New BONE & TREAT Integration

### ✅ BONE
- **Bridgeable Asset:** BONE can now be deposited and converted into wUSD via `BONEBridge.sol`.
- **Governance Layer:** BONE will serve as the staking token for validator quorum and DAO decision-making in future phases.

### ✅ TREAT
- **Bridgeable Asset:** Users may deposit TREAT to mint wUSD using `TREATBridge.sol`.
- **Reward Mechanism:** Node runners are rewarded in TREAT when successfully executing mint operations.

### Frontend Support
- Users can now select **BONE** and **TREAT** in the dApp dropdown and bridge them just like USDC or SHIB.

---

## 🧠 Architecture Highlights

- ✅ Quorum-based node runner consensus using `bridge-node/`
- ✅ Configurable `node.config.json` with address mapping and chain support
- ✅ Live `/status`, `/health`, and `/config` endpoints for node monitoring
- ✅ Chain-agnostic relayer layer for DOGE, XRP, and Solana
- ✅ Frontend powered by ethers.js with MetaMask compatibility

---

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/tripamillion420/usdc-shib-bridge-wusd
cd usdc-shib-bridge-wusd
npm install

Run the bridge node:
bash 
node bridge-node/scripts/start-node.js

Start the frontend:
bash
cd frontend
npm start