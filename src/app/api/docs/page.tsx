'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CopyButton from '@/components/copy-button'

interface OpenAPISpec {
  openapi: string
  info: {
    title: string
    version: string
    description?: string
  }
  paths: Record<string, any>
  components?: Record<string, any>
}

export default function APIDocGenerator() {
  const [spec, setSpec] = useState<string>('')
  const [parsedSpec, setParsedSpec] = useState<OpenAPISpec | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')

  const handleSpecChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setSpec(value)
    try {
      const parsed = JSON.parse(value)
      setParsedSpec(parsed)
      setError(null)
    } catch (err) {
      setError('Invalid JSON format')
      setParsedSpec(null)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        setSpec(content)
        try {
          const parsed = JSON.parse(content)
          setParsedSpec(parsed)
          setError(null)
        } catch (err) {
          setError('Invalid JSON format')
          setParsedSpec(null)
        }
      }
      reader.readAsText(file)
    }
  }

  const downloadSpec = () => {
    if (!parsedSpec) return
    const blob = new Blob([JSON.stringify(parsedSpec, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${parsedSpec.info.title.toLowerCase().replace(/\s+/g, '-')}-openapi.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">API Documentation Generator</h1>
          <p className="text-gray-400">Generate beautiful API documentation from OpenAPI/Swagger specifications</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'editor'
                    ? 'bg-[#0ea5e9] text-white'
                    : 'text-gray-300 hover:text-white hover:bg-[#0ea5e9]/20'
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'preview'
                    ? 'bg-[#0ea5e9] text-white'
                    : 'text-gray-300 hover:text-white hover:bg-[#0ea5e9]/20'
                }`}
              >
                Preview
              </button>
            </div>
            <div className="flex space-x-2">
              <label className="cursor-pointer bg-[#0ea5e9] hover:bg-[#38bdf8] text-white px-4 py-2 rounded">
                Import
                <input
                  type="file"
                  accept=".json,.yaml,.yml"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
              <button
                onClick={downloadSpec}
                disabled={!parsedSpec}
                className="bg-[#0ea5e9] hover:bg-[#38bdf8] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Export
              </button>
            </div>
          </div>

          {activeTab === 'editor' ? (
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={spec}
                  onChange={handleSpecChange}
                  placeholder="Paste your OpenAPI/Swagger specification here..."
                  className="w-full h-[600px] bg-[#2a2b2e] text-white rounded px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                />
                {error && (
                  <div className="absolute bottom-2 right-2 text-red-500 text-sm bg-[#2a2b2e] px-2 py-1 rounded">
                    {error}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#2a2b2e] rounded p-4 h-[600px] overflow-auto">
              {parsedSpec ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{parsedSpec.info.title}</h2>
                    <p className="text-gray-400">{parsedSpec.info.description}</p>
                    <div className="mt-2 text-sm text-gray-500">Version: {parsedSpec.info.version}</div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Endpoints</h3>
                    <div className="space-y-4">
                      {Object.entries(parsedSpec.paths).map(([path, methods]) => (
                        <div key={path} className="border border-[#3a3b3e] rounded p-4">
                          <h4 className="text-lg font-medium text-[#0ea5e9] mb-2">{path}</h4>
                          <div className="space-y-2">
                            {Object.entries(methods as Record<string, any>).map(([method, details]: [string, any]) => (
                              <div key={method} className="ml-4">
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    method === 'get' ? 'bg-green-500/20 text-green-400' :
                                    method === 'post' ? 'bg-blue-500/20 text-blue-400' :
                                    method === 'put' ? 'bg-yellow-500/20 text-yellow-400' :
                                    method === 'delete' ? 'bg-red-500/20 text-red-400' :
                                    'bg-gray-500/20 text-gray-400'
                                  }`}>
                                    {method.toUpperCase()}
                                  </span>
                                  <span className="text-white">{details.summary || 'No summary'}</span>
                                </div>
                                {details.description && (
                                  <p className="text-gray-400 text-sm mt-1 ml-4">{details.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Import or paste an OpenAPI/Swagger specification to preview
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 