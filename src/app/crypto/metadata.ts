import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cryptography Tools',
  description: 'Secure cryptographic tools for hashing, encryption, and data security. Calculate MD5, SHA-1, SHA-256, and SHA-512 hashes with ease.',
  keywords: ['cryptography tools', 'hash calculator', 'MD5', 'SHA-1', 'SHA-256', 'SHA-512', 'crypto tools', 'hash generator'],
  openGraph: {
    title: 'Cryptography Tools - Hash & Security Utilities',
    description: 'Calculate MD5, SHA-1, SHA-256, and SHA-512 hashes with our secure cryptographic tools.',
    images: [
      {
        url: '/crypto-tools-og.png',
        width: 1200,
        height: 630,
        alt: 'Cryptography Tools - Hash & Security Utilities'
      }
    ]
  },
  twitter: {
    title: 'Cryptography Tools - Hash & Security Utilities',
    description: 'Calculate MD5, SHA-1, SHA-256, and SHA-512 hashes with our secure cryptographic tools.',
    images: ['/crypto-tools-og.png']
  }
} 