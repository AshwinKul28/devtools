'use client'

import { useState, useRef, useEffect } from 'react'
import jsQR from 'jsqr'

export default function QRDecoder() {
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [mode, setMode] = useState<'camera' | 'upload'>('camera')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    if (mode === 'camera') {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [mode])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      requestAnimationFrame(scanQRCode)
    } catch (err) {
      setError('Failed to access camera. Please check permissions.')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current || mode !== 'camera') return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (video.readyState === video.HAVE_ENOUGH_DATA && context) {
      canvas.height = video.videoHeight
      canvas.width = video.videoWidth
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (code) {
        setResult(code.data)
        setError('')
      }
    }

    if (mode === 'camera') {
      requestAnimationFrame(scanQRCode)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const imageUrl = URL.createObjectURL(file)
      const img = new Image()
      img.src = imageUrl

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      const canvas = canvasRef.current
      const context = canvas?.getContext('2d')
      if (!canvas || !context) return

      canvas.width = img.width
      canvas.height = img.height
      context.drawImage(img, 0, 0)
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (code) {
        setResult(code.data)
        setError('')
      } else {
        setError('No QR code found in the image')
        setResult('')
      }
    } catch (err) {
      setError('Failed to decode QR code. Please try again.')
      setResult('')
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">
          <span className="text-[#0ea5e9]">#</span> QR Code Decoder
        </h1>

        <div className="glass-card p-6 mb-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setMode('camera')}
              className={`px-4 py-2 rounded ${
                mode === 'camera'
                  ? 'bg-[#0ea5e9] text-white'
                  : 'bg-[#2a2b2e] text-gray-300 hover:bg-[#3a3b3e]'
              }`}
            >
              Use Camera
            </button>
            <button
              onClick={() => setMode('upload')}
              className={`px-4 py-2 rounded ${
                mode === 'upload'
                  ? 'bg-[#0ea5e9] text-white'
                  : 'bg-[#2a2b2e] text-gray-300 hover:bg-[#3a3b3e]'
              }`}
            >
              Upload Image
            </button>
          </div>

          {mode === 'camera' ? (
            <div className="relative aspect-square max-w-md mx-auto">
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded"
                playsInline
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
          ) : (
            <div className="text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-[#0ea5e9] text-white rounded hover:bg-[#0284c7] transition-colors"
              >
                Choose Image
              </button>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}
        </div>

        {(result || error) && (
          <div className="glass-card p-6">
            {error ? (
              <div className="text-red-400">{error}</div>
            ) : (
              <>
                <h3 className="text-lg font-medium text-white mb-2">Decoded Result:</h3>
                <div className="bg-[#2a2b2e] p-4 rounded text-gray-300 break-all">
                  {result}
                </div>
                {result.startsWith('http') && (
                  <a
                    href={result}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block px-4 py-2 bg-[#0ea5e9] text-white rounded hover:bg-[#0284c7] transition-colors"
                  >
                    Open Link
                  </a>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 