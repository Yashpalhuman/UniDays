"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UP_DATA } from "@/constants/index";

type Trip = {
    id: number;
    src: string;
    destination: string;
    date: string;
    size: number;
    reqpep: number;
    duration: number;
    categories: string[];
  };
  
const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Trip[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (query) {
        const lowerCaseQuery = query.toLowerCase();
        // First, get destinations that start with the query
        let filteredData = UP_DATA;
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
      setSuggestions(filteredData.slice(0, 3) as Trip[]); // Get top 3 matches
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = () => {
    if (query) {
      router.push(`/plans?query=${query}`);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search plans..."
        className="border-2 border-gray-600 w-[200px] rounded-xl p-2 px-4 shadow-md outline-none sm:w-[280px]"
      />
      <button onClick={handleSearch} className="ml-2 p-2 shadow-md border-2 text-white rounded-xl bg-[#f2a7a4] hover:bg-[#b3404a]">Search</button>
      {suggestions.length > 0 && (
        <div className="absolute bg-white border rounded w-full mt-1">
          {suggestions.map((suggestion) => (
            <Link key={suggestion.id} href={`/plans?query=${suggestion.destination}`}>
              <li className="block p-2 hover:bg-gray-200 text-gray-900">{suggestion.destination}</li>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
