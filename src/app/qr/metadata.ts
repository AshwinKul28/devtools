import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QR Code Tools',
  description: 'Create, encode, and decode QR codes with our powerful QR code tools. Generate custom QR codes, scan existing ones, and convert data to QR format.',
  keywords: ['QR code tools', 'QR code generator', 'QR code scanner', 'QR code decoder', 'QR code creator', 'QR code maker'],
  openGraph: {
    title: 'QR Code Tools - Generate & Decode QR Codes',
    description: 'Create, encode, and decode QR codes with our powerful QR code tools. Generate custom QR codes and scan existing ones.',
    images: [
      {
        url: '/qr-tools-og.png',
        width: 1200,
        height: 630,
        alt: 'QR Code Tools - Generate & Decode QR Codes'
      }
    ]
  },
  twitter: {
    title: 'QR Code Tools - Generate & Decode QR Codes',
    description: 'Create, encode, and decode QR codes with our powerful QR code tools. Generate custom QR codes and scan existing ones.',
    images: ['/qr-tools-og.png']
  }
} 