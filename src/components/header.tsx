'use client'

import { useState } from 'react'
import { FiMenu, FiX, FiHome } from 'react-icons/fi'
import Link from 'next/link'
import GoogleAd from './google-ads'

const categories = [
  {
    name: 'Text Encodings',
    tools: [
      { name: 'Base64 Encode/Decode', path: '/text/base64' },
      { name: 'Base32 Encode/Decode', path: '/text/base32' },
      { name: 'BaseN Encode/Decode', path: '/text/basen' },
      { name: 'URL Encode/Decode', path: '/text/url' },
    ],
  },
  {
    name: 'Cryptographic',
    tools: [
      { name: 'MD5 Hash', path: '/crypto/md5' },
      { name: 'SHA-1 Hash', path: '/crypto/sha1' },
      { name: 'SHA-256 Hash', path: '/crypto/sha256' },
      { name: 'SHA-512 Hash', path: '/crypto/sha512' },
    ],
  },
  {
    name: 'Media',
    tools: [
      { name: 'Image to Base64', path: '/media/image' },
      { name: 'File to Base64', path: '/media/file' },
    ],
  },
  {
    name: 'JSON Tools',
    tools: [
      { name: 'JSON Beautifier', path: '/json/beautify' },
      { name: 'JWT Decoder', path: '/json/jwt' },
      { name: 'JSON Stringify', path: '/json/stringify' },
      { name: 'XML Decoder', path: '/json/xml' },
    ],
  },
  {
    name: 'Random Generators',
    tools: [
      { name: 'Random Text', path: '/generators/text' },
      { name: 'Person Data', path: '/generators/person' },
      { name: 'Number Generator', path: '/generators/numbers' },
    ],
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHamburgerHovered, setIsHamburgerHovered] = useState(false)

  return (
    <header className="bg-[#2a2b2e] border-b border-[#3a3b3e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 transition-colors bg-transparent p-0 focus:bg-transparent active:bg-transparent border-none outline-none shadow-none"
              style={{ lineHeight: 0, background: 'transparent' }}
              onMouseEnter={() => setIsHamburgerHovered(true)}
              onMouseLeave={() => setIsHamburgerHovered(false)}
            >
              {isMenuOpen
                ? <FiX size={24} color={isHamburgerHovered ? '#0ea5e9' : undefined} />
                : <FiMenu size={24} color={isHamburgerHovered ? '#0ea5e9' : undefined} />}
            </button>
          </div>

          {/* Header Ad - Only visible on larger screens */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-4">
            <GoogleAd
              slot="5477985519"
              format="horizontal"
              className="w-[728px] h-[90px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="p-2 rounded-md text-gray-400 hover:text-[#0ea5e9] transition-colors"
              title="Go to Home"
            >
              <FiHome size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-[#2a2b2e] border-r border-[#3a3b3e] transition-transform duration-200 ease-in-out z-50`}
      >
        <div className="h-full overflow-y-auto py-6 px-4">
          {categories.map((category) => (
            <div key={category.name} className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {category.name}
              </h3>
              <div className="space-y-1">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.path}
                    className="block px-3 py-2 rounded-md text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1e3a8a]/30 hover:via-[#0ea5e9]/20 hover:to-[#1e3a8a]/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:scale-[1.02]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  )
}