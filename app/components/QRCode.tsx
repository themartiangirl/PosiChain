'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function QRCodeComponent() {
  const [qrCodeUrl, setQrCodeUrl] = useState('')

  useEffect(() => {
    generateQRCode()
  }, [])

  const generateQRCode = async () => {
    try {
      const url = window.location.href
      const qrCodeDataUrl = await QRCode.toDataURL(url, {
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      })
      setQrCodeUrl(qrCodeDataUrl)
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Share PosiChain:</h2>
      {qrCodeUrl && (
        <div className="bg-white p-4 inline-block rounded-lg">
          <img src={qrCodeUrl} alt="QR Code" className="mx-auto" />
        </div>
      )}
    </div>
  )
}


