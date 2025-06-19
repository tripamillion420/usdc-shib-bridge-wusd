const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with account:", deployer.address);

    // Deploy WrappedUSD
    const WrappedUSD = await ethers.getContractFactory("WrappedUSD");
    const wrappedUSD = await WrappedUSD.deploy();
    await wrappedUSD.deployed();
    console.log("WrappedUSD deployed at:", wrappedUSD.address);

    // Replace with actual USDC and SHIB token addresses and DEX router
    const USDC = "0xYourUSDCAddress";
    const SHIB = "0xYourSHIBAddress";
    const DEX_ROUTER = "0xYourUniswapRouterAddress";

    // Deploy USDCtoSHIBBridge
    const Bridge = await ethers.getContractFactory("USDCtoSHIBBridge");
    const bridge = await Bridge.deploy(USDC, SHIB, wrappedUSD.address, DEX_ROUTER);
    await bridge.deployed();
    console.log("Bridge deployed at:", bridge.address);

    // Transfer ownership of WrappedUSD to the Bridge
    await wrappedUSD.transferOwnership(bridge.address);
    console.log("Transferred ownership of WrappedUSD to Bridge.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
