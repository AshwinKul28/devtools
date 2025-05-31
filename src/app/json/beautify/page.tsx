'use client'

import { useState } from 'react'

export default function JsonBeautifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const beautifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      const beautified = JSON.stringify(parsed, null, 2)
      setOutput(beautified)
      setError('')
    } catch (err) {
      setError('Invalid JSON input')
      setOutput('')
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          <span className="text-[#0ea5e9]">#</span> JSON Beautifier
        </h1>
        
        <div className="glass-card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Input JSON</label>
              <textarea
                className="glass-input w-full h-96"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Beautified Output</label>
              <textarea
                className="glass-input w-full h-96"
                value={output}
                readOnly
                placeholder="Beautified JSON will appear here..."
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-900/50 text-red-200 rounded">
              {error}
            </div>
          )}

          <button
            onClick={beautifyJson}
            className="gradient-btn mt-6"
          >
            Beautify JSON
          </button>
        </div>
      </div>
    </div>
  )
} 