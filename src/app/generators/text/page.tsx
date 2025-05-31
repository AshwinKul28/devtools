'use client'

import { useState } from 'react'
import CopyButton from '@/components/copy-button'

export default function RandomTextGenerator() {
  const [length, setLength] = useState(100)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSpecial, setIncludeSpecial] = useState(true)
  const [output, setOutput] = useState('')

  const generateText = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    let pool = chars
    if (includeNumbers) pool += numbers
    if (includeSpecial) pool += special
    
    let result = ''
    for (let i = 0; i < length; i++) {
      result += pool.charAt(Math.floor(Math.random() * pool.length))
    }
    
    setOutput(result)
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          <span className="text-[#0ea5e9]">#</span> Random Text Generator
        </h1>
        
        <div className="glass-card p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Length</label>
              <input
                type="number"
                min="1"
                max="1000"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="glass-input w-full"
              />
            </div>
            
            <div className="flex gap-6">
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="mr-2 accent-[#0ea5e9]"
                />
                Include Numbers
              </label>
              
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  checked={includeSpecial}
                  onChange={(e) => setIncludeSpecial(e.target.checked)}
                  className="mr-2 accent-[#0ea5e9]"
                />
                Include Special Characters
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={generateText}
          className="gradient-btn mb-6"
        >
          Generate Text
        </button>

        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <label className="text-gray-300">Generated Text</label>
            <CopyButton
              text={output}
              className="gradient-btn px-4 py-2"
            />
          </div>
          <textarea
            value={output}
            readOnly
            className="glass-input w-full h-48 font-mono"
            placeholder="Generated text will appear here..."
          />
        </div>
      </div>
    </div>
  )
} 