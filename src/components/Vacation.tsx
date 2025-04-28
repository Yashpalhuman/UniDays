'use client'

export default function VacationForm() {
  return (
    <>
      {/* Place & State */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          name="place"
          placeholder="Ex. Gangtok"
          className="flex-1 border rounded-md px-3 py-2 text-sm md:text-base"
        />
        <input
          type="text"
          name="state"
          placeholder="Ex. Sikkim"
          className="flex-1 border rounded-md px-3 py-2 text-sm md:text-base"
        />
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm md:text-base mb-1">From</label>
          <input
            type="date"
            name="dateFrom"
            className="w-full border rounded-md px-3 py-2 text-sm md:text-base"
          />
        </div>
        <div>
          <label className="block text-sm md:text-base mb-1">To</label>
          <input
            type="date"
            name="dateTo"
            className="w-full border rounded-md px-3 py-2 text-sm md:text-base"
          />
        </div>
      </div>

      {/* Picture upload */}
      <label className="block border-2 border-dashed border-orange-200 rounded-md p-6 text-center cursor-pointer text-sm md:text-base">
        <input type="file" name="image" accept="image/*" className="hidden" />
        <p>Upload a nice picture of the place!</p>
        <div className="mt-2 text-2xl text-orange-400">＋</div>
      </label>

      {/* Tentative Stops */}
      <div>
        <label className="block text-sm md:text-base mb-1">Tentative Stops</label>
        <textarea
          name="stops"
          placeholder="Let people know which attractions you plan to visit."
          className="w-full border rounded-md px-3 py-2 text-sm md:text-base"
          rows={3}
        />
      </div>
    </>
  )
}
