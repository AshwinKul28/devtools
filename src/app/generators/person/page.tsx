'use client'

import { useState } from 'react'
import { faker } from '@faker-js/faker'
import NumberInput from '@/components/NumberInput'
import CopyButton from '@/components/copy-button'

type Locale = 'en' | 'hi' | 'zh_CN' | 'ja' | 'ko' | 'ar'

const locales: Locale[] = ['en', 'hi', 'zh_CN', 'ja', 'ko', 'ar']

export default function PersonGenerator() {
  const [count, setCount] = useState(1)
  const [output, setOutput] = useState('')

  const generatePerson = () => {
    // Randomly select a locale for this person
    const locale = locales[Math.floor(Math.random() * locales.length)]
    
    // Generate person data using Faker
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName })
    const phone = faker.phone.number()
    const address = faker.location.streetAddress()
    const city = faker.location.city()
    const state = faker.location.state()
    const zipCode = faker.location.zipCode()
    const country = faker.location.country()
    const fullAddress = `${address}, ${city}, ${state} ${zipCode}, ${country}`

    // Additional fields
    const age = faker.number.int({ min: 18, max: 80 })
    const gender = faker.person.gender()
    const jobTitle = faker.person.jobTitle()
    const company = faker.company.name()
    const website = faker.internet.url()
    const bio = faker.person.bio()

    return {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      address: fullAddress,
      age,
      gender,
      jobTitle,
      company,
      website,
      bio,
      locale
    }
  }

  const generateData = () => {
    const people = Array.from({ length: count }, generatePerson)
    setOutput(JSON.stringify(people, null, 2))
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          <span className="text-[#0ea5e9]">#</span> Person Data Generator
        </h1>
        
        <div className="glass-card p-6 mb-6">
          <div className="space-y-4">
            <NumberInput
              label="Number of Records"
              value={count}
              onChange={setCount}
              min={1}
              max={100}
            />
          </div>
        </div>

        <button
          onClick={generateData}
          className="gradient-btn mb-6"
        >
          Generate Data
        </button>

        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <label className="text-gray-300">Generated Data</label>
            <CopyButton
              text={output}
              className="gradient-btn px-4 py-2"
            />
          </div>
          <textarea
            value={output}
            readOnly
            className="glass-input w-full h-96 font-mono text-sm"
            placeholder="Generated person data will appear here..."
          />
        </div>
      </div>
    </div>
  )
} 