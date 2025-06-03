'use client'

import GoogleAd from './google-ads'

export default function SidebarAd() {
  return (
    <div className="w-full flex justify-center py-4">
      <GoogleAd
        slot="3155299840"
        format="vertical"
        className="w-[300px] h-[600px]"
      />
    </div>
  )
} 