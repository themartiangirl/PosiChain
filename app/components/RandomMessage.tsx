'use client'

import { useState, useEffect } from 'react'

export default function RandomMessage() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchRandomMessage()
  }, [])

  const fetchRandomMessage = async () => {
    const response = await fetch('/api/messages/random')
    const data = await response.json()
    setMessage(data.message)
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Your Positive Message:</h2>
      <p className="text-lg italic bg-gray-100 p-4 rounded-lg mb-4">{message}</p>
      <button
        onClick={fetchRandomMessage}
        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Get Another Message
      </button>
    </div>
  )
}


