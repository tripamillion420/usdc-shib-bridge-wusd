📘 BONEBridge.sol Documentation

Overview
--------
The BONEBridge contract allows users to deposit BONE tokens and mint wUSD in return.
It maintains a configurable conversion rate between BONE and wUSD.
This supports SHIB ecosystem’s decentralized utility.

Installation & Setup
--------------------
1. Clone the Repo
   git clone https://github.com/tripamillion420/usdc-shib-bridge-wusd
   cd usdc-shib-bridge-wusd

2. Install Dependencies
   npm install

3. Install Solidity Libraries (if needed)
   npm install @openzeppelin/contracts

Contract: BONEBridge.sol
------------------------
Constructor:
  constructor(address _boneToken, address _wUSD)
  - _boneToken: ERC-20 BONE token address
  - _wUSD: Mintable wUSD contract address

Functions:

depositAndMint(uint256 boneAmount)
  - Transfers BONE from sender
  - Mints wUSD based on boneToUSD conversion rate

setConversionRate(uint256 newRate)
  - Admin-only update for boneToUSD (e.g., 1e16 = $0.01)

Security:
  - Uses Ownable to restrict sensitive functions

Deployment Example
------------------
Use ethers.js to deploy manually with ABI and bytecode.

Use Cases
---------
- Bridge BONE to wUSD
- Governance staking in bridge node runner logic
