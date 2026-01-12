"use client";

import { useState } from "react";
import Link from "next/link";

// HiAnime specific color cycle to match the screenshot
const GENRE_COLORS = [
  "#d0e6a5", // Greenish
  "#ffbade", // Pinkish
  "#fc887b", // Reddish
  "#ccabda", // Purplish
  "#abccd8", // Sky Blue
  "#d8b2ab", // Peach
  "#86e3ce", // Teal
];

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
  "Isekai",
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
];

interface GenreProps {
  onCloseSidebar?: () => void;
}

export default function Genre({ onCloseSidebar }: GenreProps) {
  const [showAll, setShowAll] = useState(false);

  // Screenshot ke hisaab se initially 24 genres (8 rows of 3) dikh rahe hain
  const visibleGenres = showAll ? genres : genres.slice(0, 24);

  return (
    <div className="w-full font-poppins mt-16">
      {/* Pink Header matching your image */}
      <h2 className="text-2xl font-bold text-[#ff8eb2] mb-4">Genres</h2>

      {/* Main Container */}
      <div className="bg-[#2b2a3c] p-6 rounded-lg">
        {/* 3-Column Grid for Desktop, 2 for Mobile */}
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 list-none p-0 mb-6">
          {visibleGenres.map((genre, index) => {
            const color = GENRE_COLORS[index % GENRE_COLORS.length];

            return (
              <li key={genre} className="flex justify-start">
                <Link
                  href={`/genre/${genre.toLowerCase()}`}
                  onClick={onCloseSidebar}
                  className="text-[13px] md:text-[15px] font-medium transition-all hover:brightness-125 truncate"
                  style={{ color: color }}
                  title={genre}
                >
                  {genre}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 'Show more' styled as a button spanning the bottom */}
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-3 bg-[#2a2e42] hover:bg-[#353a52] text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {showAll ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
}
