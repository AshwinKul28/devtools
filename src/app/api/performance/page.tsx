'use client'

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CopyButton from '@/components/copy-button'

interface TestResult {
  status: number
  duration: number
  timestamp: number
  error?: string
}

interface TestSummary {
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  averageResponseTime: number
  minResponseTime: number
  maxResponseTime: number
  requestsPerSecond: number
  statusCodes: Record<number, number>
}

export default function APIPerformanceTester() {
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET')
  const [headers, setHeaders] = useState('')
  const [body, setBody] = useState('')
  const [concurrentUsers, setConcurrentUsers] = useState(1)
  const [totalRequests, setTotalRequests] = useState(10)
  const [delay, setDelay] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])
  const [summary, setSummary] = useState<TestSummary | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculateSummary = (results: TestResult[]): TestSummary => {
    const successfulRequests = results.filter(r => !r.error).length
    const failedRequests = results.length - successfulRequests
    const durations = results.filter(r => !r.error).map(r => r.duration)
    const statusCodes = results.reduce((acc, r) => {
      if (!r.error) {
        acc[r.status] = (acc[r.status] || 0) + 1
      }
      return acc
    }, {} as Record<number, number>)

    const totalDuration = Math.max(...results.map(r => r.timestamp)) - Math.min(...results.map(r => r.timestamp))
    const requestsPerSecond = totalDuration > 0 ? (results.length / totalDuration) * 1000 : 0

    return {
      totalRequests: results.length,
      successfulRequests,
      failedRequests,
      averageResponseTime: durations.length ? durations.reduce((a, b) => a + b, 0) / durations.length : 0,
      minResponseTime: durations.length ? Math.min(...durations) : 0,
      maxResponseTime: durations.length ? Math.max(...durations) : 0,
      requestsPerSecond,
      statusCodes,
    }
  }

  const runTest = async () => {
    if (!url) return

    setIsRunning(true)
    setError(null)
    setResults([])
    setSummary(null)

    const headersObj = headers ? JSON.parse(headers) : {}
    const bodyObj = body ? JSON.parse(body) : null
    const results: TestResult[] = []
    const startTime = Date.now()

    try {
      const requests = Array(totalRequests).fill(null).map(async (_, index) => {
        // Simulate concurrent users by adding delay between requests
        if (index > 0 && delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay))
        }

        const requestStart = Date.now()
        try {
          const response = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              ...headersObj,
            },
            body: bodyObj ? JSON.stringify(bodyObj) : undefined,
          })

          const duration = Date.now() - requestStart
          results.push({
            status: response.status,
            duration,
            timestamp: requestStart,
          })
        } catch (err) {
          const duration = Date.now() - requestStart
          results.push({
            status: 0,
            duration,
            timestamp: requestStart,
            error: err instanceof Error ? err.message : 'Request failed',
          })
        }
      })

      // Run requests in batches based on concurrent users
      for (let i = 0; i < requests.length; i += concurrentUsers) {
        const batch = requests.slice(i, i + concurrentUsers)
        await Promise.all(batch)
      }

      setResults(results)
      setSummary(calculateSummary(results))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Test failed')
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">API Performance Tester</h1>
          <p className="text-gray-400">Test and analyze your API performance with load testing</p>
        </div>

        <div className="glass-card p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                URL
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                className="w-full bg-[#2a2b2e] text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Method
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="w-full bg-[#2a2b2e] text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Concurrent Users
              </label>
              <input
                type="number"
                min="1"
                value={concurrentUsers}
                onChange={(e) => setConcurrentUsers(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-[#2a2b2e] text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Total Requests
              </label>
              <input
                type="number"
                min="1"
                value={totalRequests}
                onChange={(e) => setTotalRequests(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-[#2a2b2e] text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Delay Between Requests (ms)
              </label>
              <input
                type="number"
                min="0"
                value={delay}
                onChange={(e) => setDelay(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-[#2a2b2e] text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Headers
              </label>
              <textarea
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                placeholder={`{
  "Authorization": "Bearer your-token-here",
  "Content-Type": "application/json",
  "Accept": "application/json",
  "X-API-Key": "your-api-key"
}`}
                className="w-full h-32 bg-[#2a2b2e] text-white rounded px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              />
              <p className="mt-1 text-xs text-gray-500">Enter headers as a JSON object. All keys and string values must be in double quotes.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Request Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={`{
  "id": 123,
  "name": "Example Request",
  "data": {
    "key": "value",
    "items": [1, 2, 3]
  }
}`}
                className="w-full h-32 bg-[#2a2b2e] text-white rounded px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              />
              <p className="mt-1 text-xs text-gray-500">Enter request body as a JSON object. Only used for POST, PUT, and DELETE requests.</p>
            </div>
          </div>

          <button
            onClick={runTest}
            disabled={!url || isRunning}
            className="w-full bg-[#0ea5e9] hover:bg-[#38bdf8] text-white font-medium py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? 'Running Test...' : 'Start Test'}
          </button>

          {error && (
            <div className="mt-4 bg-red-500/20 border border-red-500/50 text-red-400 rounded p-4">
              {error}
            </div>
          )}

          {summary && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="glass-card p-4">
                  <div className="text-sm text-gray-400">Total Requests</div>
                  <div className="text-2xl font-bold text-white">{summary.totalRequests}</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-sm text-gray-400">Successful</div>
                  <div className="text-2xl font-bold text-green-400">{summary.successfulRequests}</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-sm text-gray-400">Failed</div>
                  <div className="text-2xl font-bold text-red-400">{summary.failedRequests}</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-sm text-gray-400">Requests/sec</div>
                  <div className="text-2xl font-bold text-white">{summary.requestsPerSecond.toFixed(2)}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="glass-card p-4">
                  <div className="text-sm text-gray-400">Average Response Time</div>
                  <div className="text-2xl font-bold text-white">{summary.averageResponseTime.toFixed(2)}ms</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-sm text-gray-400">Min Response Time</div>
                  <div className="text-2xl font-bold text-white">{summary.minResponseTime.toFixed(2)}ms</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-sm text-gray-400">Max Response Time</div>
                  <div className="text-2xl font-bold text-white">{summary.maxResponseTime.toFixed(2)}ms</div>
                </div>
              </div>

              <div className="glass-card p-4">
                <h3 className="text-lg font-medium text-white mb-4">Status Code Distribution</h3>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(summary.statusCodes).map(([code, count]) => (
                    <div key={code} className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${
                        code.startsWith('2') ? 'text-green-400' :
                        code.startsWith('3') ? 'text-yellow-400' :
                        code.startsWith('4') ? 'text-orange-400' :
                        code.startsWith('5') ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {code}
                      </span>
                      <span className="text-white">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Response Times</h3>
                  <CopyButton text={JSON.stringify(results, null, 2)} />
                </div>
                <div className="h-64 bg-[#2a2b2e] rounded p-4">
                  <div className="h-full flex items-end space-x-1">
                    {results.map((result, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-[#0ea5e9] hover:bg-[#38bdf8] transition-colors"
                        style={{
                          height: `${(result.duration / summary.maxResponseTime) * 100}%`,
                          opacity: result.error ? 0.5 : 1,
                        }}
                        title={`Request ${index + 1}: ${result.duration}ms${result.error ? ` (${result.error})` : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 