'use client'

import { useState } from 'react'
import { ethers } from 'ethers'

const contractAddress = '0x1234567890123456789012345678901234567890' // Replace with your actual contract address
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "addMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export default function MessageForm() {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)

        const transaction = await contract.addMessage(message)
        await transaction.wait()

        setMessage('')
        alert('Your message has been saved on the blockchain!')
      } else {
        alert('Please install MetaMask to use this feature')
      }
    } catch (error) {
      console.error('Error saving message to blockchain:', error)
      alert('An error occurred while saving your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Share Your Positivity:</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
        rows={4}
        placeholder="Enter your uplifting message here..."
        required
      />
      <button
        type="submit"
        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition duration-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Message to Blockchain'}
      </button>
    </form>
  )
}


