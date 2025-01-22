import React, { useState } from "react";
import { ethers } from "ethers";
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { CROP_CONTRACT_ABI, CROP_CONTRACT_ADDRESS } from "../../constant";

export function USDT() {
  const { open } = useWeb3Modal();
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [wallets, setWallets] = useState([{ walletAddress: "", balance: "" }]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [amountToDistribute, setAmountToDistribute] = useState("");

  const addWallets = async (e) => {
    e.preventDefault();

    try {
      if (!address) {
        await open();
      }

      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const signer = ethersProvider.getSigner();
      const contract = new ethers.Contract(CROP_CONTRACT_ADDRESS, CROP_CONTRACT_ABI, signer);

      const walletAddresses = wallets.map((wallet) => wallet.walletAddress);
      const balances = wallets.map((wallet) => ethers.utils.parseEther(wallet.balance));

      const tx = await contract.addWallets(walletAddresses, balances);
      await tx.wait();

      alert("Wallets added successfully!");
    } catch (error) {
      console.error("Error adding wallets:", error);
    }
  };

  const calculateTotalBalance = async () => {
    try {
      if (!address) {
        await open();
      }

      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const signer = ethersProvider.getSigner();
      const contract = new ethers.Contract(CROP_CONTRACT_ADDRESS, CROP_CONTRACT_ABI, signer);

      const total = await contract.calculateTotalBalance();
      setTotalBalance(ethers.utils.formatEther(total));
    } catch (error) {
      console.error("Error calculating total balance:", error);
    }
  };

  const distributeCalculatedValue = async (e) => {
    e.preventDefault();

    try {
      if (!address) {
        await open();
      }

      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const signer = ethersProvider.getSigner();
      const contract = new ethers.Contract(CROP_CONTRACT_ADDRESS, CROP_CONTRACT_ABI, signer);

      const tx = await contract.transferCalculatedValue(ethers.utils.parseEther(amountToDistribute));
      await tx.wait();

      alert("Amount distributed successfully!");
    } catch (error) {
      console.error("Error distributing value:", error);
    }
  };

  const handleWalletChange = (index, field, value) => {
    const updatedWallets = [...wallets];
    updatedWallets[index][field] = value;
    setWallets(updatedWallets);
  };

  const addWalletField = () => {
    setWallets([...wallets, { walletAddress: "", balance: "" }]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={addWallets}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb6 text-center">Wallet Manager</h2>

        {wallets.map((wallet, index) => (
          <div key={index} className="flex flex-col mb-4">
            <label className="block text-gray-700 mb-2">Wallet Address</label>
            <input
              type="text"
              name="walletAddress"
              className="p-2 border border-gray-300 rounded mb-4"
              value={wallet.walletAddress}
              onChange={(e) => handleWalletChange(index, "walletAddress", e.target.value)}
              required
            />

            <label className="block text-gray-700 mb-2">Balance</label>
            <input
              type="number"
              name="balance"
              className="p-2 border border-gray-300 rounded"
              value={wallet.balance}
              onChange={(e) => handleWalletChange(index, "balance", e.target.value)}
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addWalletField}
          className="w-full bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Another Wallet
        </button>

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded mb-4">
          Add Wallets
        </button>
      </form>

      <div className="mt-6">
        <button
          onClick={calculateTotalBalance}
          className="w-full bg-gray-700 text-white p-2 rounded mb-6 ml-5"
        >
          Calculate Total Balance
        </button>
        {totalBalance > 0 && <p>Total Balance: {totalBalance} USDT</p>}

        <form
          onSubmit={distributeCalculatedValue}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl mt-4 ml-5"
        >
          <label className="block text-gray-700 mb-2">Amount to Distribute</label>
          <input
            type="number"
            name="amountToDistribute"
            className="p-2 border border-gray-300 rounded mb-4"
            value={amountToDistribute}
            onChange={(e) => setAmountToDistribute(e.target.value)}
            required
          />

          <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded">
            Distribute Value
          </button>
        </form>
      </div>
    </div>
  );
}
