// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./WrappedUSD.sol";

contract BSCBridge is Ownable {
    WrappedUSD public wrappedUsd;

    constructor(address _wrappedUsd) {
        wrappedUsd = WrappedUSD(_wrappedUsd);
    }

    function lockOnBSC(address user, uint256 amount) external onlyOwner {
        wrappedUsd.mint(user, amount);
    }

    function releaseFromBSC(address user, uint256 amount) external onlyOwner {
        wrappedUsd.burn(user, amount);
    }
}
