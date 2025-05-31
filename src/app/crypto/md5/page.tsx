'use client'

import { useState } from 'react'
import md5 from 'blueimp-md5'
import CopyButton from '@/components/copy-button'

export default function Md5Page() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleGenerate = () => {
    setOutput(md5(input))
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          <span className="text-[#0ea5e9]">#</span> MD5 Hash
        </h1>
        <div className="glass-card p-6 mb-6">
          <textarea
            className="glass-input w-full h-32 mb-4 font-mono"
            placeholder="Enter text to hash..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            className="gradient-btn mb-6"
          >
            Generate
          </button>
          <div className="mt-4">
            <label className="text-gray-200 mb-2">Result</label>
            <div className="flex items-center gap-2">
              <textarea
                value={output}
                readOnly
                className="glass-input w-full h-16 font-mono"
                placeholder="Hash will appear here..."
              />
              <CopyButton
                text={output}
                className="gradient-btn px-4 py-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 