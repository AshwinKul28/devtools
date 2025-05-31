import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MD5 Hash Calculator',
  description: 'Calculate MD5 hash values for your text or files. Generate secure MD5 hashes instantly with our easy-to-use hash calculator.',
  keywords: ['MD5 calculator', 'MD5 hash', 'MD5 generator', 'hash calculator', 'MD5 checksum', 'MD5 converter'],
  openGraph: {
    title: 'MD5 Hash Calculator - Generate MD5 Hashes',
    description: 'Calculate MD5 hash values for your text or files instantly with our easy-to-use hash calculator.',
    images: [
      {
        url: '/md5-calculator-og.png',
        width: 1200,
        height: 630,
        alt: 'MD5 Hash Calculator Tool'
      }
    ]
  },
  twitter: {
    title: 'MD5 Hash Calculator - Generate MD5 Hashes',
    description: 'Calculate MD5 hash values for your text or files instantly with our easy-to-use hash calculator.',
    images: ['/md5-calculator-og.png']
  }
} 