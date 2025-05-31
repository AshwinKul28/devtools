import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media Tools',
  description: 'Powerful media manipulation tools including image processing, file conversion, and media analysis utilities. Transform, convert, and analyze your media files with ease.',
  keywords: ['media tools', 'image processing', 'file conversion', 'media analysis', 'image converter', 'file tools'],
  openGraph: {
    title: 'Media Tools - Image & File Processing Utilities',
    description: 'Transform, convert, and analyze your media files with our comprehensive suite of media tools.',
    images: [
      {
        url: '/media-tools-og.png',
        width: 1200,
        height: 630,
        alt: 'Media Tools - Image & File Processing Utilities'
      }
    ]
  },
  twitter: {
    title: 'Media Tools - Image & File Processing Utilities',
    description: 'Transform, convert, and analyze your media files with our comprehensive suite of media tools.',
    images: ['/media-tools-og.png']
  }
} 