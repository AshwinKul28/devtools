import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JSON Tools',
  description: 'Comprehensive JSON utilities including beautifier, validator, converter, and JWT tools. Format, validate, and transform your JSON data with ease.',
  keywords: ['JSON tools', 'JSON beautifier', 'JSON validator', 'JWT tools', 'JSON converter', 'JSON formatter'],
  openGraph: {
    title: 'JSON Tools - Format, Validate & Transform JSON',
    description: 'Format, validate, and transform your JSON data with our comprehensive suite of JSON utilities.',
    images: [
      {
        url: '/json-tools-og.png',
        width: 1200,
        height: 630,
        alt: 'JSON Tools - Format, Validate & Transform JSON'
      }
    ]
  },
  twitter: {
    title: 'JSON Tools - Format, Validate & Transform JSON',
    description: 'Format, validate, and transform your JSON data with our comprehensive suite of JSON utilities.',
    images: ['/json-tools-og.png']
  }
} 