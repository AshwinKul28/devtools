'use client'

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CopyButton from '@/components/copy-button'

interface GraphQLSchema {
  types: {
    name: string
    kind: string
    fields?: Array<{
      name: string
      type: {
        name?: string
        kind: string
        ofType?: {
          name?: string
          kind: string
        }
      }
    }>
  }[]
}

export default function GraphQLExplorer() {
  const [endpoint, setEndpoint] = useState('')
  const [query, setQuery] = useState('')
  const [variables, setVariables] = useState('')
  const [headers, setHeaders] = useState('')
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [schema, setSchema] = useState<GraphQLSchema | null>(null)
  const [activeTab, setActiveTab] = useState<'query' | 'schema'>('query')

  const fetchSchema = async () => {
    if (!endpoint) return

    setIsLoading(true)
    setError(null)

    try {
      const headersObj = headers ? JSON.parse(headers) : {}
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headersObj,
        },
        body: JSON.stringify({
          query: `
            query IntrospectionQuery {
              __schema {
                types {
                  name
                  kind
                  fields {
                    name
                    type {
                      name
                      kind
                      ofType {
                        name
                        kind
                      }
                    }
                  }
                }
              }
            }
          `,
        }),
      })

      const data = await response.json()
      if (data.errors) {
        throw new Error(data.errors[0].message)
      }

      setSchema(data.data.__schema)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch schema')
    } finally {
      setIsLoading(false)
    }
  }

  const executeQuery = async () => {
    if (!endpoint || !query) return

    setIsLoading(true)
    setError(null)
    setResponse(null)

    try {
      const headersObj = headers ? JSON.parse(headers) : {}
      const variablesObj = variables ? JSON.parse(variables) : {}

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headersObj,
        },
        body: JSON.stringify({
          query,
          variables: variablesObj,
        }),
      })

      const data = await response.json()
      if (data.errors) {
        throw new Error(data.errors[0].message)
      }

      setResponse(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute query')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">GraphQL Explorer</h1>
          <p className="text-gray-400">Explore and test GraphQL APIs with our powerful explorer</p>
        </div>

        <div className="glass-card p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              GraphQL Endpoint
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="https://api.example.com/graphql"
                className="flex-1 bg-[#2a2b2e] text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              />
              <button
                onClick={fetchSchema}
                disabled={!endpoint || isLoading}
                className="bg-[#0ea5e9] hover:bg-[#38bdf8] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Fetch Schema
              </button>
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('query')}
              className={`px-4 py-2 rounded ${
                activeTab === 'query'
                  ? 'bg-[#0ea5e9] text-white'
                  : 'text-gray-300 hover:text-white hover:bg-[#0ea5e9]/20'
              }`}
            >
              Query Editor
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-4 py-2 rounded ${
                activeTab === 'schema'
                  ? 'bg-[#0ea5e9] text-white'
                  : 'text-gray-300 hover:text-white hover:bg-[#0ea5e9]/20'
              }`}
            >
              Schema Explorer
            </button>
          </div>

          {activeTab === 'query' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Query
                </label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="query { ... }"
                  className="w-full h-48 bg-[#2a2b2e] text-white rounded px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Variables
                  </label>
                  <textarea
                    value={variables}
                    onChange={(e) => setVariables(e.target.value)}
                    placeholder="{ ... }"
                    className="w-full h-32 bg-[#2a2b2e] text-white rounded px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Headers
                  </label>
                  <textarea
                    value={headers}
                    onChange={(e) => setHeaders(e.target.value)}
                    placeholder="{ ... }"
                    className="w-full h-32 bg-[#2a2b2e] text-white rounded px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                  />
                </div>
              </div>

              <button
                onClick={executeQuery}
                disabled={!endpoint || !query || isLoading}
                className="w-full bg-[#0ea5e9] hover:bg-[#38bdf8] text-white font-medium py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Executing...' : 'Execute Query'}
              </button>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-400 rounded p-4">
                  {error}
                </div>
              )}

              {response && (
                <div className="relative">
                  <div className="absolute top-2 right-2">
                    <CopyButton text={JSON.stringify(response, null, 2)} />
                  </div>
                  <SyntaxHighlighter
                    language="json"
                    style={vscDarkPlus}
                    className="rounded"
                  >
                    {JSON.stringify(response, null, 2)}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#2a2b2e] rounded p-4 h-[600px] overflow-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Loading schema...
                </div>
              ) : schema ? (
                <div className="space-y-6">
                  {schema.types
                    .filter(type => type.kind === 'OBJECT' && !type.name.startsWith('__'))
                    .map(type => (
                      <div key={type.name} className="border border-[#3a3b3e] rounded p-4">
                        <h3 className="text-lg font-medium text-[#0ea5e9] mb-2">{type.name}</h3>
                        {type.fields && (
                          <div className="space-y-2">
                            {type.fields.map(field => (
                              <div key={field.name} className="ml-4">
                                <div className="flex items-center space-x-2">
                                  <span className="text-white">{field.name}</span>
                                  <span className="text-gray-400">
                                    {field.type.name || 
                                     (field.type.ofType?.name || field.type.ofType?.kind)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Enter a GraphQL endpoint and click "Fetch Schema" to explore
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 