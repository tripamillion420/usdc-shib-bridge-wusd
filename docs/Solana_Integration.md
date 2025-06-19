# Solana Integration for wUSD Bridge

## Overview

Solana support is built using Rust-based smart contracts and program listeners. Events are triggered from cross-chain sources and executed via CPIs or instruction handlers.

## Contract Structure

- **bridge_program.rs:** Handles `Mint` and `Burn` instructions.
- **utils.rs:** Encodes/decodes Solana bridge instructions.

## Workflow

- Relayer sends a serialized instruction to Solana.
- Program parses and logs the mint/burn intent.
- Token program handles mint logic (future implementation).

## Deployment

Use the included `bridge_deploy.sh` to compile and deploy the Solana program.

## Challenges

- Token metadata syncing
- Instruction signing from EVM chains
