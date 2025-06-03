'use client'

import GoogleAd from './google-ads'

export default function SidebarAd() {
  return (
    <div className="hidden lg:block w-[300px] sticky top-4">
      <GoogleAd
        slot="3155299840"
        format="vertical"
        className="w-[300px] h-[600px]"
      />
    </div>
  )
} 