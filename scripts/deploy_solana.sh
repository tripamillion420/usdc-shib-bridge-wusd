#!/bin/bash

PROGRAM_PATH="./solana/target/deploy/bridge_program.so"
KEYPAIR_PATH="$HOME/.config/solana/id.json"

echo "Deploying Solana program..."

solana config set --url https://api.devnet.solana.com

solana program deploy $PROGRAM_PATH --keypair $KEYPAIR_PATH

echo "Deployment complete."
