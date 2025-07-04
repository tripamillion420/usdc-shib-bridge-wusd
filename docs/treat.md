📘 TREATBridge.sol Documentation

Overview
--------
The TREATBridge contract lets users deposit TREAT tokens and mint wUSD.
It supports a configurable conversion rate and acts as a bridge and reward mechanism.

Installation & Setup
--------------------
1. Clone the Repo
   git clone https://github.com/tripamillion420/usdc-shib-bridge-wusd
   cd usdc-shib-bridge-wusd

2. Install Dependencies
   npm install

3. Install Solidity Libraries (if needed)
   npm install @openzeppelin/contracts

Contract: TREATBridge.sol
-------------------------
Constructor:
  constructor(address _treatToken, address _wUSD)
  - _treatToken: ERC-20 TREAT token address
  - _wUSD: Mintable wUSD contract address

Functions:

depositAndMint(uint256 treatAmount)
  - Transfers TREAT from sender
  - Mints wUSD using treatToUSD conversion rate

setConversionRate(uint256 newRate)
  - Admin-only function to adjust conversion (e.g., 5e15 = $0.005)

Security:
  - OpenZeppelin Ownable used for access control

Deployment Example
------------------
Deploy using ethers.js or Hardhat with ABI and bytecode.

Use Cases
---------
- Convert TREAT to wUSD
- Reward bridge node operators and users