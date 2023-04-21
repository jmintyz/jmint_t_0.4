import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';

const BSC_TESTNET_RPC = 'https://data-seed-prebsc-1-s1.binance.org:8545';

export default function TokenBalance() {
  const [balance, setBalance] = useState('');

  useEffect(() => {
    async function fetchBalance() {
      const provider = new JsonRpcProvider(BSC_TESTNET_RPC);

      const contractAddress = "0xCfa6709ED91113AE8Fd6cDc70f02eFAc28C65D64";
    const contractABI = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "_from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

      const address = '0x588324bAF59CB0b385eec790bFa53bB755338005'; // Adresse Ethereum à interroger
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      try {
        const tokenBalance = await contract.balanceOf(address);
        setBalance(ethers.utils.formatUnits(tokenBalance, 0));
      } catch (error) {
        console.log(error);
      }
    }
    fetchBalance();
  }, []);

  return (
    <div>
      <h1>Token Balance</h1>
      <p>{balance} tokens</p>
    </div>
  );
}
