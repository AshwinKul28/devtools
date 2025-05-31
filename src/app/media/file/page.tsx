'use client'

import { useState } from 'react'
import CopyButton from '@/components/copy-button'

export default function FileToBase64() {
  const [file, setFile] = useState<File | null>(null)
  const [base64, setBase64] = useState('')
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    const reader = new FileReader()
    reader.onload = () => {
      setBase64(reader.result?.toString().split(',')[1] || '')
    }
    reader.readAsDataURL(f)
  }
  return (
    <div className="min-h-screen bg-[#1a1b1e] p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">
          <span className="text-[#0ea5e9]">#</span> File to Base64
        </h1>
        <div className="glass-card p-4 mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="glass-input w-full mb-2"
          />
          {error && <div className="text-red-400 mb-2">{error}</div>}
          {file && (
            <div className="mb-2 flex items-center gap-4">
              <span className="text-gray-300 text-sm">{file.name}</span>
              <span className="text-gray-500 text-xs">({file.type || 'unknown type'})</span>
            </div>
          )}
          {base64 && (
            <div className="mt-2">
              <label className="text-gray-200 mb-1 block">Base64 String</label>
              <div className="flex items-center gap-2 mb-2">
                <CopyButton text={base64} className="gradient-btn px-3 py-1 rounded text-sm shadow" />
              </div>
              <textarea
                className="glass-input w-full h-32 font-mono"
                value={base64}
                readOnly
                placeholder="Base64 string will appear here..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 