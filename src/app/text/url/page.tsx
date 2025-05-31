'use client'

import EncodingTool from '@/components/encoding-tool'

export default function UrlPage() {
  const encodeUrl = (input: string) => {
    return encodeURIComponent(input)
  }

  const decodeUrl = (input: string) => {
    return decodeURIComponent(input)
  }

  return (
    <EncodingTool
      title="URL Encode/Decode"
      encodeFunction={encodeUrl}
      decodeFunction={decodeUrl}
      placeholder="Enter text to encode/decode in URL format..."
    />
  )
} 