import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JSON Beautifier',
  description: 'Format and beautify your JSON data with proper indentation and syntax highlighting. Make your JSON code more readable and easier to understand.',
  keywords: ['JSON beautifier', 'JSON formatter', 'JSON prettifier', 'format JSON', 'JSON indentation', 'JSON syntax'],
  openGraph: {
    title: 'JSON Beautifier - Format & Pretty Print JSON',
    description: 'Format and beautify your JSON data with proper indentation and syntax highlighting.',
    images: [
      {
        url: '/json-beautifier-og.png',
        width: 1200,
        height: 630,
        alt: 'JSON Beautifier Tool'
      }
    ]
  },
  twitter: {
    title: 'JSON Beautifier - Format & Pretty Print JSON',
    description: 'Format and beautify your JSON data with proper indentation and syntax highlighting.',
    images: ['/json-beautifier-og.png']
  }
} 