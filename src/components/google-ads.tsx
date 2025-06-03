'use client'

import { useEffect, useState, useRef } from 'react'

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

// Keep track of loaded slots to prevent duplicate loads
const loadedSlots = new Set<string>()

export default function GoogleAd({ slot, format = 'auto', style, className }: GoogleAdProps) {
  const [adError, setAdError] = useState(false)
  const [adLoaded, setAdLoaded] = useState(false)
  const adRef = useRef<HTMLDivElement>(null)
  const hasAttemptedLoad = useRef(false)
  const retryTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Cleanup function to remove the slot from loaded slots when component unmounts
    return () => {
      loadedSlots.delete(slot)
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [slot])

  useEffect(() => {
    let retryCount = 0
    const maxRetries = 5

    const loadAd = () => {
      // Don't try to load if we've already loaded this slot or attempted to load
      if (loadedSlots.has(slot) || hasAttemptedLoad.current) {
        console.log(`Slot ${slot} already loaded or attempted`)
        return
      }

      try {
        if (typeof window === 'undefined') {
          console.log('Window is undefined, retrying...')
          if (retryCount < maxRetries) {
            retryCount++
            retryTimeoutRef.current = setTimeout(loadAd, 1000)
          }
          return
        }

        if (!window.adsbygoogle) {
          console.log('AdSense script not loaded yet, retrying...')
          if (retryCount < maxRetries) {
            retryCount++
            retryTimeoutRef.current = setTimeout(loadAd, 1000)
          }
          return
        }

        const container = adRef.current
        if (!container) {
          console.log('Ad container not found, retrying...')
          if (retryCount < maxRetries) {
            retryCount++
            retryTimeoutRef.current = setTimeout(loadAd, 1000)
          }
          return
        }

        // Ensure container has dimensions
        const rect = container.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) {
          console.log(`Container has invalid dimensions: ${rect.width}x${rect.height}, retrying...`)
          if (retryCount < maxRetries) {
            retryCount++
            retryTimeoutRef.current = setTimeout(loadAd, 1000)
          }
          return
        }

        // Mark that we've attempted to load this ad
        hasAttemptedLoad.current = true
        loadedSlots.add(slot)

        console.log(`Attempting to load ad for slot: ${slot} with dimensions: ${rect.width}x${rect.height}`)
        
        // Push the ad configuration
        (window.adsbygoogle = window.adsbygoogle || []).push({
          onload: () => {
            console.log(`Ad loaded successfully for slot: ${slot}`)
            setAdLoaded(true)
          },
          onerror: (error: any) => {
            console.error(`Ad failed to load for slot: ${slot}`, error)
            setAdError(true)
            // Remove from loaded slots if there was an error
            loadedSlots.delete(slot)
            hasAttemptedLoad.current = false
          }
        })
      } catch (err) {
        console.error('Error loading Google Ad:', err)
        setAdError(true)
        // Remove from loaded slots if there was an error
        loadedSlots.delete(slot)
        hasAttemptedLoad.current = false
      }
    }

    // Initial load attempt
    retryTimeoutRef.current = setTimeout(loadAd, 1000)

    // Cleanup function
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [slot])

  if (adError) {
    console.log(`Ad error state for slot: ${slot}`)
    return null
  }

  const containerStyle = {
    minHeight: format === 'vertical' ? '600px' : '90px',
    minWidth: format === 'vertical' ? '300px' : '728px',
    position: 'relative' as const,
    display: 'block',
    ...style
  }

  return (
    <div 
      ref={adRef}
      className={`google-ad-container ${className || ''}`} 
      style={containerStyle}
    >
      {!adLoaded && !adError && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          Loading ad...
        </div>
      )}
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          minHeight: format === 'vertical' ? '600px' : '90px',
          minWidth: format === 'vertical' ? '300px' : '728px'
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