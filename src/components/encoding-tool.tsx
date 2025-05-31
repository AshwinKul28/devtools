'use client'

import { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import CopyButton from './copy-button'

interface EncodingToolProps {
  title: string
  encodeFunction: (input: string) => string
  decodeFunction: (input: string) => string
  placeholder?: string
}

export default function EncodingTool({
  title,
  encodeFunction,
  decodeFunction,
  placeholder = 'Enter text to encode/decode...',
}: EncodingToolProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const handleEncode = () => {
    try {
      const result = encodeFunction(input)
      setOutput(result)
    } catch (error) {
      toast.error('Error encoding input')
    }
  }

  const handleDecode = () => {
    try {
      const result = decodeFunction(input)
      setOutput(result)
    } catch (error) {
      toast.error('Error decoding input')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          <span className="text-[#0ea5e9]">#</span> {title}
        </h1>
        
        <div className="glass-card p-6">
          <div className="mb-4">
            <textarea
              className="glass-input w-full min-h-[100px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
            />
          </div>

          <div className="flex gap-2 mb-4">
            <button
              className={`gradient-btn ${mode === 'encode' ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => {
                setMode('encode')
                handleEncode()
              }}
            >
              Encode
            </button>
            <button
              className={`gradient-btn ${mode === 'decode' ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => {
                setMode('decode')
                handleDecode()
              }}
            >
              Decode
            </button>
            <button
              className="gradient-btn opacity-50"
              onClick={handleClear}
            >
              <FiTrash2 className="inline-block mr-1" />
              Clear
            </button>
          </div>

          {output && (
            <div className="relative">
              <textarea
                className="glass-input w-full min-h-[100px]"
                value={output}
                readOnly
              />
              <div className="absolute top-2 right-2">
                <CopyButton
                  text={output}
                  className="gradient-btn px-3 py-1 rounded text-sm shadow"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 