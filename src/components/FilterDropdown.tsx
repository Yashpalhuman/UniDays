"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type FilterDropdownProps = {
  currentPage: number;
  sortBy: string;
  order: string;
  query:string;
  filters: string[];
};

const FilterDropdown = ({ currentPage, sortBy, order, filters, query }: FilterDropdownProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(filters);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedFilters(filters);
  }, [filters]);

  const handleFilterChange = (filter: string) => {
    let newFilters = [...selectedFilters];
    if (newFilters.includes(filter)) {
      newFilters = newFilters.filter((f) => f !== filter);
    } else {
      newFilters.push(filter);
    }
    setSelectedFilters(newFilters);
    router.push(`/plans?query=${query}&page=${currentPage}&sortBy=${sortBy}&order=${order}&filters=${newFilters.join(",")}`);
    
  };
  
  const baseClasses = "p-[6px] text-gray-700 transition-transform duration-300 ease rounded-full hover:bg-[#f4b2b0] hover:scale-110";
  const conditionalClasses = isOpen ? "bg-[#f4b2b0] scale-110" : "";

  return (
    <div ref={dropdownRef} className="relative">
      <button className={`${baseClasses} ${conditionalClasses}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="w-7 h-7 lg:w-10 lg:h-10">
          <Image
            src='/filter_icon.svg'
            alt="filter"
            layout="responsive"
            width={35}
            height={35}
          />
        </div>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg border-2 border-[#b3404a] bg-white ring-1 ring-[#f4b2b0] ring-opacity-5 z-30">
          <div className="" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button onClick={() => handleFilterChange('events')} className={`block rounded-t-xl w-full text-left px-4 py-2.5 text-sm ${selectedFilters.includes('events') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
                <div className="flex justify-between"><Image src="/events_icon.svg" alt='events' width={17} height={17}/>Concerts & Events</div></button>
            <button onClick={() => handleFilterChange('trips')} className={`block w-full text-left px-4 py-2.5 text-sm ${selectedFilters.includes('trips') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
            <div className="flex justify-between"><Image src="/tours_icon.svg" alt='events' width={17} height={17}/>Tourists</div>
            </button>
            <button onClick={() => handleFilterChange('roadies')} className={`block w-full text-left px-4 py-2.5 text-sm ${selectedFilters.includes('roadies') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
            <div className="flex justify-between"><Image src="/roadies_icon.svg" alt='events' width={17} height={17}/>Roadies</div>
            </button>
            <button onClick={() => handleFilterChange('treks')} className={`block w-full text-left px-4 py-2.5 text-sm ${selectedFilters.includes('treks') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
            <div className="flex justify-between"><Image src="/trek_icon.svg" alt='events' width={17} height={17}/>Treks</div>
            </button>
            <div className="bg-[#b3404a] h-[1px] w-full"></div>
            <button onClick={() => handleFilterChange('non-smokers')} className={`block w-full text-left px-4 py-2.5 text-sm ${selectedFilters.includes('non-smokers') ? 'bg-green-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
            <div className="flex justify-between"><Image src="/no-smoke_icon.svg" alt='events' width={17} height={17}/>Non-Smokers</div>
            </button>
            <button onClick={() => handleFilterChange('sobers')} className={`block w-full text-left px-4 py-2.5 text-sm ${selectedFilters.includes('sobers') ? 'bg-green-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
            <div className="flex justify-between"><Image src="/no-alcohol_icon (2).svg" alt='events' width={17} height={17}/>No-Alcohol</div>
            </button>
            <button onClick={() => handleFilterChange('gg')} className={`block w-full text-left px-4 py-2.5 text-sm ${selectedFilters.includes('gg') ? 'bg-green-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
            <div className="flex justify-between"><Image src="/girls_icon (2).svg" alt='events' width={17} height={17}/>Girls Gang</div>
            </button>
            <button onClick={() => handleFilterChange('bb')} className={`block rounded-b-xl w-full text-left px-4 py-3 text-sm ${selectedFilters.includes('') ? 'bg-green-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
            <div className="flex justify-between"><Image src="/boys_icon.svg" alt='events' width={17} height={17}/>Just cow"Boys"</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
