import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Generators',
  description: 'Generate test data, UUIDs, random numbers, and mock data for your applications. Perfect for development, testing, and prototyping.',
  keywords: ['data generators', 'UUID generator', 'random data', 'mock data', 'test data', 'fake data generator'],
  openGraph: {
    title: 'Data Generators - Create Test & Mock Data',
    description: 'Generate test data, UUIDs, random numbers, and mock data for your applications. Perfect for development and testing.',
    images: [
      {
        url: '/generators-og.png',
        width: 1200,
        height: 630,
        alt: 'Data Generators - Create Test & Mock Data'
      }
    ]
  },
  twitter: {
    title: 'Data Generators - Create Test & Mock Data',
    description: 'Generate test data, UUIDs, random numbers, and mock data for your applications. Perfect for development and testing.',
    images: ['/generators-og.png']
  }
} 