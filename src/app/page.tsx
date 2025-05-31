'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const TOOLS = [
  { name: 'Base64 Encode/Decode', path: '/text/base64' },
  { name: 'Base32 Encode/Decode', path: '/text/base32' },
  { name: 'BaseN Encode/Decode', path: '/text/basen' },
  { name: 'URL Encode/Decode', path: '/text/url' },
  { name: 'MD5 Hash', path: '/crypto/md5' },
  { name: 'SHA-1 Hash', path: '/crypto/sha1' },
  { name: 'SHA-256 Hash', path: '/crypto/sha256' },
  { name: 'SHA-512 Hash', path: '/crypto/sha512' },
  { name: 'JSON Beautifier', path: '/json/beautify' },
  { name: 'JWT Decoder', path: '/json/jwt' },
  { name: 'JSON Stringify', path: '/json/stringify' },
  { name: 'XML Decoder', path: '/json/xml' },
  { name: 'JSON Tree Visualizer', path: '/json/tree' },
  { name: 'Random Text', path: '/generators/text' },
  { name: 'Person Data', path: '/generators/person' },
  { name: 'Number Generator', path: '/generators/numbers' },
  { name: 'UUID Generator', path: '/generators/uuid' },
  { name: 'Image to Base64', path: '/media/image' },
  { name: 'File to Base64', path: '/media/file' },
  { name: 'QR Code Generator', path: '/qr/encode' },
  { name: 'QR Code Scanner', path: '/qr/decode' },
  { name: 'API Request Builder', path: '/api/request' },
  { name: 'API Documentation Generator', path: '/api/docs' },
  { name: 'GraphQL Explorer', path: '/api/graphql' },
  { name: 'API Performance Tester', path: '/api/performance' },
]

export default function Home() {
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  const filtered = search.length >= 2
    ? TOOLS.filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
    : []

  return (
    <div className="min-h-screen bg-[#1a1b1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="text-[#0ea5e9]">&lt;</span>
            DevToolsLab
            <span className="text-[#0ea5e9]">/&gt;</span>
          </h1>
          <p className="text-gray-400 text-lg">
            A comprehensive collection of essential tools for all developers
          </p>
          <div className="flex flex-col items-center mt-6 w-full">
            <div className="text-white text-lg font-semibold mb-1">Popular Tools right now!</div>
            <div className="relative w-full overflow-hidden border border-[#0ea5e9] rounded-lg bg-[#232427]/60 py-2 shadow-[0_0_16px_2px_rgba(14,165,233,0.10)]" style={{boxShadow: '0 0 24px 2px rgba(14,165,233,0.12), 0 0 2px 1px rgba(255,255,255,0.04)'}}>
              <div className="whitespace-nowrap inline-flex animate-marquee gap-16 text-[#0ea5e9] font-semibold text-base">
                <Link href="/text/base64" className="mx-8 hover:underline">Base64 Encode/Decode</Link>
                <Link href="/json/beautify" className="mx-8 hover:underline">JSON Beautifier</Link>
                <Link href="/qr/encode" className="mx-8 hover:underline">QR Code Generator</Link>
                <Link href="/generators/uuid" className="mx-8 hover:underline">UUID Generator</Link>
                <Link href="/crypto/sha256" className="mx-8 hover:underline">SHA-256 Hash</Link>
                <Link href="/json/jwt" className="mx-8 hover:underline">JWT Decoder</Link>
                <Link href="/media/image" className="mx-8 hover:underline">Image to Base64</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Search bar below popular tools */}
        <div className="flex flex-col items-center w-full mb-4 mt-2">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setShowDropdown(true) }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 120)}
              placeholder="Search tools..."
              className="glass-input w-full px-4 py-2 text-base rounded shadow"
            />
            {showDropdown && search.length >= 2 && filtered.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-[#232427] border border-[#0ea5e9] rounded shadow-lg z-20 max-h-60 overflow-auto">
                {filtered.map(tool => (
                  <div
                    key={tool.path}
                    className="px-4 py-2 cursor-pointer hover:bg-[#0ea5e9]/20 text-gray-200 text-sm"
                    onMouseDown={() => { router.push(tool.path); setShowDropdown(false); setSearch('') }}
                  >
                    {tool.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="glass-card p-3">
            <h2 className="text-xl font-bold text-white mb-4">
              <span className="text-[#0ea5e9]">#</span> Text Encodings
            </h2>
            <div className="space-y-0.5">
              <Link href="/text/base64" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                Base64 Encode/Decode
              </Link>
              <Link href="/text/base32" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                Base32 Encode/Decode
              </Link>
              <Link href="/text/basen" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                BaseN Encode/Decode
              </Link>
              <Link href="/text/url" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                URL Encode/Decode
              </Link>
            </div>
          </div>

          <div className="glass-card p-3">
            <h2 className="text-xl font-bold text-white mb-4">
              <span className="text-[#0ea5e9]">#</span> Cryptographic
            </h2>
            <div className="space-y-0.5">
              <Link href="/crypto/md5" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                MD5 Hash
              </Link>
              <Link href="/crypto/sha1" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                SHA-1 Hash
              </Link>
              <Link href="/crypto/sha256" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                SHA-256 Hash
              </Link>
              <Link href="/crypto/sha512" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                SHA-512 Hash
              </Link>
            </div>
          </div>

          <div className="glass-card p-3">
            <h2 className="text-xl font-bold text-white mb-4">
              <span className="text-[#0ea5e9]">#</span> JSON Tools
            </h2>
            <div className="space-y-0.5">
              <Link href="/json/beautify" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                JSON Beautifier
              </Link>
              <Link href="/json/jwt" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                JWT Decoder
              </Link>
              <Link href="/json/stringify" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                JSON Stringify
              </Link>
              <Link href="/json/xml" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                XML Decoder
              </Link>
              <Link href="/json/tree" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                JSON Tree Visualizer
              </Link>
            </div>
          </div>

          <div className="glass-card p-3">
            <h2 className="text-xl font-bold text-white mb-4">
              <span className="text-[#0ea5e9]">#</span> Generators
            </h2>
            <div className="space-y-0.5">
              <Link href="/generators/text" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                Random Text
              </Link>
              <Link href="/generators/person" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                Person Data
              </Link>
              <Link href="/generators/numbers" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                Number Generator
              </Link>
              <Link href="/generators/uuid" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                UUID Generator
              </Link>
            </div>
          </div>

          <div className="glass-card p-3">
            <h2 className="text-xl font-bold text-white mb-4">
              <span className="text-[#0ea5e9]">#</span> Visual Tools
            </h2>
            <div className="space-y-0.5">
              <Link href="/media/image" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                Image to Base64
              </Link>
              <Link href="/media/file" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                File to Base64
              </Link>
              <Link href="/qr/encode" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                QR Code Generator
              </Link>
              <Link href="/qr/decode" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                QR Code Scanner
              </Link>
            </div>
          </div>

          <div className="glass-card p-3">
            <h2 className="text-xl font-bold text-white mb-4">
              <span className="text-[#0ea5e9]">#</span> API Tools
            </h2>
            <div className="space-y-0.5">
              <Link href="/api/request" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                API Request Builder
              </Link>
              <Link href="/api/docs" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                API Documentation Generator
              </Link>
              <Link href="/api/graphql" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                GraphQL Explorer
              </Link>
              <Link href="/api/performance" className="block p-2 rounded text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]">
                API Performance Tester
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
} 