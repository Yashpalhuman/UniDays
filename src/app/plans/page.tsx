import { UP_DATA } from "@/constants/index";
import Image from "next/image";
import Link from "next/link";
import SortDropdown from "@/components/SortDropdown";
import FilterDropdown from '@/components/FilterDropdown';


const ITEMS_PER_PAGE = 6;

type Trip = {
  id: number;
  src: string;
  destination: string;
  date: string;
  size: number;
  reqpep: number;
  duration: number;
  category: string[];
};

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
          <div key={trip.id} className="p-4 rounded-3xl border-2 border-gray-800 shadow-[inset_0px_0px_56px_9px_rgba(107,_203,_107,_0.28)] hover:shadow-[inset_0px_0px_56px_9px_rgba(206,_58,_62,_0.28)] transition-transform duration-300 ease">
            <Image src={trip.src} alt={trip.destination} width={300} height={200} className="w-full h-[19rem] object-cover rounded-[30px] hover:scale-90 transition-transform duration-300 ease cursor-pointer" />
            <div className="text-2xl font-serif font-bold text-stroke mt-4">{trip.destination}</div>
            <p className="text-lg mt-2">
              Date : <span className="italic text-black font-semibold opacity-65">{trip.date}</span>
            </p>
            <p className="text-sm mt-0">
              Duration : <span className="font-semibold">{trip.duration} days</span>
            </p>
            <p className="text-md mt-2 font-mono text-black">Group size: {trip.size}</p>
            <p className="text-md font-mono text-black">Required people: {trip.reqpep}</p>
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
