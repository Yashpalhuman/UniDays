// app/plan/[id]/page.tsx

import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PLANS } from '@/constants/index'
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from 'react-icons/fa'

interface PlanPageProps {
  params: { id: string }
}

export default function PlanDetailPage({ params }: PlanPageProps) {
  const plan = PLANS.find((p) => p.id === parseInt(params.id, 10))
  if (!plan) return notFound()

  return (
    // outer wrapper to hold the background image

    <div className="relative w-full flex justify-center py-8 ">
      {/* Decorative background SVG, absolute */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/background-plans.svg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
    <div className="relative w-full mx-auto p-4 bg-white rounded-xl shadow-md space-y-6 max-w-full sm:max-w-md md:max-w-2xl lg:max-w-3xl max-container ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-sm uppercase text-gray-500">{plan.type}</span>
        <h1 className="text-2xl font-bold">{plan.destination}</h1>
      </div>

      {/* Main image */}
      <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
        <Image
          src={plan.src}
          alt={plan.destination}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Meta info */}
      <div className="text-gray-700 space-y-3 md:space-y-0 md:flex md:space-x-6">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-orange-400" />
          <span>{plan.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-orange-400" />
          <span>
            {plan.dateFrom} – {plan.dateTo}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaUserFriends className="text-orange-400" />
          <span>{plan.size} People</span>
        </div>
      </div>

      {/* Men/Women/Others tags */}
      <div className="flex gap-2 flex-wrap">
        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
          {plan.men} Men
        </span>
        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
          {plan.women} Women
        </span>
        {plan.others != null && (
          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
            {plan.others} Others
          </span>
        )}
      </div>

      {/* Content: Stops and Description side by side on larger screens */}
      <div className="space-y-4 md:space-y-0 md:flex md:space-x-8">
        {/* Tentative Stops */}
        <div className="md:w-1/2">
          <h2 className="font-semibold mb-2">Tentative Stops:</h2>
          <ol className="list-decimal list-inside space-y-1 mb-1">
            {plan.stops.map((stop, i) => (
              <li key={i}>{stop}</li>
            ))}
          </ol>
          <button className="text-sm text-gray-500">more...</button>
        </div>
        {/* Description */}
        <div className="md:w-1/2">
          <p className="text-gray-600">{plan.description}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
          <button className="flex-1 bg-orange-400 text-white py-2 rounded-md">
            Request to join the plan
          </button>
          <button className="w-12 h-12 border rounded-full flex items-center justify-center">
            {/* bookmark icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5v14l7-7 7 7V5H5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
