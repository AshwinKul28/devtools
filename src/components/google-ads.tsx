'use client'

import { useEffect } from 'react'

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

export default function GoogleAd({ slot, format = 'auto', style, className }: GoogleAdProps) {
  useEffect(() => {
    try {
      // Push the ad to the adsbygoogle queue only once
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('Error loading Google Ad:', err)
    }
  }, []) // Empty dependency array ensures this only runs once

  return (
    <div className={`google-ad-container ${className || ''}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style,
        }}
        data-ad-client="your-adsense-client-id" // Replace with your AdSense client ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
} 