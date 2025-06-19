import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import BridgeForm from './components/BridgeForm';
import StatusDisplay from './components/StatusDisplay';

function App() {
  const [account, setAccount] = useState('');
  const [status, setStatus] = useState('');

  return (
    <div className="app">
      <h1>wUSD Bridge Interface</h1>
      <WalletConnect setAccount={setAccount} />
      <BridgeForm account={account} setStatus={setStatus} />
      <StatusDisplay status={status} />
    </div>
  );
}

export default App;
