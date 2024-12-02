'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export default function WalletConnection() {
  const [account, setAccount] = useState<string | null>(null)

  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setAccount(accounts[0])
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error)
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        setAccount(accounts[0])
      } catch (error) {
        console.error('Error connecting to wallet:', error)
      }
    } else {
      alert('Please install MetaMask to use this feature')
    }
  }

  return (
    <div className="mb-8">
      {account ? (
        <p className="text-sm">Connected: {account}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Connect Wallet
        </button>
      )}
    </div>
  )
}


