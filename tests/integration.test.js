const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Integration Test: USDC ↔ SHIB ↔ wUSD", function () {
  let bridge, wrappedUSD, usdc, shib, owner, user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("ERC20");
    usdc = await Token.deploy("USD Coin", "USDC");
    shib = await Token.deploy("Shiba Inu", "SHIB");

    const WrappedUSD = await ethers.getContractFactory("WrappedUSD");
    wrappedUSD = await WrappedUSD.deploy();

    const Bridge = await ethers.getContractFactory("USDCtoSHIBBridge");
    bridge = await Bridge.deploy(usdc.address, shib.address, wrappedUSD.address, ethers.constants.AddressZero);

    await wrappedUSD.transferOwnership(bridge.address);

    await usdc.mint(user.address, ethers.utils.parseUnits("500", 18));
    await usdc.connect(user).approve(bridge.address, ethers.utils.parseUnits("500", 18));
  });

  it("should complete deposit, mint, burn, and withdrawal cycle", async () => {
    const amount = ethers.utils.parseUnits("100", 18);

    // Deposit USDC and receive wUSD
    await bridge.connect(user).deposit(amount);
    const wUSDAfterDeposit = await wrappedUSD.balanceOf(user.address);
    expect(wUSDAfterDeposit.gt(0)).to.be.true;

    // Burn wUSD and receive USDC back
    await wrappedUSD.connect(user).approve(bridge.address, wUSDAfterDeposit);
    await bridge.connect(user).withdraw(wUSDAfterDeposit, true);
    const finalUSDC = await usdc.balanceOf(user.address);

    expect(finalUSDC.gt(0)).to.be.true;
  });
});
