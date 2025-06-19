#!/bin/bash

echo "🔐 Generating new Solana keypair..."
solana-keygen new --outfile ~/.config/solana/id.json --force

echo "💸 Airdropping 2 SOL to devnet wallet..."
solana airdrop 2 ~/.config/solana/id.json

echo "👛 Wallet setup complete:"
solana address
