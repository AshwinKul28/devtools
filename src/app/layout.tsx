import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Script from 'next/script'
import GoogleAd from '@/components/google-ads'

const openSans = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: {
    default: 'TechToolbox - Developer Tools & Utilities',
    template: '%s | TechToolbox'
  },
  description: 'TechToolbox is your all-in-one tech tool box and developer toolbox, offering a comprehensive collection of online developer tools, encoding/decoding utilities, API testing tools, code utilities, and productivity resources for programmers and web developers. Boost your workflow with our powerful, easy-to-use web utilities and software toolbox.',
  keywords: [
    'developer tools',
    'tech tool box',
    'developer toolbox',
    'online developer tools',
    'web utilities',
    'code utilities',
    'software toolbox',
    'programming tools',
    'tech utilities',
    'productivity tools for developers',
    'encoding',
    'decoding',
    'API testing',
    'utilities',
    'web development',
    'online code tools',
    'free developer tools',
    'web developer resources',
    'online code converter',
    'code formatter',
    'code minifier',
    'JSON tools',
    'base64 encoder',
    'base64 encoding',
    'base64 decoding',
    'online base64 encoder',
    'online base64 decoder',
    'convert text to base64',
    'decode base64 to text',
    'base64 string converter',
    'base64 file encoder',
    'base64 file decoder',
    'base32 encoder',
    'base32 encoding',
    'base32 decoding',
    'online base32 encoder',
    'online base32 decoder',
    'convert text to base32',
    'decode base32 to text',
    'baseN encoder',
    'baseN encoding',
    'baseN decoding',
    'online baseN encoder',
    'online baseN decoder',
    'convert text to baseN',
    'url encoder',
    'url encoding',
    'url decoding',
    'online url encoder',
    'online url decoder',
    'encode url string',
    'decode url string',
    'json beautifier',
    'json formatter',
    'json minifier',
    'json validator',
    'online json beautifier',
    'online json formatter',
    'online json validator',
    'json stringifier',
    'json parser',
    'jwt decoder',
    'decode jwt token online',
    'md5 hash generator',
    'sha1 hash generator',
    'sha256 hash generator',
    'sha512 hash generator',
    'online hash generator',
    'generate md5 hash',
    'generate sha256 hash',
    'generate sha512 hash',
    'image to base64 converter',
    'file to base64 converter',
    'convert image to base64 online',
    'convert file to base64 online',
    'qr code generator',
    'qr code encoder',
    'qr code decoder',
    'online qr code generator',
    'online qr code decoder',
    'random text generator',
    'random person data generator',
    'random number generator',
    'uuid generator online',
    'online encoding tools',
    'online decoding tools',
    'free developer utilities',
    'web developer toolbox',
    'software development tools online',
    'online string tools',
    'online file tools',
    'online cryptography tools',
    'online text tools',
    'online QR code generator'
  ],
  authors: [{ name: 'TechToolbox Team' }],
  creator: 'TechToolbox',
  publisher: 'TechToolbox',
  metadataBase: new URL('https://techtoolbox.site'),
  alternates: {
    canonical: 'https://techtoolbox.site/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techtoolbox.site',
    siteName: 'TechToolbox',
    title: 'TechToolbox - Tech Tool Box & Developer Tools',
    description: 'TechToolbox is the ultimate tech tool box and developer toolbox, featuring online developer tools, code utilities, and productivity resources for programmers and web developers.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TechToolbox - Tech Tool Box & Developer Tools'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechToolbox - Tech Tool Box & Developer Tools',
    description: 'TechToolbox is the ultimate tech tool box and developer toolbox, featuring online developer tools, code utilities, and productivity resources for programmers and web developers.',
    images: ['/og-image.png'],
    creator: '@TechToolboxSite'
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
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1711684120101178"
          crossOrigin="anonymous"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <meta name="theme-color" content="#0ea5e9" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'TechToolbox',
              url: 'https://techtoolbox.site',
              description: 'TechToolbox is your all-in-one tech tool box and developer toolbox, offering a comprehensive collection of online developer tools, encoding/decoding utilities, API testing tools, code utilities, and productivity resources for programmers and web developers. Boost your workflow with our powerful, easy-to-use web utilities and software toolbox.'
            })
          }}
        />
      </head>
      <body className={openSans.className}>
        <div className="min-h-screen flex flex-col bg-[#1a1b1e] text-[#e4e4e7]">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <div className="w-full border-t border-gray-800">
            <GoogleAd
              slot="5477985519"
              format="horizontal"
              className="w-[728px] h-[90px] mx-auto my-4"
            />
          </div>
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
} 