import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Performance Tester',
  description: 'Test and analyze API performance with our comprehensive performance testing tool. Measure response times, throughput, and generate detailed reports.',
  keywords: ['API performance', 'load testing', 'performance testing', 'API benchmark', 'response time', 'throughput testing'],
  openGraph: {
    title: 'API Performance Tester - Load Test & Benchmark APIs',
    description: 'Test and analyze API performance with our comprehensive performance testing tool. Measure response times, throughput, and generate detailed reports.',
    images: [
      {
        url: '/api-performance-tester-og.png',
        width: 1200,
        height: 630,
        alt: 'API Performance Tester Tool'
      }
    ]
  },
  twitter: {
    title: 'API Performance Tester - Load Test & Benchmark APIs',
    description: 'Test and analyze API performance with our comprehensive performance testing tool. Measure response times, throughput, and generate detailed reports.',
    images: ['/api-performance-tester-og.png']
  }
} 