"use client"

import { useState } from "react"

function TreeNode({ data, name }: { data: any; name?: string }) {
  const [open, setOpen] = useState(true)
  const isObject = typeof data === 'object' && data !== null
  const isArray = Array.isArray(data)

  const entries = isObject ? Object.entries(data) : []

  if (isObject) {
    return (
      <div className="ml-4">
        <div className="flex items-center select-none cursor-pointer" onClick={() => setOpen(o => !o)}>
          <span className="mr-1 text-[#0ea5e9]">
            {open ? '▼' : '▶'}
          </span>
          {name !== undefined && (
            <span className="text-[#0ea5e9] font-mono mr-1">{name}{isArray ? '' : ':'}</span>
          )}
          <span className="text-gray-400 font-mono">
            {isArray ? `[${data.length}]` : '{...}'}
          </span>
        </div>
        {open && (
          <ul className="border-l border-gray-700 ml-4">
            {entries.map(([key, value]: [string | number, any]) => (
              <li key={String(key)} className="mb-1">
                <TreeNode data={value} name={isArray ? `[${key}]` : String(key)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  } else {
    return (
      <span>
        {name !== undefined && <span className="text-[#0ea5e9] font-mono mr-1">{name}:</span>}
        <span className="text-gray-300 font-mono">{JSON.stringify(data)}</span>
      </span>
    )
  }
}

export default function JSONTreeVisualizer() {
  const [input, setInput] = useState(`{
  "name": "John",
  "age": 30,
  "address": { "city": "New York", "zip": "10001" },
  "hobbies": ["reading", "sports"]
}`)
  const [json, setJson] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleVisualize = () => {
    try {
      const parsed = JSON.parse(input)
      setJson(parsed)
      setError(null)
    } catch (e: any) {
      setError(e.message)
      setJson(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          <span className="text-[#0ea5e9]">#</span> JSON Tree Visualizer
        </h1>
        <div className="glass-card p-6 mb-6">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full h-48 bg-[#2a2b2e] text-white rounded px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] mb-4"
            placeholder="Paste your JSON here..."
          />
          <button
            onClick={handleVisualize}
            className="bg-[#0ea5e9] hover:bg-[#38bdf8] text-white font-medium py-2 px-4 rounded transition-colors duration-200"
          >
            Visualize
          </button>
          {error && (
            <div className="mt-4 text-red-400 font-mono">{error}</div>
          )}
        </div>
        {json && (
          <div className="glass-card p-6 overflow-x-auto">
            <h2 className="text-xl font-bold text-white mb-4">Tree View</h2>
            <div className="text-sm">
              <TreeNode data={json} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 