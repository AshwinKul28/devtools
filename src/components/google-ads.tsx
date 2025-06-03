'use client'

import { useEffect, useState, useRef } from 'react'

interface GoogleAdProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
  style?: React.CSSProperties
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

// Keep track of loaded slots to prevent duplicate loads
const loadedSlots = new Set<string>()

export default function GoogleAd({ slot, format = 'auto', style, className }: GoogleAdProps) {
  const [adError, setAdError] = useState(false)
  const [adLoaded, setAdLoaded] = useState(false)
  const adRef = useRef<HTMLDivElement>(null)
  const hasAttemptedLoad = useRef(false)

  useEffect(() => {
    // Cleanup function to remove the slot from loaded slots when component unmounts
    return () => {
      loadedSlots.delete(slot)
    }
  }, [slot])

  useEffect(() => {
    if (typeof window === 'undefined' || hasAttemptedLoad.current) {
      return
    }

    const loadAd = () => {
      try {
        // Initialize adsbygoogle if it doesn't exist
        window.adsbygoogle = window.adsbygoogle || []
        
        // Only push if we haven't attempted to load this ad yet
        if (!hasAttemptedLoad.current) {
          hasAttemptedLoad.current = true
          window.adsbygoogle.push({})
        }
      } catch (err) {
        console.error('Error loading Google Ad:', err)
        setAdError(true)
        hasAttemptedLoad.current = false
      }
    }

    // Wait for the AdSense script to load
    if (window.adsbygoogle) {
      loadAd()
    } else {
      // If script isn't loaded yet, wait for it
      const checkAdsbyGoogle = setInterval(() => {
        if (window.adsbygoogle) {
          clearInterval(checkAdsbyGoogle)
          loadAd()
        }
      }, 100)

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkAdsbyGoogle), 10000)
    }

    return () => {
      hasAttemptedLoad.current = false
    }
  }, [slot])

  if (adError) {
    return null
  }

  // Set dimensions based on format
  const dimensions = {
    horizontal: { width: '728px', height: '90px' },
    vertical: { width: '300px', height: '600px' },
    square: { width: '300px', height: '300px' }
  }

  const formatDimensions = dimensions[format as keyof typeof dimensions] || dimensions.horizontal

  return (
    <div 
      ref={adRef}
      className={`google-ad-container ${className || ''}`} 
      style={{
        position: 'relative',
        display: 'block',
        width: formatDimensions.width,
        height: formatDimensions.height,
        ...style
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
        data-ad-client="ca-pub-1711684120101178"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
} 