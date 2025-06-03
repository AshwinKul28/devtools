import GoogleAd from './google-ads'

export default function HeaderAd() {
  return (
    <div className="w-full flex justify-center py-4 bg-[#1a1b1e]">
      <GoogleAd
        slot="5477985519"
        format="horizontal"
        className="w-[728px] h-[90px]"
      />
    </div>
  )
} 