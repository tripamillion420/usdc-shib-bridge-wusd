// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./WrappedUSD.sol";

contract XRPBridge is Ownable {
    WrappedUSD public wrappedUsd;

    constructor(address _wrappedUsd) {
        wrappedUsd = WrappedUSD(_wrappedUsd);
    }

    function mintFromXRP(address recipient, uint256 usdValue) external onlyOwner {
        wrappedUsd.mint(recipient, usdValue);
    }

    function burnToXRP(address from, uint256 usdValue) external onlyOwner {
        wrappedUsd.burn(from, usdValue);
        // Off-chain mechanism should handle XRP payout
    }
}
