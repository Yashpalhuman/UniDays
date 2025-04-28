'use client'

export default function CabForm() {
  return (
    <>
      {/* From & To */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm md:text-base mb-1">From</label>
          <input
            type="text"
            name="fromCity"
            placeholder="City A"
            className="w-full border rounded-md px-3 py-2 text-sm md:text-base"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm md:text-base mb-1">To</label>
          <input
            type="text"
            name="toCity"
            placeholder="City B"
            className="w-full border rounded-md px-3 py-2 text-sm md:text-base"
          />
        </div>
      </div>

      {/* Departure Date & Time */}
      <div>
        <label className="block text-sm md:text-base mb-1">Departure</label>
        <input
          type="datetime-local"
          name="departureDateTime"
          className="w-full border rounded-md px-3 py-2 text-sm md:text-base"
        />
      </div>

      {/* Seats Available */}
      <div>
        <label className="block text-sm md:text-base mb-1">Seats Available</label>
        <input
          type="number"
          name="seatsAvailable"
          defaultValue={1}
          min={1}
          className="w-full border rounded-md px-3 py-2 text-sm md:text-base"
        />
      </div>
    </>
  )
}
