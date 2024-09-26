"use client"; // Mark this as a client component

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image'

type SortDropdownProps = {
  currentPage: number;
  sortBy: string;
  order: string;
  query:string;
  filters: string[];
};

const SortDropdown = ({ currentPage, sortBy, order, filters, query }: SortDropdownProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside of the dropdown to close it
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

  const handleSortChange = (value: string) => {
    const [newSortBy, newOrder] = value.split("-");
    router.push(`/plans?query=${query}&page=${currentPage}&sortBy=${newSortBy}&order=${newOrder}&filters=${filters.join(',')}`);
    setIsOpen(false); // Close dropdown after selection
  };

  const baseClasses = "p-[6px] text-gray-700 transition-transform duration-300 ease rounded-full hover:bg-[#f4b2b0] hover:scale-110";
  const conditionalClasses = isOpen ? "bg-[#f4b2b0] scale-110" : "";

  return (
    <div ref={dropdownRef} className="relative">
      <button className={`${baseClasses} ${conditionalClasses}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="w-7 h-7 lg:w-10 lg:h-10">
          <Image
            src='/sort_icon.svg'
            alt="sort"
            layout="responsive"
            width={35}
            height={35}
          />
        </div>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg border-2 border-[#b3404a] bg-white ring-1 ring-black ring-opacity-5 z-30">
          <div className="" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button className={`block w-full text-left px-4 py-2.5 rounded-t-xl text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${sortBy === 'date' && order === 'asc' ? 'bg-gray-100' : ''}`} onClick={() => handleSortChange('date-asc')}>
              Date (Asc. &darr;)
            </button>
            <button className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${sortBy === 'date' && order === 'desc' ? 'bg-gray-100' : ''}`} onClick={() => handleSortChange('date-desc')}>
              Date (Des. &uarr;)
            </button>
            <button className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${sortBy === 'duration' && order === 'asc' ? 'bg-gray-100' : ''}`} onClick={() => handleSortChange('duration-asc')}>
              Duration (Asc. &darr;)
            </button>
            <button className={`block w-full text-left px-4 py-2.5 rounded-b-xl text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${sortBy === 'duration' && order === 'desc' ? 'bg-gray-100' : ''}`} onClick={() => handleSortChange('duration-desc')}>
              Duration (Des. &uarr;)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
