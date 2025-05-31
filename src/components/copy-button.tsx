'use client'

import { useState } from 'react'

interface CopyButtonProps {
  text: string
  className?: string
  children?: React.ReactNode
}

export default function CopyButton({ text, className = '', children }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={`${className} min-w-[60px] transition-colors`}
    >
      {copied ? 'Copied!' : children || 'Copy'}
    </button>
  )
} 