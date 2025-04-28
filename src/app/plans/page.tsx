import { UP_DATA } from "@/constants/index";
import Image from "next/image";
import Link from "next/link";
import SortDropdown from "@/components/SortDropdown";
import FilterDropdown from '@/components/FilterDropdown';


const ITEMS_PER_PAGE = 9;

export type Trip = {
  id: number;
  src: string;
  destination: string;
  date: string;        // ISO-8601 preferred ("2025-05-12")
  duration: number;  
  size: number;
  reqpep: number;
  categories: string[];   
};

interface Props {
  trips: Trip[];
}

const fetchPaginatedData = async (page: number, sortBy: string, order: string, filters: string[], query: string) => {
  let filteredData = UP_DATA;

  const lowerCaseQuery = query.toLowerCase();
  // First, get destinations that start with the query
  const startsWithQuery = filteredData.filter((trip) =>
    trip.destination.toLowerCase().startsWith(lowerCaseQuery)
  );
  // Then, get destinations that include the query but do not start with it
  const includesQuery = filteredData.filter((trip) =>
    !trip.destination.toLowerCase().startsWith(lowerCaseQuery) &&
    trip.destination.toLowerCase().includes(lowerCaseQuery)
  );
  // Combine the two lists, with the startsWithQuery results first
  filteredData = [...startsWithQuery, ...includesQuery];


  if (filters.length > 0) {
    filteredData = filteredData.filter((trip) =>
      filters.every((filter) => trip.categories.includes(filter))
    );
  }

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  let sortedData = [...filteredData];
  if (sortBy === "date") {
    sortedData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  } else if (sortBy === "duration") {
    sortedData.sort((a, b) => (order === "asc" ? a.duration - b.duration : b.duration - a.duration));
  }
  const trips = sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  return { trips, currentPage: 1, totalPages };

  
};

const ServerPaginatedData = async ({ searchParams }: { searchParams: { page?: string; sortBy?: string; order?: string; filters?: string; query?: string;} }) => {
  const pageParam = searchParams.page;
  const sortBy = searchParams.sortBy || "date";
  const order = searchParams.order || "asc";
  const filters = searchParams.filters ? searchParams.filters.split(',') : [];
  const query = searchParams.query || "";
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const { trips, totalPages } = await fetchPaginatedData(currentPage, sortBy, order, filters, query);

  return (
    <div className="max-container padding-container mt-16 pb-4">
      
      <div className=" flex items-center justify-between mb-8">
      <h1 className="font-bold text-2xl lg:text-3xl text-gray-700">Upcoming Plans</h1>
        <div className="flexCenter gap-1 lg:gap-4">
        <FilterDropdown query={query} currentPage={1} sortBy={sortBy} order={order} filters={filters} />
        <SortDropdown query={query} currentPage={currentPage} sortBy={sortBy} order={order} filters={filters}/>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
        {trips.map((trip) => (
          <div
          key={trip.id}
          className="
            group relative flex flex-col rounded-3xl
            border-2 border-gray-800 bg-white/70 backdrop-blur-sm
            shadow-[inset_0_0_44px_6px_rgba(107,203,107,0.30)]
            hover:shadow-[inset_0_0_44px_6px_rgba(206,58,62,0.30)]
            hover:-translate-y-1.5
            transition-all duration-300 ease-out
          "
        >
          <Image
            src={trip.src}
            alt={trip.destination}
            width={300}
            height={200}
            className="
              w-full h-60 object-cover rounded-t-[22px]
              transition-transform duration-300 ease-out
              group-hover:scale-105
              cursor-pointer
            "
          />
        
          <div className="p-5 flex flex-col gap-3">
            {/* destination */}
            <h3 className="text-xl font-semibold font-serif tracking-tight text-gray-900">
              {trip.destination}
            </h3>
        
            {/* meta line (wraps on small screens) */}
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-[0.85rem] text-gray-600">
              <span><span className="font-medium text-gray-700">Date:</span> <time className="italic">{trip.date}</time></span>
              <span className="hidden sm:inline">•</span>
              <span><span className="font-medium text-gray-700">Days:</span> {trip.duration}</span>
              <span className="hidden sm:inline">•</span>
              <span><span className="font-medium text-gray-700">Size:</span> {trip.size}</span>
              <span className="hidden sm:inline">•</span>
              <span><span className="font-medium text-gray-700">Req:</span> {trip.reqpep}</span>
            </p>
        
            {/* CTA */}
            <a
              href="#"
              className="
                mt-auto inline-flex items-center gap-1 self-start text-[0.9rem] font-medium
                text-emerald-700 hover:text-emerald-800
              "
            >
              View details
              <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>
        ))}
      </div>
      <div className="flex justify-between mt-16 mx-8">
        <Link href={`/plans?query=${query}&page=${Math.max(currentPage - 1, 1)}&sortBy=${sortBy}&order=${order}&filters=${filters}`} passHref>
          <button className="text-2xl flexCenter border-2 border-[#f4b2b0] rounded-full h-[3.5rem] w-[3.5rem] transition-transform duration-300 ease cursor-pointer hover:scale-110 hover:border-3 hover:border-[#b3404a] hover:bg-[#f4b2b0]" disabled={currentPage === 1}>
            &lt;
          </button>
        </Link>
        <span className="px-4 py-2 font-serif text-xl">
          {currentPage} / {totalPages}
        </span>
        <Link href={`/plans?query=${query}&page=${Math.min(currentPage + 1, totalPages)}&sortBy=${sortBy}&order=${order}&filters=${filters}`} passHref>
          <button className="text-2xl flexCenter border-2 border-[#f4b2b0] rounded-full h-[3.5rem] w-[3.5rem] transition-transform duration-300 ease cursor-pointer hover:scale-110 hover:border-3 hover:border-[#b3404a] hover:bg-[#f4b2b0]" disabled={currentPage === totalPages}>
            &gt;
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServerPaginatedData;
