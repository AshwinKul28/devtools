'use client'

import { useEffect, useState } from 'react'

interface GoogleAdProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
  style?: React.CSSProperties
  className?: string
}

interface AdSenseConfig {
  onload?: () => void
  onerror?: (error: any) => void
}

declare global {
  interface Window {
    adsbygoogle: (AdSenseConfig | {})[]
  }
}

export default function GoogleAd({ slot, format = 'auto', style, className }: GoogleAdProps) {
  const [adError, setAdError] = useState(false)
  const [adLoaded, setAdLoaded] = useState(false)

  useEffect(() => {
    const loadAd = () => {
      try {
        // Check if adsbygoogle is available
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          console.log(`Attempting to load ad for slot: ${slot}`)
          // Push the ad to the adsbygoogle queue
          const config: AdSenseConfig = {
            onload: () => {
              console.log(`Ad loaded successfully for slot: ${slot}`)
              setAdLoaded(true)
            },
            onerror: (error: any) => {
              console.error(`Ad failed to load for slot: ${slot}`, error)
              setAdError(true)
            }
          }
          window.adsbygoogle.push(config)
        } else {
          console.warn('AdSense script not loaded yet')
        }
      } catch (err) {
        console.error('Error loading Google Ad:', err)
        setAdError(true)
      }
    }

    // Try to load the ad after a short delay to ensure the script is ready
    const timer = setTimeout(loadAd, 1000)
    return () => clearTimeout(timer)
  }, [slot]) // Add slot to dependency array

  if (adError) {
    console.warn(`Ad error for slot: ${slot}`)
    return null
  }

  return (
    <div className={`google-ad-container ${className || ''}`} style={style}>
      {!adLoaded && !adError && (
        <div className="text-center text-gray-400 text-sm py-2">
          Loading ad...
        </div>
      )}
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style,
        }}
        data-ad-client="ca-pub-1711684120101178"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        data-adtest={process.env.NODE_ENV === 'development' ? 'on' : 'off'}
      />
    </div>
  )
} 