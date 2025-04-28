'use client'

export default function EventForm() {
  return (
    <>
      {/* Event Name */}
      <div>
        <label className="block text-sm md:text-base mb-1">Event Name</label>
        <input
          type="text"
          name="eventName"
          placeholder="Ex. Coldplay Concert"
          className="w-full border rounded-md px-3 py-2 text-sm md:text-base"
        />
      </div>

      {/* Date & Time */}
      <div>
        <label className="block text-sm md:text-base mb-1">Date &amp; Time</label>
        <input
          type="datetime-local"
          name="eventDateTime"
          className="w-full border rounded-md px-3 py-2 text-sm md:text-base"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm md:text-base mb-1">Location</label>
        <input
          type="text"
          name="location"
          placeholder="Venue or City"
          className="w-full border rounded-md px-3 py-2 text-sm md:text-base"
        />
      </div>
    </>
  )
}
