'use client'

import { useState } from 'react'

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [error, setError] = useState('')

  const decodeJwt = () => {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format')
      }

      const decodedHeader = JSON.parse(atob(parts[0]))
      const decodedPayload = JSON.parse(atob(parts[1]))

      setHeader(JSON.stringify(decodedHeader, null, 2))
      setPayload(JSON.stringify(decodedPayload, null, 2))
      setError('')
    } catch (err) {
      setError('Invalid JWT token')
      setHeader('')
      setPayload('')
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          <span className="text-[#0ea5e9]">#</span> JWT Decoder
        </h1>
        
        <div className="glass-card p-6 mb-6">
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">JWT Token</label>
            <input
              type="text"
              className="glass-input w-full"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste your JWT token here..."
            />
          </div>

          <button
            onClick={decodeJwt}
            className="gradient-btn mb-6"
          >
            Decode JWT
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Header</label>
              <textarea
                className="glass-input w-full h-64"
                value={header}
                readOnly
                placeholder="Decoded header will appear here..."
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Payload</label>
              <textarea
                className="glass-input w-full h-64"
                value={payload}
                readOnly
                placeholder="Decoded payload will appear here..."
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-900/50 text-red-200 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 