"use client"

import { useState } from 'react'
import CopyButton from '@/components/copy-button'

function xmlToJson(node: any): any {
  let obj: any = {}
  if (node.nodeType === 1) { // element
    if (node.attributes.length > 0) {
      obj['@attributes'] = {}
      for (let j = 0; j < node.attributes.length; j++) {
        const attribute = node.attributes.item(j)
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue
      }
    }
  } else if (node.nodeType === 3) { // text
    return node.nodeValue.trim()
  }
  if (node.hasChildNodes()) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const item = node.childNodes.item(i)
      const nodeName = item.nodeName
      const value = xmlToJson(item)
      if (typeof value === 'string' && value === '') continue
      if (obj[nodeName] === undefined) {
        obj[nodeName] = value
      } else {
        if (!Array.isArray(obj[nodeName])) {
          obj[nodeName] = [obj[nodeName]]
        }
        obj[nodeName].push(value)
      }
    }
  }
  return obj
}

function parseXmlToJson(xml: string): any {
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xml, 'application/xml')
    if (xmlDoc.getElementsByTagName('parsererror').length) {
      throw new Error('Invalid XML')
    }
    return xmlToJson(xmlDoc.documentElement)
  } catch (e) {
    return { error: 'Invalid XML' }
  }
}

export default function XmlDecoderPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleDecode = () => {
    try {
      const json = parseXmlToJson(input)
      if (json.error) throw new Error(json.error)
      setOutput(JSON.stringify(json, null, 2))
      setError('')
    } catch (e: any) {
      setOutput('')
      setError(e.message || 'Invalid XML')
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          <span className="text-[#0ea5e9]">#</span> XML Decoder
        </h1>
        <div className="glass-card p-6 mb-6">
          <textarea
            className="glass-input w-full h-32 mb-4 font-mono"
            placeholder="Paste XML here..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            onClick={handleDecode}
            className="gradient-btn mb-6"
          >
            Decode
          </button>
          <div className="mt-4">
            <label className="text-gray-200 mb-2">Result (JSON)</label>
            <div className="flex items-center gap-2">
              <textarea
                value={output}
                readOnly
                className="glass-input w-full h-32 font-mono"
                placeholder="Decoded JSON will appear here..."
              />
              <CopyButton
                text={output}
                className="gradient-btn px-4 py-2"
              />
            </div>
            {error && <div className="mt-2 text-red-400">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  )
} 