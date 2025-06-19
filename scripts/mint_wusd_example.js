const { ethers } = require("hardhat");

async function main() {
    const [user] = await ethers.getSigners();

    const bridgeAddress = "0xYourBridgeAddress";
    const usdcAddress = "0xYourUSDCAddress";

    const Bridge = await ethers.getContractAt("USDCtoSHIBBridge", bridgeAddress);
    const USDC = await ethers.getContractAt("IERC20", usdcAddress);

    const amountToDeposit = ethers.utils.parseUnits("100", 6); // 100 USDC

    // Approve Bridge to spend user's USDC
    const approval = await USDC.approve(bridgeAddress, amountToDeposit);
    await approval.wait();
    console.log("Approved Bridge to spend USDC.");

    const tx = await Bridge.deposit(amountToDeposit);
    await tx.wait();

    console.log("Minted wUSD from USDC deposit.");
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
