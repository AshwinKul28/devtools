'use client'

import GoogleAd from './google-ads'

export default function ContentAd() {
  return (
    <div className="my-8 flex justify-center">
      <GoogleAd
        slot="6460135945"
        format="horizontal"
        className="w-[728px] h-[90px]"
      />
    </div>
  )
} 