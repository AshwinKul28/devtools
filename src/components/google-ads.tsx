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
  const [isVisible, setIsVisible] = useState(false)
  const adRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Set dimensions based on format
  const dimensions = {
    horizontal: { width: '728px', height: '90px' },
    vertical: { width: '300px', height: '600px' },
    square: { width: '300px', height: '300px' }
  }

  const formatDimensions = dimensions[format as keyof typeof dimensions] || dimensions.horizontal

  useEffect(() => {
    // Set up intersection observer to detect when ad container is visible
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observerRef.current?.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (adRef.current) {
      observerRef.current.observe(adRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible || typeof window === 'undefined' || loadedSlots.has(slot)) {
      return
    }

    const loadAd = () => {
      try {
        // Initialize adsbygoogle if it doesn't exist
        window.adsbygoogle = window.adsbygoogle || []
        
        // Only load if the container has dimensions
        const container = adRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) {
          console.log('Container has no dimensions, waiting...')
          return
        }

        // Mark this slot as loaded
        loadedSlots.add(slot)

        // Push the ad configuration
        window.adsbygoogle.push({})
      } catch (err) {
        console.error('Error loading Google Ad:', err)
        setAdError(true)
        loadedSlots.delete(slot)
      }
    }

    // Wait for the AdSense script to load
    if (window.adsbygoogle) {
      loadAd()
    } else {
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
      loadedSlots.delete(slot)
    }
  }, [slot, isVisible])

  if (adError) {
    return null
  }

  return (
    <div 
      ref={adRef}
      className={`google-ad-container ${className || ''}`} 
      style={{
        position: 'relative',
        display: 'block',
        width: formatDimensions.width,
        height: formatDimensions.height,
        minWidth: formatDimensions.width,
        minHeight: formatDimensions.height,
        ...style
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          minWidth: formatDimensions.width,
          minHeight: formatDimensions.height
        }}
        data-ad-client="ca-pub-1711684120101178"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
} 