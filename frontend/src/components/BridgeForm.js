import React, { useState } from 'react';
import { ethers } from 'ethers';
import ABI from '../abis/BridgeABI.json'; // Adjust based on contract type

const BridgeForm = () => {
  const [amount, setAmount] = useState('');
  const [tokenType, setTokenType] = useState('USDC');
  const [status, setStatus] = useState('');

  const handleBridge = async () => {
    if (!window.ethereum) {
      setStatus('🛑 Please connect MetaMask.');
      return;
    }

    try {
      setStatus('🟡 Connecting to wallet...');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      let contractAddress;
      switch (tokenType) {
        case 'USDC': contractAddress = '0xYourUSDCBridgeAddress'; break;
        case 'SHIB': contractAddress = '0xYourSHIBBridgeAddress'; break;
        case 'DOGE': contractAddress = '0xYourDOGEBridgeAddress'; break;
        case 'BONE': contractAddress = '0xYourBONEBridgeAddress'; break;
        case 'TREAT': contractAddress = '0xYourTREATBridgeAddress'; break;
        default: throw new Error('Unsupported token');
      }

      const contract = new ethers.Contract(contractAddress, ABI, signer);
      const parsedAmount = ethers.parseUnits(amount, 18);

      setStatus(`🚀 Sending ${amount} ${tokenType}...`);

      if (tokenType === 'BONE' || tokenType === 'TREAT') {
        const tx = await contract.depositAndMint(parsedAmount);
        await tx.wait();
        setStatus('✅ Transaction confirmed.');
      } else {
        setStatus('⚠️ Token not yet implemented.');
      }
    } catch (error) {
      console.error(error);
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Bridge Assets</h2>
      <select onChange={(e) => setTokenType(e.target.value)} value={tokenType}>
        <option value="USDC">USDC</option>
        <option value="SHIB">SHIB</option>
        <option value="DOGE">DOGE</option>
        <option value="BONE">BONE</option>
        <option value="TREAT">TREAT</option>
      </select>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleBridge}>Bridge</button>
      <p>{status}</p>
    </div>
  );
};

export default BridgeForm;