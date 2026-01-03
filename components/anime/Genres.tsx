"use client";

import { useState } from "react";
import Link from "next/link";

// Define colors to match the specific HiAnime CSS cycle
const GENRE_COLORS = [
  "#d0e6a5", // 1
  "#ffbade", // 2
  "#fc887b", // 3
  "#ccabda", // 4
  "#abccd8", // 5
  "#d8b2ab", // 6
  "#86e3ce", // 7
];

// Sample data - replace with your actual import
const genres = [
  "Action",
  "Adventure",
  "Cars",
  "Comedy",
  "Dementia",
  "Demons",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Game",
  "Harem",
  "Historical",
  "Horror",
  "Josei",
  "Kids",
  "Magic",
  "Martial Arts",
  "Mecha",
  "Military",
  "Music",
  "Mystery",
  "Parody",
  "Police",
  "Psychological",
  "Romance",
  "Samurai",
  "School",
  "Sci-Fi",
  "Seinen",
  "Shoujo",
  "Shoujo Ai",
  "Shounen",
  "Shounen Ai",
  "Slice of Life",
  "Space",
  "Sports",
  "Super Power",
  "Supernatural",
  "Thriller",
  "Vampire",
  "Yaoi",
  "Yuri",
];

export default function Genre({ onCloseSidebar }) {
  const [showAll, setShowAll] = useState(false);

  // Show only first 12 items initially, or all if toggled
  const visibleGenres = showAll ? genres : genres.slice(0, 18);

  return (
    <div className="w-full">
      {/* Section Header */}
      {/* <div className="font-bold text-white mb-2 px-4 md:px-0">Genre</div> */}

      {/* Grid Container */}
      <ul className="grid grid-cols-2 gap-x-2 gap-y-2 list-none p-0 px-4 md:px-0">
        {visibleGenres.map((genre, index) => {
          // Cycle through the colors array
          const color = GENRE_COLORS[index % GENRE_COLORS.length];

          return (
            <li key={genre} className="block">
              <Link
                href={`/genre/${genre.toLowerCase()}`}
                onClick={onCloseSidebar}
                className="block text-xs font-medium py-1.5 px-3 border-l-[3px] transition-colors truncate hover:opacity-80"
                style={{
                  color: color,
                  borderColor: color,
                  backgroundColor: "rgba(255,255,255,0.02)", // Subtle background for better visibility
                }}
                title={genre}
              >
                {genre}
              </Link>
            </li>
          );
        })}

        {/* 'More' / 'Less' Button */}
        <li className="block">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full text-left text-xs font-medium py-1.5 px-3 text-white border-l-[3px] border-transparent hover:text-[#ffbade] transition-colors flex items-center"
          >
            <i
              className={`fas fa-${showAll ? "minus" : "plus"} mr-2 text-xs`}
            ></i>
            {showAll ? "Less" : "More"}
          </button>
        </li>
      </ul>
    </div>
  );
}
