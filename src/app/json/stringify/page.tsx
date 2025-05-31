'use client'

import { useState } from 'react'

export default function JsonStringify() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [pretty, setPretty] = useState(true)
  const [escape, setEscape] = useState(true)

  const stringifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      const options = {
        pretty: pretty ? 2 : 0,
        escape: escape
      }
      
      let stringified = JSON.stringify(parsed, null, options.pretty)
      
      if (options.escape) {
        stringified = stringified.replace(/"/g, '\\"')
      }
      
      setOutput(stringified)
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
          <span className="text-[#0ea5e9]">#</span> JSON Stringify
        </h1>
        
        <div className="glass-card p-6">
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
              <label className="block text-gray-300 mb-2">Stringified Output</label>
              <textarea
                className="glass-input w-full h-96"
                value={output}
                readOnly
                placeholder="Stringified JSON will appear here..."
              />
            </div>
          </div>

          <div className="mt-6 flex gap-6">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                checked={pretty}
                onChange={(e) => setPretty(e.target.checked)}
                className="mr-2"
              />
              Pretty Print
            </label>
            
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                checked={escape}
                onChange={(e) => setEscape(e.target.checked)}
                className="mr-2"
              />
              Escape Quotes
            </label>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-900/50 text-red-200 rounded">
              {error}
            </div>
          )}

          <button
            onClick={stringifyJson}
            className="gradient-btn mt-6"
          >
            Stringify JSON
          </button>
        </div>
      </div>
    </div>
  )
} 