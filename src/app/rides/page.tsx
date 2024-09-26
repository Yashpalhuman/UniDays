
import '@/css/pagination.module.css';
import { RA_DATA } from '@/constants/index';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ITEMS_PER_PAGE = 6;

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
          
          <div key={trip.id} className=" p-4 rounded-3xl border-2 border-gray-800 shadow-[inset_0px_0px_56px_9px_rgba(107,_203,_107,_0.28)] hover:shadow-[inset_0px_0px_56px_9px_rgba(206,_58,_62,_0.28)] transition-transform duration-300 ease">
            <Image src={trip.src} alt={trip.destination} width={300} height={200} className="w-full h-[19rem] rounded-[30px] hover:scale-90 transition-transform duration-300 ease cursor-pointer" />
          <div className="embla3__trip__content ml-1 mt-1">
            <div className="text-2xl font-serif font-bold text-stroke">{trip.destination}</div>
            <p className="text-lg mt-2">Date :  <span className='italic text-black font-semibold opacity-65'>{trip.date}</span></p>
            <p className="text-md mt-0"><span className='font-semibold'>{trip.description}</span></p>
            <p className="text-md mt-2 font-mono text-black">Group size: {trip.size}</p>  
            {trip.reqpep && (<p className="text-md font-mono text-black">Required people: {trip.reqpep}</p>)}

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
