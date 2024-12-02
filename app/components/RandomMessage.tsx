'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const contractAddress = '0x1234567890123456789012345678901234567890' // Replace with your actual contract address
const contractABI = [
  {
    "inputs": [],
    "name": "getRandomMessage",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export default function RandomMessage() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchRandomMessage()
  }, [])

  const fetchRandomMessage = async () => {
    setIsLoading(true)
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(contractAddress, contractABI, provider)

        const randomMessage = await contract.getRandomMessage()
        setMessage(randomMessage)
      } else {
        alert('Please install MetaMask to use this feature')
      }
    } catch (error) {
      console.error('Error fetching random message from blockchain:', error)
      setMessage('Error fetching message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Your Positive Message:</h2>
      <p className="text-lg italic bg-gray-100 p-4 rounded-lg mb-4">
        {isLoading ? 'Loading...' : message}
      </p>
      <button
        onClick={fetchRandomMessage}
        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition duration-300"
        disabled={isLoading}
      >
        Get Another Message from Blockchain
      </button>
    </div>
  )
}


