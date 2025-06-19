import React, { useState } from 'react';
import { ethers } from 'ethers';
import BridgeAbi from '../../abis/USDCtoSHIBBridge.json';

const BRIDGE_ADDRESS = '0xYourBridgeAddress';
const USDC_DECIMALS = 6;
const WUSD_DECIMALS = 18;

function BridgeForm({ account, setStatus }) {
  const [amount, setAmount] = useState('');
  const [isWithdraw, setIsWithdraw] = useState(false);

  const handleTransaction = async () => {
    if (!account) {
      alert("Please connect your wallet.");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const bridge = new ethers.Contract(BRIDGE_ADDRESS, BridgeAbi.abi, signer);

    const parsedAmount = isWithdraw
      ? ethers.utils.parseUnits(amount, WUSD_DECIMALS)
      : ethers.utils.parseUnits(amount, USDC_DECIMALS);

    try {
      if (isWithdraw) {
        const tx = await bridge.withdraw(parsedAmount, true);
        await tx.wait();
        setStatus(`Withdrawn ${amount} wUSD as USDC.`);
      } else {
        // Assume USDC approval already done for simplicity
        const tx = await bridge.deposit(parsedAmount);
        await tx.wait();
        setStatus(`Deposited ${amount} USDC and received wUSD.`);
      }
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="form">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isWithdraw}
          onChange={() => setIsWithdraw(!isWithdraw)}
        />
        Withdraw wUSD (as USDC)
      </label>
      <button onClick={handleTransaction} className="btn">
        {isWithdraw ? "Withdraw" : "Deposit"}
      </button>
    </div>
  );
}

export default BridgeForm;
