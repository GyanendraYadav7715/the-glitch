"use client";

import Link from "next/link";
import config from "@/config/config";
import { genres } from "@/config/meta";

// Define the colors array outside the component to prevent re-creation on renders
const GENRE_COLORS = [
  "#d0e6a5",
  "#ffbade",
  "#fc887b",
  "#ccabda",
  "#abccd8",
  "#d8b2ab",
  "#86e3ce",
];

interface GenreListProps {
  onCloseSidebar?: () => void; // Replacing Vue's emit
  className?: string; // Replacing v-bind="$attrs"
}

export default function GenreList({
  onCloseSidebar,
  className = "",
}: GenreListProps) {
  return (
    <ul className={`flex flex-wrap ${className}`}>
      {genres.map((genre, index) => (
        <li
          key={genre}
          title={genre}
          className="w-1/2 md:w-1/3 p-1" // Added layout logic for better grid display
          style={{ color: GENRE_COLORS[index % GENRE_COLORS.length] }}
        >
          <Link
            href={`${config.siteRoutes.genre}${genre}`}
            onClick={() => onCloseSidebar?.()} // Call the function if it exists
            className="block py-2 px-3 text-sm font-medium hover:bg-white/5 rounded-md transition-colors"
          >
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  );
}
