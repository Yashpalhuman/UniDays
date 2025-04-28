'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AboutUsPage() {
  return (
    <div className="w-full min-h-screen max-container padding-container bg-white flex flex-col items-center">
      {/* Hero / background */}
      <div className="relative w-full">
        <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
          <Image
            src="/about-us-img-3.svg"
            alt="Tropical beach background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Promotion + Collage */}
      <section className="w-full mt-16 px-4 md:px-8 flex flex-col md:flex-row gap-8 mb-16">
        {/* Left */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-500 font-bold uppercase text-sm md:text-base">
              Promotion
            </span>
          </div>
          <h2 className="font-bold text-lg md:text-2xl lg:text-3xl mb-4">
            Discover new destinations and new friends all at one place.
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-lg">
            At <span className="font-semibold">UniDays</span>, we believe that
            the best destinations are shared. Whether you’re planning your
            vacation or looking for travel companions to join your journey,
            our app is designed to make every trip memorable.
          </p>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
            <Image
              src="/about-us-img-1.svg"
              alt="Beach path"
              fill
              className="rounded-md shadow-md object-cover transform -rotate-6"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full px-4 md:px-8 mb-16 flex flex-col md:flex-row gap-8 items-start">
        {/* Text */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Why Choose Us?</h2>
          <ul className="space-y-3 text-gray-600 text-sm md:text-base">
            <li>
              <strong>Effortless Planning:</strong> Choose destinations and
              organize trips with ease.
            </li>
            <li>
              <strong>Connect &amp; Share:</strong> Join a community of
              adventurers and make new friends.
            </li>
            <li>
              <strong>Hidden Gems:</strong> Discover unique experiences from
              fellow travelers.
            </li>
            <li>
              <strong>Safe &amp; Secure:</strong> Interact confidently in a
              trusted environment.
            </li>
          </ul>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
            <Image
              src="/about-us-img-2.svg"
              alt="Overlayed shots"
              fill
              className="rounded-md shadow-md object-cover transform rotate-3"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
