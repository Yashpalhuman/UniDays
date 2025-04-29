
import '@/css/pagination.module.css';
import { RA_DATA } from '@/constants/index';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ITEMS_PER_PAGE = 9;

type Ride = {
  id: number;
  src: string;
  destination: string;
  date: string;
  size: number;
  reqpep?: number;
  description: string;
};

const fetchPaginatedData = async (page: number) => {
  const totalPages = Math.ceil(RA_DATA.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const rides = RA_DATA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return { rides, currentPage: page, totalPages };
};

const ServerPaginatedData = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const pageParam = searchParams.page;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const { rides, totalPages } = await fetchPaginatedData(currentPage);

  return (
    <div className="max-container padding-container mt-16 pb-4">
      <h1 className='font-bold text-2xl lg:text-3xl text-gray-700 mb-12'>Upcoming Plans</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
        {rides.map((trip) => (
          
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
  {/* Image */}
  <Image
    src={trip.src}
    alt={trip.destination}
    width={300}
    height={200}
    className="
      w-full h-[19rem] object-cover rounded-t-[20px]
      transition-transform duration-300 ease-out
      group-hover:scale-105
      cursor-pointer
    "
  />

  {/* Content */}
  <div className="p-5 flex flex-col gap-3 embla3__trip__content">
    {/* Destination Title */}
    <h3 className="text-2xl font-serif font-bold tracking-tight text-gray-900">
      {trip.destination}
    </h3>

    {/* Date */}
    <p className="text-lg">
      <span className="font-medium text-gray-700">Date:</span>{" "}
      <span className="italic text-black font-semibold opacity-65">{trip.date}</span>
    </p>

    {/* Description (optional) */}
    {trip.description && (
      <p className="text-md text-gray-700 mt-0">
        <span className="font-semibold">{trip.description}</span>
      </p>
    )}

    {/* Group Size + Required People */}
    <p className="flex flex-wrap gap-x-4 gap-y-1 text-[0.85rem] text-gray-600">
      <span><span className="font-medium text-gray-700">Group size:</span> {trip.size}</span>
      {trip.reqpep !== undefined && (
        <>
          <span className="hidden sm:inline">•</span>
          <span><span className="font-medium text-gray-700">Required:</span> {trip.reqpep}</span>
        </>
      )}
    </p>

    {/* CTA Button */}
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
        <Link href={`/rides?page=${Math.max(currentPage - 1, 1)}`} passHref>
        <button className="text-2xl flexCenter border-2 border-[#f4b2b0] rounded-full h-[3.5rem] w-[3.5rem] transition-transform duration-300 ease cursor-pointer hover:scale-110 hover:border-3 hover:border-[#b3404a] hover:bg-[#f4b2b0] disabled:opacity-50" disabled={currentPage === 1}>
        &lt;
          </button>
        </Link>
        <span className="px-4 py-2 font-serif text-xl">{currentPage} / {totalPages}</span>
        <Link href={`/rides?page=${Math.min(currentPage + 1, totalPages)}`} passHref>
          <button className="text-2xl flexCenter border-2 border-[#f4b2b0] rounded-full h-[3.5rem] w-[3.5rem] transition-transform duration-300 ease cursor-pointer hover:scale-110 hover:border-3 hover:border-[#b3404a] hover:bg-[#f4b2b0]" disabled={currentPage === totalPages}>
          &gt;
          </button>
        </Link>
      </div>
      
    </div>
  );
};

export default ServerPaginatedData;
