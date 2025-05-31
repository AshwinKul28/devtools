import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GraphQL Explorer',
  description: 'Explore and test GraphQL APIs with our powerful GraphQL Explorer. Build queries, explore schemas, and test your GraphQL endpoints.',
  keywords: ['GraphQL', 'GraphQL explorer', 'GraphQL client', 'API testing', 'GraphQL schema', 'GraphQL queries'],
  openGraph: {
    title: 'GraphQL Explorer - Test & Explore GraphQL APIs',
    description: 'Explore and test GraphQL APIs with our powerful GraphQL Explorer. Build queries, explore schemas, and test your GraphQL endpoints.',
    images: [
      {
        url: '/graphql-explorer-og.png',
        width: 1200,
        height: 630,
        alt: 'GraphQL Explorer Tool'
      }
    ]
  },
  twitter: {
    title: 'GraphQL Explorer - Test & Explore GraphQL APIs',
    description: 'Explore and test GraphQL APIs with our powerful GraphQL Explorer. Build queries, explore schemas, and test your GraphQL endpoints.',
    images: ['/graphql-explorer-og.png']
  }
} 