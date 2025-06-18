'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react'

export default function JSONComparer() {
  const [json1, setJson1] = useState('')
  const [json2, setJson2] = useState('')
  const [result, setResult] = useState<{
    areEqual: boolean
    differences: string[]
    error?: string
  } | null>(null)

  const compareJSON = () => {
    try {
      // Parse JSON strings
      const obj1 = JSON.parse(json1)
      const obj2 = JSON.parse(json2)

      // Function to find differences between objects
      const findDifferences = (obj1: any, obj2: any, path: string = ''): string[] => {
        const differences: string[] = []

        // Get all keys from both objects
        const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])

        for (const key of allKeys) {
          const currentPath = path ? `${path}.${key}` : key

          // Check if key exists in both objects
          if (!(key in obj1)) {
            differences.push(`Key "${currentPath}" exists in second object but not in first`)
            continue
          }
          if (!(key in obj2)) {
            differences.push(`Key "${currentPath}" exists in first object but not in second`)
            continue
          }

          // Compare values
          const val1 = obj1[key]
          const val2 = obj2[key]

          if (typeof val1 !== typeof val2) {
            differences.push(`Type mismatch at "${currentPath}": ${typeof val1} vs ${typeof val2}`)
            continue
          }

          if (typeof val1 === 'object' && val1 !== null && val2 !== null) {
            differences.push(...findDifferences(val1, val2, currentPath))
          } else if (JSON.stringify(val1) !== JSON.stringify(val2)) {
            differences.push(`Value mismatch at "${currentPath}": ${JSON.stringify(val1)} vs ${JSON.stringify(val2)}`)
          }
        }

        return differences
      }

      const differences = findDifferences(obj1, obj2)
      setResult({
        areEqual: differences.length === 0,
        differences
      })
    } catch (error) {
      setResult({
        areEqual: false,
        differences: [],
        error: error instanceof Error ? error.message : 'Invalid JSON'
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          <span className="text-[#0ea5e9]">#</span> JSON Comparer
        </h1>
        <p className="text-gray-400 mb-6">
          Compare two JSON objects and find their differences. Paste your JSON objects below and click compare.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="glass-card p-4">
            <h2 className="text-xl font-semibold mb-2 text-white">First JSON</h2>
            <textarea
              value={json1}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJson1(e.target.value)}
              placeholder="Paste your first JSON here..."
              className="glass-input w-full h-[300px] font-mono"
            />
          </div>

          <div className="glass-card p-4">
            <h2 className="text-xl font-semibold mb-2 text-white">Second JSON</h2>
            <textarea
              value={json2}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJson2(e.target.value)}
              placeholder="Paste your second JSON here..."
              className="glass-input w-full h-[300px] font-mono"
            />
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button onClick={compareJSON} className="gradient-btn px-8 py-3 text-lg">
            Compare JSON
          </button>
        </div>

        {result && (
          <div className="glass-card p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">Comparison Result</h2>
            {result.error ? (
              <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded p-4 mb-4">
                <AlertCircle className="h-5 w-5" />
                <span>{result.error}</span>
              </div>
            ) : (
              <>
                <div className={`flex items-center gap-2 rounded p-4 mb-4 ${result.areEqual ? 'bg-green-500/20 border border-green-500/50 text-green-400' : 'bg-red-500/20 border border-red-500/50 text-red-400'}`}>
                  {result.areEqual ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                  <span>
                    {result.areEqual
                      ? 'The JSON objects are identical'
                      : 'The JSON objects are different'}
                  </span>
                </div>

                {!result.areEqual && result.differences.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-white">Differences found:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {result.differences.map((diff, index) => (
                        <li key={index} className="text-sm text-gray-300">
                          {diff}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 