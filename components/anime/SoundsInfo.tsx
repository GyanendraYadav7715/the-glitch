import React from "react";
import { Captions, Mic } from "lucide-react";

interface Episodes {
  rating?: string;
  sub?: number | string;
  dub?: number | string;
  eps?: number | string;
}

interface SoundsInfoProps {
  episodes: Episodes;
}

export default function SoundsInfo({ episodes }: SoundsInfoProps) {
  // Helper to keep the JSX clean
  const badgeClass =
    "flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-bold text-black leading-none";

  return (
    <ul className="flex flex-wrap items-center overflow-hidden rounded-sm">
      {/* Rating Badge (e.g., 18+, TV-MA) */}
      {episodes.rating && (
        <li className={`${badgeClass} bg-white border-r border-black/10`}>
          {episodes.rating}
        </li>
      )}

      {/* Subbed Count */}
      {episodes.sub !== undefined && (
        <li className={`${badgeClass} bg-[#b0e3af]`}>
          <Captions size={12} strokeWidth={3} />
          <span>{episodes.sub}</span>
        </li>
      )}

      {/* Dubbed Count */}
      {episodes.dub !== undefined && (
        <li className={`${badgeClass} bg-[#b9e7ff]`}>
          <Mic size={12} fill="black" />
          <span>{episodes.dub}</span>
        </li>
      )}

      {/* Total Episodes (Pink Badge) */}
      {episodes.eps && (
        <li className={`${badgeClass} bg-[#4a4957] px-2`}>{episodes.eps}</li>
      )}
    </ul>
  );
}
