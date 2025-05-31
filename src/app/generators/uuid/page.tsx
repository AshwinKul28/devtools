'use client'

import { useState } from 'react'
import { v1 as uuidv1, v4 as uuidv4, v5 as uuidv5 } from 'uuid'
import CopyButton from '@/components/copy-button'

type UUIDVersion = 'v1' | 'v4' | 'v5'
type UUIDFormat = 'default' | 'uppercase' | 'braces' | 'urn'

export default function UUIDGenerator() {
  const [version, setVersion] = useState<UUIDVersion>('v4')
  const [format, setFormat] = useState<UUIDFormat>('default')
  const [count, setCount] = useState(1)
  const [namespace, setNamespace] = useState('')
  const [name, setName] = useState('')
  const [uuids, setUuids] = useState<string[]>([])

  const generateUUID = () => {
    const newUuids: string[] = []
    for (let i = 0; i < count; i++) {
      let uuid: string
      switch (version) {
        case 'v1':
          uuid = uuidv1()
          break
        case 'v4':
          uuid = uuidv4()
          break
        case 'v5':
          if (!namespace || !name) {
            alert('Namespace and name are required for UUID v5')
            return
          }
          uuid = uuidv5(name, namespace)
          break
        default:
          uuid = uuidv4()
      }

      // Apply formatting
      switch (format) {
        case 'uppercase':
          uuid = uuid.toUpperCase()
          break
        case 'braces':
          uuid = `{${uuid}}`
          break
        case 'urn':
          uuid = `urn:uuid:${uuid}`
          break
      }

      newUuids.push(uuid)
    }
    setUuids(newUuids)
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          <span className="text-[#0ea5e9]">#</span> UUID Generator
        </h1>

        <div className="glass-card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">UUID Version</label>
              <select
                value={version}
                onChange={(e) => setVersion(e.target.value as UUIDVersion)}
                className="glass-input w-full"
              >
                <option value="v1">Version 1 (Time-based)</option>
                <option value="v4">Version 4 (Random)</option>
                <option value="v5">Version 5 (Namespace-based)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as UUIDFormat)}
                className="glass-input w-full"
              >
                <option value="default">Default (lowercase)</option>
                <option value="uppercase">Uppercase</option>
                <option value="braces">With Braces</option>
                <option value="urn">URN Format</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Number of UUIDs</label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.min(Math.max(1, Number(e.target.value) || 1), 100))}
                className="glass-input w-full"
                placeholder="Enter number of UUIDs..."
              />
            </div>

            {version === 'v5' && (
              <>
                <div>
                  <label className="block text-gray-300 mb-2">Namespace UUID</label>
                  <input
                    type="text"
                    value={namespace}
                    onChange={(e) => setNamespace(e.target.value)}
                    placeholder="Enter a valid UUID"
                    className="glass-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a name"
                    className="glass-input w-full"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <button
          onClick={generateUUID}
          className="gradient-btn mb-6"
        >
          Generate UUID{count > 1 ? 's' : ''}
        </button>

        {uuids.length > 0 && (
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-gray-300">Generated UUID{uuids.length > 1 ? 's' : ''}</label>
              <CopyButton
                text={uuids.join('\n')}
                className="gradient-btn px-4 py-2"
              />
            </div>
            <textarea
              value={uuids.join('\n')}
              readOnly
              className="glass-input w-full h-96 font-mono"
              placeholder="Generated UUIDs will appear here..."
            />
          </div>
        )}
      </div>
    </div>
  )
} 