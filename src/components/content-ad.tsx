'use client'

import GoogleAd from './google-ads'

export default function ContentAd() {
  return (
    <div className="w-full border-y border-gray-800 my-8">
      <div className="container mx-auto px-4 py-6">
        <GoogleAd
          slot="6460135945"
          format="horizontal"
          className="w-[728px] h-[90px] mx-auto"
        />
      </div>
    </div>
  )
} 