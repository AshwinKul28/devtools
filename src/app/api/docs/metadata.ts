import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Documentation Generator',
  description: 'Generate beautiful API documentation from OpenAPI/Swagger specifications. Import, edit, and export API documentation with ease.',
  keywords: ['API documentation', 'OpenAPI', 'Swagger', 'API docs', 'documentation generator', 'API spec'],
  openGraph: {
    title: 'API Documentation Generator - Create Beautiful API Docs',
    description: 'Generate beautiful API documentation from OpenAPI/Swagger specifications. Import, edit, and export API documentation with ease.',
    images: [
      {
        url: '/api-docs-generator-og.png',
        width: 1200,
        height: 630,
        alt: 'API Documentation Generator Tool'
      }
    ]
  },
  twitter: {
    title: 'API Documentation Generator - Create Beautiful API Docs',
    description: 'Generate beautiful API documentation from OpenAPI/Swagger specifications. Import, edit, and export API documentation with ease.',
    images: ['/api-docs-generator-og.png']
  }
} 