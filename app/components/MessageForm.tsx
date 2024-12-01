'use client'

import { useState } from 'react'

export default function MessageForm() {
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    if (response.ok) {
      setMessage('')
      alert('Thank you for spreading positivity!')
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
      >
        Submit Message
      </button>
    </form>
  )
}


