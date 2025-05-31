'use client'

import { useState } from 'react'
import CopyButton from '@/components/copy-button'

export default function NumberGenerator() {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100)
  const [count, setCount] = useState(10)
  const [decimals, setDecimals] = useState(0)
  const [output, setOutput] = useState('')

  const generateNumbers = () => {
    const numbers = Array.from({ length: count }, () => {
      const num = Math.random() * (max - min) + min
      return decimals === 0 ? Math.floor(num) : Number(num.toFixed(decimals))
    })
    setOutput(numbers.join('\n'))
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          <span className="text-[#0ea5e9]">#</span> Number Generator
        </h1>
        
        <div className="glass-card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Minimum Value</label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(Number(e.target.value))}
                className="glass-input w-full"
                placeholder="Enter minimum value..."
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Maximum Value</label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
                className="glass-input w-full"
                placeholder="Enter maximum value..."
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Number of Values</label>
              <input
                type="number"
                min="1"
                max="1000"
                value={count}
                onChange={(e) => setCount(Math.min(Math.max(1, Number(e.target.value) || 1), 1000))}
                className="glass-input w-full"
                placeholder="Enter number of values..."
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Decimal Places</label>
              <input
                type="number"
                min="0"
                max="10"
                value={decimals}
                onChange={(e) => setDecimals(Math.min(Math.max(0, Number(e.target.value) || 0), 10))}
                className="glass-input w-full"
                placeholder="Enter decimal places..."
              />
            </div>
          </div>
        </div>

        <button
          onClick={generateNumbers}
          className="gradient-btn mb-6"
        >
          Generate Numbers
        </button>

        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <label className="text-gray-300">Generated Numbers</label>
            <CopyButton
              text={output}
              className="gradient-btn px-4 py-2"
            />
          </div>
          <textarea
            value={output}
            readOnly
            className="glass-input w-full h-96 font-mono"
            placeholder="Generated numbers will appear here..."
          />
        </div>
      </div>
    </div>
  )
} 