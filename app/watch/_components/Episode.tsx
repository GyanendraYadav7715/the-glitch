import React, { memo } from "react";
import Link from "next/link";

// Define the shape of the Episode object
export interface EpisodeData {
  id: string;
  episodeNumber: number;
  title: string;
  isFiller: boolean;
  [key: string]: any;
}

interface EpisodeProps {
  episode: EpisodeData;
  currentEp: EpisodeData | null; // Allow null if no episode is playing
  layout: "row" | "column"; // Strict typing helps autocomplete
}

const Episode: React.FC<EpisodeProps> = ({ episode, currentEp, layout }) => {
  // Logic: Check if this is the currently playing episode
  // Optional chaining in case currentEp is null
  const isCurrent = currentEp?.id === episode.id;

  // Logic: Format the URL
  const episodeLink = `/watch/${episode.id.replaceAll("::", "?")}`;

  // Helper for background color logic
  const getBgClass = () => {
    if (isCurrent) return "bg-primary text-black"; // Combined text color here for simplicity
    if (episode.isFiller) return "bg-red-500 text-white";
    return "bg-btnbg text-white hover:bg-opacity-80"; // Added hover state
  };

  const baseClasses = getBgClass();

  // --- Layout: ROW View ---
  if (layout === "row") {
    return (
      <li
        title={episode.title}
        className={`w-full px-2 py-3 transition-colors rounded-sm mb-1 ${baseClasses}`}
      >
        <Link href={episodeLink} className="block w-full">
          <div className="flex gap-3 items-center">
            {/* Episode Number - CHANGED to span (button illegal inside a tag) */}
            <span
              className={`text-sm font-bold min-w-[24px] ${
                isCurrent ? "text-black" : "text-primary"
              }`}
            >
              {episode.episodeNumber}
            </span>

            {/* Episode Title */}
            <div className="flex-1 text-sm truncate">{episode.title}</div>

            {/* Filler Indicator */}
            {episode.isFiller && (
              <span title="Filler Episode" role="img" aria-label="Filler">
                👻
              </span>
            )}
          </div>
        </Link>
      </li>
    );
  }

  // --- Layout: COLUMN/GRID View ---
  return (
    <li
      title={episode.title}
      className={`w-full rounded-sm py-2 transition-colors ${baseClasses}`}
    >
      <Link
        href={episodeLink}
        className="block w-full h-full flex items-center justify-center"
      >
        <span className="text-sm md:text-base font-medium">
          {episode.episodeNumber}
        </span>
      </Link>
    </li>
  );
};

// Optimization: Only re-render if props change
// This is crucial for large lists of episodes
export default memo(Episode, (prevProps, nextProps) => {
  // Custom comparison logic (optional, but often faster)
  return (
    prevProps.episode.id === nextProps.episode.id &&
    prevProps.layout === nextProps.layout &&
    // Only re-render if the 'current' status of THIS specific episode changes
    (prevProps.currentEp?.id === prevProps.episode.id) ===
      (nextProps.currentEp?.id === nextProps.episode.id)
  );
});
