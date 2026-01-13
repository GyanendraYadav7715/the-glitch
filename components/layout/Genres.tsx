"use client";

import React from "react";
import Link from "next/link";
import config from "@/config/config";
import { genres } from "@/config/meta";

interface GenresProps extends React.HTMLAttributes<HTMLLIElement> {
  onToggleSidebar?: () => void;
}

const COLORS = [
  "#d0e6a5",
  "#ffbade",
  "#fc887b",
  "#ccabda",
  "#abccd8",
  "#d8b2ab",
  "#86e3ce",
];

const Genres: React.FC<GenresProps> = ({ onToggleSidebar, ...attrs }) => {
  return (
    <ul className="flex flex-wrap">
      {genres.map((genre, index) => (
        <li
          key={genre}
          title={genre}
          {...attrs}
          style={{
            color: COLORS[index % COLORS.length],
            ...attrs.style,
          }}
        >
          <Link
            href={`${config.siteRoutes.genre}${genre}`}
            onClick={onToggleSidebar}
          >
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Genres;
