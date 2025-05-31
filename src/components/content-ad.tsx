'use client'

import GoogleAd from './google-ads'

export default function ContentAd() {
  return (
    <div className="my-8 flex justify-center">
      <GoogleAd
        slot="content-ad-slot"
        format="horizontal"
        className="w-[728px] h-[90px]"
      />
    </div>
  )
} 