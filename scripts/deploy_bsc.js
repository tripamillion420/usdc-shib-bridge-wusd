const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying to BSC with account:", deployer.address);

    const WrappedUSD = await ethers.getContractFactory("WrappedUSD");
    const wrappedUSD = await WrappedUSD.deploy();
    await wrappedUSD.deployed();
    console.log("WrappedUSD deployed at:", wrappedUSD.address);

    const BSCBridge = await ethers.getContractFactory("BSCBridge");
    const bridge = await BSCBridge.deploy(wrappedUSD.address);
    await bridge.deployed();
    console.log("BSCBridge deployed at:", bridge.address);

    await wrappedUSD.transferOwnership(bridge.address);
    console.log("Ownership of WrappedUSD transferred to BSCBridge.");
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
