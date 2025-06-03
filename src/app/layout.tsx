import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/header'
import Footer from '@/components/footer'

const openSans = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: {
    default: 'DevToolsLab - Developer Tools & Utilities',
    template: '%s | DevToolsLab'
  },
  description: 'A comprehensive collection of developer tools, encoding/decoding utilities, and API testing tools. Built for developers, by developers.',
  keywords: ['developer tools', 'encoding', 'decoding', 'API testing', 'utilities', 'web development'],
  authors: [{ name: 'DevToolsLab Team' }],
  creator: 'DevToolsLab',
  publisher: 'DevToolsLab',
  metadataBase: new URL('https://DevToolsLab.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://DevToolsLab.dev',
    siteName: 'DevToolsLab',
    title: 'DevToolsLab - Developer Tools & Utilities',
    description: 'A comprehensive collection of developer tools, encoding/decoding utilities, and API testing tools.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevToolsLab - Developer Tools & Utilities'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevToolsLab - Developer Tools & Utilities',
    description: 'A comprehensive collection of developer tools, encoding/decoding utilities, and API testing tools.',
    images: ['/og-image.png'],
    creator: '@DevToolsLab'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-site-verification',
    other: {
      'google-adsense-account': 'ca-pub-1711684120101178'
    }
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1711684120101178"
          crossOrigin="anonymous"
        />
      </head>
      <body className={openSans.className}>
        <div className="min-h-screen flex flex-col bg-[#1a1b1e] text-[#e4e4e7]">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
} 