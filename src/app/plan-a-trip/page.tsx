'use client'

import { useState } from 'react'
import VacationForm from '@/components/Vacation'
import EventForm from '@/components/Event'
import CabForm from '@/components/Cab'

export default function PlanTripPage() {
  const [tripType, setTripType] = useState<'vacation' | 'event' | 'cab'>('vacation')
  const [gender, setGender] = useState<'all' | 'women' | 'men'>('all')
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    await fetch('https://YOUR_BACKEND_URL/plan-trip', {
      method: 'POST',
      body: data,
    })
  }

  const tripOptions = [
    { value: 'vacation', label: 'Vacation' },
    { value: 'event', label: 'Event/Movie' },
    { value: 'cab', label: 'Cab Sharing' },
  ] as const

  const genderOptions = [
    { value: 'all',   label: 'All genders' },
    { value: 'women', label: 'Women only' },
    { value: 'men',   label: 'Men only' },
  ] as const

  const renderForm = () => {
    if (tripType === 'vacation') return <VacationForm />
    if (tripType === 'event') return <EventForm />
    if (tripType === 'cab') return <CabForm />
    return null
  }

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="w-full min-h-screen bg-white flex flex-col items-center p-4 max-container padding-container"
    >
     {/* Title */}
      <div className="w-full max-w-2xl text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-serif font-bold">Plan A Trip</h1>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Trip Type Toggle */}
        <div className="flex gap-2 justify-center">
          {tripOptions.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTripType(value)}
              className={`px-4 py-2 rounded-full text-sm md:text-base ${
                tripType === value ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
          <input type="hidden" name="tripType" value={tripType} />
        </div>

        {/* Render the selected form */}
        {renderForm()}

        {/* Who can join */}
        <div className="flex gap-2 justify-center">
          {genderOptions.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setGender(value)}
              className={`px-4 py-2 rounded-full text-sm md:text-base ${
                gender === value ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
          <input type="hidden" name="gender" value={gender} />
        </div>

        {/* Group sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm md:text-base mb-1">
              Your current group strength
            </label>
            <input
              type="number"
              name="currentGroup"
              defaultValue={0}
              className="w-full border rounded-md px-3 py-2 text-sm md:text-base"
            />
          </div>
          <div>
            <label className="block text-sm md:text-base mb-1">
              How many more people you want
            </label>
            <input
              type="number"
              name="morePeople"
              defaultValue={1}
              className="w-full border rounded-md px-3 py-2 text-sm md:text-base"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm md:text-base mb-1">
            Add description to find matching vibes!
          </label>
          <textarea
            name="description"
            placeholder="Let people interested in joining your group know what you plan to do and what are your ideas of fun!"
            className="w-full border rounded-md px-3 py-2 text-sm md:text-base"
            rows={4}
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 justify-center mt-6">
          <button
            type="button"
            name="saveDraft"
            value="true"
            className="px-6 py-2 border border-gray-300 rounded-md text-sm md:text-base"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="px-8 py-2 bg-orange-400 text-white rounded-md text-sm md:text-base"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
