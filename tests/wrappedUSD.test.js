const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WrappedUSD", function () {
  let wrappedUSD, owner, user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const WrappedUSD = await ethers.getContractFactory("WrappedUSD");
    wrappedUSD = await WrappedUSD.deploy();
  });

  it("should mint tokens by owner", async () => {
    await wrappedUSD.mint(user.address, ethers.utils.parseUnits("100", 18));
    const balance = await wrappedUSD.balanceOf(user.address);
    expect(balance.toString()).to.equal(ethers.utils.parseUnits("100", 18).toString());
  });

  it("should burn tokens by owner", async () => {
    const amount = ethers.utils.parseUnits("50", 18);
    await wrappedUSD.mint(user.address, amount);
    await wrappedUSD.burn(user.address, amount);
    const balance = await wrappedUSD.balanceOf(user.address);
    expect(balance.toString()).to.equal("0");
  });

  it("should restrict minting to owner", async () => {
    await expect(wrappedUSD.connect(user).mint(user.address, 100)).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
