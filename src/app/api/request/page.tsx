'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CopyButton from '@/components/copy-button'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type BodyType = 'json' | 'xml' | 'form'

interface RequestState {
  method: RequestMethod
  url: string
  headers: { key: string; value: string }[]
  bodyType: BodyType
  body: string
  queryParams: { key: string; value: string }[]
}

export default function APIRequestBuilder() {
  const [request, setRequest] = useState<RequestState>({
    method: 'GET',
    url: '',
    headers: [{ key: '', value: '' }],
    bodyType: 'json',
    body: '',
    queryParams: [{ key: '', value: '' }],
  })

  const [response, setResponse] = useState<{
    status: number
    headers: Record<string, string>
    data: string
    contentType: string
  } | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addHeader = () => {
    setRequest(prev => ({
      ...prev,
      headers: [...prev.headers, { key: '', value: '' }]
    }))
  }

  const addQueryParam = () => {
    setRequest(prev => ({
      ...prev,
      queryParams: [...prev.queryParams, { key: '', value: '' }]
    }))
  }

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    setRequest(prev => ({
      ...prev,
      headers: prev.headers.map((header, i) => 
        i === index ? { ...header, [field]: value } : header
      )
    }))
  }

  const updateQueryParam = (index: number, field: 'key' | 'value', value: string) => {
    setRequest(prev => ({
      ...prev,
      queryParams: prev.queryParams.map((param, i) => 
        i === index ? { ...param, [field]: value } : param
      )
    }))
  }

  const removeHeader = (index: number) => {
    setRequest(prev => ({
      ...prev,
      headers: prev.headers.filter((_, i) => i !== index)
    }))
  }

  const removeQueryParam = (index: number) => {
    setRequest(prev => ({
      ...prev,
      queryParams: prev.queryParams.filter((_, i) => i !== index)
    }))
  }

  const formatJson = (json: string) => {
    try {
      return JSON.stringify(JSON.parse(json), null, 2)
    } catch {
      return json
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResponse(null)

    try {
      // Build URL with query parameters
      const url = new URL(request.url)
      request.queryParams.forEach(({ key, value }) => {
        if (key && value) {
          url.searchParams.append(key, value)
        }
      })

      // Build headers object
      const headers: Record<string, string> = {}
      request.headers.forEach(({ key, value }) => {
        if (key && value) {
          headers[key] = value
        }
      })

      // Set content type based on body type
      if (['POST', 'PUT'].includes(request.method)) {
        switch (request.bodyType) {
          case 'json':
            headers['Content-Type'] = 'application/json'
            break
          case 'xml':
            headers['Content-Type'] = 'application/xml'
            break
          case 'form':
            headers['Content-Type'] = 'application/x-www-form-urlencoded'
            break
        }
      }

      // Prepare request options
      const options: RequestInit = {
        method: request.method,
        headers,
      }

      // Add body for POST and PUT requests
      if (['POST', 'PUT'].includes(request.method) && request.body) {
        if (request.bodyType === 'json') {
          options.body = formatJson(request.body)
        } else {
          options.body = request.body
        }
      }

      const res = await fetch(url.toString(), options)
      const contentType = res.headers.get('content-type') || ''

      let responseData: string
      if (contentType.includes('application/json')) {
        const json = await res.json()
        responseData = JSON.stringify(json, null, 2)
      } else {
        responseData = await res.text()
      }

      setResponse({
        status: res.status,
        headers: Object.fromEntries(res.headers.entries()),
        data: responseData,
        contentType,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          <span className="text-[#0ea5e9]">#</span> API Request Builder
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Method
                </label>
                <select
                  value={request.method}
                  onChange={(e) => setRequest(prev => ({ ...prev, method: e.target.value as RequestMethod }))}
                  className="w-full bg-[#2a2b2e] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={request.url}
                  onChange={(e) => setRequest(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://api.example.com/endpoint"
                  className="w-full bg-[#2a2b2e] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                  required
                />
              </div>
            </div>

            {/* Query Parameters */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Query Parameters
                </label>
                <button
                  type="button"
                  onClick={addQueryParam}
                  className="flex items-center border border-[#0ea5e9] text-[#0ea5e9] hover:text-[#38bdf8] hover:border-[#38bdf8] rounded px-2 py-0.5 text-sm bg-transparent"
                >
                  <span className="text-xs mr-1">+</span> Add Parameter
                </button>
              </div>
              <div className="space-y-2">
                {request.queryParams.map((param, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={param.key}
                      onChange={(e) => updateQueryParam(index, 'key', e.target.value)}
                      placeholder="Key"
                      className="flex-1 bg-[#2a2b2e] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                    />
                    <input
                      type="text"
                      value={param.value}
                      onChange={(e) => updateQueryParam(index, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1 bg-[#2a2b2e] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                    />
                    <button
                      type="button"
                      onClick={() => removeQueryParam(index)}
                      className="ml-1 w-6 h-6 flex items-center justify-center rounded-full border bg-[#0ea5e9]/20 text-white hover:bg-[#0ea5e9]/70 hover:text-white transition-colors text-xs p-0"
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Headers */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Headers
                </label>
                <button
                  type="button"
                  onClick={addHeader}
                  className="flex items-center border border-[#0ea5e9] text-[#0ea5e9] hover:text-[#38bdf8] hover:border-[#38bdf8] rounded px-2 py-0.5 text-sm bg-transparent"
                >
                  <span className="text-xs mr-1">+</span> Add Header
                </button>
              </div>
              <div className="space-y-2">
                {request.headers.map((header, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={header.key}
                      onChange={(e) => updateHeader(index, 'key', e.target.value)}
                      placeholder="Header"
                      className="flex-1 bg-[#2a2b2e] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                    />
                    <input
                      type="text"
                      value={header.value}
                      onChange={(e) => updateHeader(index, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1 bg-[#2a2b2e] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                    />
                    <button
                      type="button"
                      onClick={() => removeHeader(index)}
                      className="ml-1 w-6 h-6 flex items-center justify-center rounded-full border bg-[#0ea5e9]/20 text-white hover:bg-[#0ea5e9]/70 hover:text-white transition-colors text-xs p-0"
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            {['POST', 'PUT'].includes(request.method) && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Request Body
                  </label>
                  <select
                    value={request.bodyType}
                    onChange={(e) => setRequest(prev => ({ ...prev, bodyType: e.target.value as BodyType }))}
                    className="bg-[#2a2b2e] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                  >
                    <option value="json">JSON</option>
                    <option value="xml">XML</option>
                    <option value="form">Form Data</option>
                  </select>
                </div>
                <textarea
                  value={request.body}
                  onChange={(e) => setRequest(prev => ({ ...prev, body: e.target.value }))}
                  placeholder={request.bodyType === 'json' ? '{\n  "key": "value"\n}' : request.bodyType === 'xml' ? '<root>\n  <item>value</item>\n</root>' : 'key=value&other=data'}
                  className="w-full h-48 bg-[#2a2b2e] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] font-mono"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0ea5e9] hover:bg-[#38bdf8] text-white font-medium py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending Request...' : 'Send Request'}
            </button>
          </div>
        </form>

        {/* Response */}
        {error && (
          <div className="glass-card p-6 mt-6">
            <h2 className="text-xl font-bold text-red-400 mb-4">Error</h2>
            <div className="bg-[#2a2b2e] rounded p-4 text-red-300 font-mono">
              {error}
            </div>
          </div>
        )}

        {response && (
          <div className="glass-card p-6 mt-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Response
              <span className="ml-2 text-sm font-normal">
                (Status: <span className={response.status >= 400 ? 'text-red-400' : 'text-green-400'}>{response.status}</span>)
              </span>
            </h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-300 mb-2">Headers</h3>
              <div className="bg-[#2a2b2e] rounded overflow-hidden">
                <SyntaxHighlighter
                  language="json"
                  style={vscDarkPlus}
                  customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                >
                  {JSON.stringify(response.headers, null, 2)}
                </SyntaxHighlighter>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-300">Body</h3>
                <CopyButton
                  text={response.data}
                  className="gradient-btn px-3 py-1 rounded text-sm shadow"
                />
              </div>
              <div className="bg-[#2a2b2e] rounded overflow-hidden">
                <SyntaxHighlighter
                  language={response.contentType.includes('json') ? 'json' : 'text'}
                  style={vscDarkPlus}
                  customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                >
                  {response.data}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 