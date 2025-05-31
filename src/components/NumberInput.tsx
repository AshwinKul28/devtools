'use client'

import { ChangeEvent, useState } from 'react'

interface NumberInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  label?: string
  className?: string
}

export default function NumberInput({ value, onChange, min, max, label, className = '' }: NumberInputProps) {
  const [internal, setInternal] = useState<string>(value.toString())

  // Sync internal state if value changes from outside
  if (internal !== value.toString()) {
    setInternal(value.toString())
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // Only allow digits and optional minus sign
    if (/^-?\d*$/.test(val)) {
      setInternal(val)
      const num = Number(val)
      if (!isNaN(num)) {
        onChange(num)
      }
    }
  }

  const handleBlur = () => {
    let num = Number(internal)
    if (isNaN(num)) num = min ?? 0
    if (min !== undefined && num < min) num = min
    if (max !== undefined && num > max) num = max
    setInternal(num.toString())
    onChange(num)
  }

  return (
    <div>
      {label && <label className="block text-gray-300 mb-2">{label}</label>}
      <input
        type="text"
        inputMode="numeric"
        pattern="^-?\d*$"
        min={min}
        max={max}
        value={internal}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full p-2 bg-[#1a1b1e] text-gray-300 rounded border border-gray-700 focus:border-[#0ea5e9] focus:outline-none ${className}`}
      />
    </div>
  )
} 