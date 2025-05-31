import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Request Builder',
  description: 'Test and debug your APIs with our powerful API Request Builder. Supports GET, POST, PUT, DELETE methods, custom headers, query parameters, and JSON/XML/form data.',
  keywords: ['API testing', 'API request builder', 'REST API', 'HTTP client', 'API debugger', 'API development'],
  openGraph: {
    title: 'API Request Builder - Test & Debug APIs',
    description: 'Test and debug your APIs with our powerful API Request Builder. Supports all HTTP methods, custom headers, and multiple data formats.',
    images: [
      {
        url: '/api-request-builder-og.png',
        width: 1200,
        height: 630,
        alt: 'API Request Builder Tool'
      }
    ]
  },
  twitter: {
    title: 'API Request Builder - Test & Debug APIs',
    description: 'Test and debug your APIs with our powerful API Request Builder. Supports all HTTP methods, custom headers, and multiple data formats.',
    images: ['/api-request-builder-og.png']
  }
} 