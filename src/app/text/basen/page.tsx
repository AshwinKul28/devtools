'use client'

import { useState } from 'react'
import NumberInput from '@/components/NumberInput'
import EncodingTool from '@/components/encoding-tool'

export default function BaseNPage() {
  const [base, setBase] = useState(16)

  const encodeBaseN = (input: string) => {
    if (!input) throw new Error('Input cannot be empty')
    return Array.from(input)
      .map(char => char.charCodeAt(0).toString(base))
      .join(' ')
  }

  const decodeBaseN = (input: string) => {
    if (!input) throw new Error('Input cannot be empty')
    return input
      .trim()
      .split(/\s+/)
      .map(part => String.fromCharCode(parseInt(part, base)))
      .join('')
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          <span className="text-[#0ea5e9]">#</span> BaseN Encode/Decode
        </h1>
        
        <div className="glass-card p-6 mb-6">
          <div className="mb-4">
            <NumberInput
              label="Base (2-36)"
              value={base}
              onChange={setBase}
              min={2}
              max={36}
            />
          </div>
          
          <EncodingTool
            title=""
            encodeFunction={encodeBaseN}
            decodeFunction={decodeBaseN}
            placeholder="Enter text to encode/decode..."
          />
        </div>
      </div>
    </div>
  )
} 