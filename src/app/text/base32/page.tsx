'use client'

import EncodingTool from '@/components/encoding-tool'
import base32 from 'base32.js'

export default function Base32Page() {
  const encodeBase32 = (input: string) => {
    const encoder = new base32.Encoder()
    return encoder.write(Buffer.from(input, 'utf8')).finalize()
  }

  const decodeBase32 = (input: string) => {
    const decoder = new base32.Decoder()
    const decoded = decoder.write(input).finalize()
    return Buffer.from(decoded).toString('utf8')
  }

  return (
    <EncodingTool
      title="Base32 Encode/Decode"
      encodeFunction={encodeBase32}
      decodeFunction={decodeBase32}
      placeholder="Enter text to encode/decode in Base32..."
    />
  )
} 