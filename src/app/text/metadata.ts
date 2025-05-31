import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Encoding Tools',
  description: 'Encode and decode text using various encoding schemes including Base64, Base32, URL encoding, and more. Transform text data between different formats.',
  keywords: ['text encoding', 'Base64', 'Base32', 'URL encoding', 'text decoder', 'text encoder', 'encoding tools'],
  openGraph: {
    title: 'Text Encoding Tools - Encode & Decode Text',
    description: 'Transform text data between different formats using Base64, Base32, URL encoding, and more.',
    images: [
      {
        url: '/text-tools-og.png',
        width: 1200,
        height: 630,
        alt: 'Text Encoding Tools - Encode & Decode Text'
      }
    ]
  },
  twitter: {
    title: 'Text Encoding Tools - Encode & Decode Text',
    description: 'Transform text data between different formats using Base64, Base32, URL encoding, and more.',
    images: ['/text-tools-og.png']
  }
} 