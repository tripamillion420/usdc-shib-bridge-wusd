// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IWUSD {
    function mint(address to, uint256 amount) external;
}

contract BONEBridge is Ownable {
    address public immutable boneToken;
    IWUSD public wUSD;
    uint256 public boneToUSD = 1e16; // Example: 1 BONE = $0.01

    constructor(address _boneToken, address _wUSD) {
        boneToken = _boneToken;
        wUSD = IWUSD(_wUSD);
    }

    function setConversionRate(uint256 newRate) external onlyOwner {
        boneToUSD = newRate;
    }

    function depositAndMint(uint256 boneAmount) external {
        require(IERC20(boneToken).transferFrom(msg.sender, address(this), boneAmount), "Transfer failed");

        uint256 usdAmount = (boneAmount * boneToUSD) / 1e18;
        wUSD.mint(msg.sender, usdAmount);
    }
}