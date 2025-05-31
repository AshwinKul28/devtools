import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder',
  description: 'Encode text to Base64 and decode Base64 to text. Convert binary data to text and vice versa with our easy-to-use Base64 tool.',
  keywords: ['Base64 encoder', 'Base64 decoder', 'Base64 converter', 'Base64 encoding', 'Base64 decoding', 'Base64 tool'],
  openGraph: {
    title: 'Base64 Encoder/Decoder - Convert Text & Binary Data',
    description: 'Encode text to Base64 and decode Base64 to text with our easy-to-use conversion tool.',
    images: [
      {
        url: '/base64-tool-og.png',
        width: 1200,
        height: 630,
        alt: 'Base64 Encoder/Decoder Tool'
      }
    ]
  },
  twitter: {
    title: 'Base64 Encoder/Decoder - Convert Text & Binary Data',
    description: 'Encode text to Base64 and decode Base64 to text with our easy-to-use conversion tool.',
    images: ['/base64-tool-og.png']
  }
} 