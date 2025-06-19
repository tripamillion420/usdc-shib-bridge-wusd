import React from 'react';
import { ethers } from 'ethers';

function WalletConnect({ setAccount }) {
  const connectWallet = async () => {
    if (window.ethereum) {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(account);
    } else {
      alert("MetaMask is not installed.");
    }
  };

  return (
    <button onClick={connectWallet} className="btn">
      Connect Wallet
    </button>
  );
}

export default WalletConnect;
