'use client'

import { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

type QRMode = 'text' | 'url' | 'vcard' | 'wifi'

interface VCardData {
  name: string
  phone: string
  email: string
  company: string
  title: string
}

interface WifiData {
  ssid: string
  password: string
  encryption: 'WPA' | 'WEP' | 'nopass'
  hidden: boolean
}

export default function QRGenerator() {
  const [mode, setMode] = useState<QRMode>('text')
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [vcard, setVCard] = useState<VCardData>({
    name: '',
    phone: '',
    email: '',
    company: '',
    title: '',
  })
  const [wifi, setWifi] = useState<WifiData>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  })
  const [size, setSize] = useState(256)
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M')
  const qrRef = useRef<HTMLDivElement>(null)

  const generateQRValue = () => {
    switch (mode) {
      case 'text':
        return text
      case 'url':
        return url
      case 'vcard':
        const vcardData = [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${vcard.name}`,
          `TEL:${vcard.phone}`,
          `EMAIL:${vcard.email}`,
          `ORG:${vcard.company}`,
          `TITLE:${vcard.title}`,
          'END:VCARD',
        ].join('\n')
        return vcardData
      case 'wifi':
        const wifiData = [
          'WIFI:',
          `S:${wifi.ssid}`,
          `T:${wifi.encryption}`,
          `P:${wifi.password}`,
          wifi.hidden ? 'H:true' : '',
        ].filter(Boolean).join(';')
        return wifiData
      default:
        return ''
    }
  }

  const downloadQRCode = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (!svg) return

    // Create a canvas with the same size as the QR code
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match QR code size plus padding
    const padding = 16 // 8px padding on each side
    canvas.width = size + padding * 2
    canvas.height = size + padding * 2

    // Fill white background
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Convert SVG to data URL
    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    // Create image from SVG
    const img = new Image()
    img.onload = () => {
      // Draw image centered on canvas
      ctx.drawImage(img, padding, padding, size, size)
      URL.revokeObjectURL(url)

      // Convert to PNG and download
      const pngUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = 'qrcode.png'
      link.href = pngUrl
      link.click()
    }
    img.src = url
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">
          <span className="text-[#0ea5e9]">#</span> QR Code Generator
        </h1>

        <div className="glass-card p-6 mb-6">
          <div className="flex space-x-4 mb-6">
            {(['text', 'url', 'vcard', 'wifi'] as QRMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 rounded capitalize ${
                  mode === m
                    ? 'bg-[#0ea5e9] text-white'
                    : 'bg-[#2a2b2e] text-gray-300 hover:bg-[#3a3b3e]'
                }`}
              >
                {m === 'text' ? 'Plain Text' : m === 'url' ? 'URL' : m === 'vcard' ? 'Contact Card' : 'WiFi Network'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {mode === 'text' && (
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-300 mb-2">
                  Text Content
                </label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-2 bg-[#2a2b2e] border border-gray-700 rounded text-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                  rows={4}
                  placeholder="Enter text to encode"
                />
              </div>
            )}

            {mode === 'url' && (
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-2 bg-[#2a2b2e] border border-gray-700 rounded text-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>
            )}

            {mode === 'vcard' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={vcard.name}
                    onChange={(e) => setVCard({ ...vcard, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2b2e] border border-gray-700 rounded text-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={vcard.phone}
                    onChange={(e) => setVCard({ ...vcard, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2b2e] border border-gray-700 rounded text-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={vcard.email}
                    onChange={(e) => setVCard({ ...vcard, email: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2b2e] border border-gray-700 rounded text-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={vcard.company}
                    onChange={(e) => setVCard({ ...vcard, company: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2b2e] border border-gray-700 rounded text-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={vcard.title}
                    onChange={(e) => setVCard({ ...vcard, title: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2b2e] border border-gray-700 rounded text-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {mode === 'wifi' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ssid" className="block text-sm font-medium text-gray-300 mb-2">
                    Network Name (SSID)
                  </label>
                  <input
                    type="text"
                    id="ssid"
                    value={wifi.ssid}
                    onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2b2e] border border-gray-700 rounded text-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={wifi.password}
                    onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2a2b2e] border border-gray-700 rounded text-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="encryption" className="block text-sm font-medium text-gray-300 mb-2">
                    Encryption
                  </label>
                  <select
                    id="encryption"
                    value={wifi.encryption}
                    onChange={(e) => setWifi({ ...wifi, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' })}
                    className="w-full px-4 py-2 bg-[#2a2b2e] border border-gray-700 rounded text-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                  >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">No Password</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center space-x-2 text-gray-300">
                    <input
                      type="checkbox"
                      checked={wifi.hidden}
                      onChange={(e) => setWifi({ ...wifi, hidden: e.target.checked })}
                      className="rounded border-gray-700 text-[#0ea5e9] focus:ring-[#0ea5e9]"
                    />
                    <span>Hidden Network</span>
                  </label>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-300 mb-2">
                  Size (px)
                </label>
                <input
                  type="number"
                  id="size"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  min="100"
                  max="1000"
                  className="w-full px-4 py-2 bg-[#2a2b2e] border border-gray-700 rounded text-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="errorCorrection" className="block text-sm font-medium text-gray-300 mb-2">
                  Error Correction
                </label>
                <select
                  id="errorCorrection"
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                  className="w-full px-4 py-2 bg-[#2a2b2e] border border-gray-700 rounded text-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {generateQRValue() && (
          <div className="glass-card p-6 flex flex-col items-center">
            <div ref={qrRef} className="bg-white p-4 rounded-lg mb-4">
              <QRCodeSVG
                value={generateQRValue()}
                size={size}
                level={errorCorrection}
                includeMargin={true}
              />
            </div>
            <button
              onClick={downloadQRCode}
              className="px-4 py-2 bg-[#0ea5e9] text-white rounded hover:bg-[#0284c7] transition-colors"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 