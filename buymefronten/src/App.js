import React, {useState} from 'react';
import { ethers } from 'ethers';
import './App.css';

// Address of the deployed contract.
const contractAddress = '0xb859fbf7f77ab0298cA13e6cDccF9Bf4b4DBb8fd';

// ABI of the contract.
const abi = [
  {
    "inputs": [],
    "name": "buyCoffee",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawTips",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Provider to connect to the Ethereum network.
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Signer to sign transactions.
const signer = provider.getSigner();

// Contract instance.
const contract = new ethers.Contract(contractAddress, abi, signer);

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectWallet = async () => {
    // Prompt the user to connect their wallet.
    await window.ethereum.enable();
    setIsConnected(true);
  };

  const handleBuyCoffee = async () => {
    // Send the transaction to the contract.
    const transaction = await contract.buyCoffee({
      value: ethers.utils.parseEther('0.01')
    });

  };

  const handleWithdrawTips = async () => {
    // Send the transaction to the contract.
    const transaction = await contract.withdrawTips();
  };

  return (
    <div>
      <h1>Buy Me A Coffee</h1>
      <p><i>Caffeinate </i><b>ftNikhil.eth</b><i>'s code-crunching sessions!"</i></p>
      {isConnected ? (
        <>
          <button onClick={handleBuyCoffee}>Buy me a coffee</button>
          <button onClick={handleWithdrawTips}>Withdraw tips</button>
        </>
      ) : (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
