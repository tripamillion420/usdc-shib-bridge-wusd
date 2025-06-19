#!/bin/bash

PROGRAM_SO=../target/deploy/bridge_program.so
KEYPAIR_PATH=$HOME/.config/solana/id.json

echo "🔧 Setting up Solana CLI config..."
solana config set --url https://api.devnet.solana.com

echo "📦 Building Solana program..."
cargo build-bpf --manifest-path ../Cargo.toml

echo "🚀 Deploying bridge program..."
solana program deploy $PROGRAM_SO --keypair $KEYPAIR_PATH

echo "✅ Deployment complete."
