const { ethers } = require("hardhat");

async function main() {
    const [user] = await ethers.getSigners();

    const bridgeAddress = "0xYourBridgeAddress";
    const Bridge = await ethers.getContractAt("USDCtoSHIBBridge", bridgeAddress);

    const amount = ethers.utils.parseUnits("50", 18); // 50 wUSD

    const withdrawAsUSDC = true;

    const tx = await Bridge.withdraw(amount, withdrawAsUSDC);
    await tx.wait();

    console.log("wUSD burned and withdrawal processed as", withdrawAsUSDC ? "USDC" : "SHIB");
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
