const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("USDCtoSHIBBridge", function () {
  let bridge, wrappedUSD, usdc, shib, owner, user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("ERC20");
    usdc = await Token.deploy("USD Coin", "USDC");
    shib = await Token.deploy("Shiba Inu", "SHIB");

    const WrappedUSD = await ethers.getContractFactory("WrappedUSD");
    wrappedUSD = await WrappedUSD.deploy();
    await wrappedUSD.deployed();

    const Bridge = await ethers.getContractFactory("USDCtoSHIBBridge");
    bridge = await Bridge.deploy(usdc.address, shib.address, wrappedUSD.address, ethers.constants.AddressZero);

    await wrappedUSD.transferOwnership(bridge.address);
    await usdc.mint(user.address, ethers.utils.parseUnits("100", 18));
  });

  it("should allow deposit of USDC and mint wUSD", async () => {
    const depositAmount = ethers.utils.parseUnits("50", 18);

    await usdc.connect(user).approve(bridge.address, depositAmount);
    const tx = await bridge.connect(user).deposit(depositAmount);
    await tx.wait();

    const wUSDBalance = await wrappedUSD.balanceOf(user.address);
    expect(wUSDBalance.gt(0)).to.be.true;
  });

  it("should allow withdrawal in USDC", async () => {
    const depositAmount = ethers.utils.parseUnits("100", 18);
    await usdc.connect(user).approve(bridge.address, depositAmount);
    await bridge.connect(user).deposit(depositAmount);

    const wUSDBalance = await wrappedUSD.balanceOf(user.address);
    await wrappedUSD.connect(user).approve(bridge.address, wUSDBalance);

    await bridge.connect(user).withdraw(wUSDBalance, true);
    const usdcBalanceAfter = await usdc.balanceOf(user.address);

    expect(usdcBalanceAfter.gt(0)).to.be.true;
  });
});
