// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./WrappedUSD.sol";

interface IDEX {
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}

contract USDCtoSHIBBridge is Ownable {
    IERC20 public usdc;
    IERC20 public shib;
    WrappedUSD public wrappedUsd;
    IDEX public dexRouter;

    constructor(
        address _usdc,
        address _shib,
        address _wrappedUsd,
        address _dexRouter
    ) {
        usdc = IERC20(_usdc);
        shib = IERC20(_shib);
        wrappedUsd = WrappedUSD(_wrappedUsd);
        dexRouter = IDEX(_dexRouter);
    }

    function deposit(uint256 usdcAmount) external {
        require(usdc.transferFrom(msg.sender, address(this), usdcAmount), "Transfer failed");
        usdc.approve(address(dexRouter), usdcAmount);

        address ;
        path[0] = address(usdc);
        path[1] = address(shib);

        uint256[] memory amounts = dexRouter.swapExactTokensForTokens(
            usdcAmount,
            0,
            path,
            address(this),
            block.timestamp + 300
        );

        uint256 shibReceived = amounts[1];
        uint256 usdValue = shibReceived / 1e6;
        wrappedUsd.mint(msg.sender, usdValue);
    }

    function withdraw(uint256 wrappedUsdAmount, bool withdrawAsUsdc) external {
        require(wrappedUsd.balanceOf(msg.sender) >= wrappedUsdAmount, "Insufficient balance");
        wrappedUsd.burn(msg.sender, wrappedUsdAmount);

        if (withdrawAsUsdc) {
            uint256 usdcAmount = wrappedUsdAmount * 1e6;
            usdc.transfer(msg.sender, usdcAmount);
        } else {
            uint256 shibAmount = wrappedUsdAmount * 1e6;
            shib.transfer(msg.sender, shibAmount);
        }
    }
}
