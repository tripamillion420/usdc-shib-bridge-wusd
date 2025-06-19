// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./WrappedUSD.sol";

contract DOGEBridge is Ownable {
    WrappedUSD public wrappedUsd;

    constructor(address _wrappedUsd) {
        wrappedUsd = WrappedUSD(_wrappedUsd);
    }

    function mintFromDOGE(address recipient, uint256 usdValue) external onlyOwner {
        wrappedUsd.mint(recipient, usdValue);
    }

    function burnToDOGE(address from, uint256 usdValue) external onlyOwner {
        wrappedUsd.burn(from, usdValue);
        // DOGE withdrawal handled by relayer
    }
}
