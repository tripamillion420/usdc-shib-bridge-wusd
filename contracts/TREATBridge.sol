// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ITREAT {
    function mint(address to, uint256 amount) external;
}

contract TREATBridge is Ownable {
    address public immutable treatToken;
    IWUSD public wUSD;
    uint256 public treatToUSD = 5e15; // Example: 1 TREAT = $0.005

    constructor(address _treatToken, address _wUSD) {
        treatToken = _treatToken;
        wUSD = IWUSD(_wUSD);
    }

    function setConversionRate(uint256 newRate) external onlyOwner {
        treatToUSD = newRate;
    }

    function depositAndMint(uint256 treatAmount) external {
        require(IERC20(treatToken).transferFrom(msg.sender, address(this), treatAmount), "Transfer failed");

        uint256 usdAmount = (treatAmount * treatToUSD) / 1e18;
        wUSD.mint(msg.sender, usdAmount);
    }
}