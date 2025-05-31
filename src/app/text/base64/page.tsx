'use client'

import EncodingTool from '@/components/encoding-tool'
import { Base64 } from 'js-base64'

export default function Base64Page() {
  const encodeBase64 = (input: string) => {
    return Base64.encode(input)
  }

  const decodeBase64 = (input: string) => {
    return Base64.decode(input)
  }

  return (
    <EncodingTool
      title="Base64 Encode/Decode"
      encodeFunction={encodeBase64}
      decodeFunction={decodeBase64}
      placeholder="Enter text to encode/decode in Base64..."
    />
  )
} 