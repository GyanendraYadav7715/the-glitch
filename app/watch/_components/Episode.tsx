import React from "react";
import Link from "next/link";

// Define the shape of the Episode object
interface EpisodeData {
  id: string;
  episodeNumber: number;
  title: string;
  isFiller: boolean;
  [key: string]: any;
}

interface EpisodeProps {
  episode: EpisodeData;
  currentEp: EpisodeData;
  layout: "row" | "column" | string;
}

const Episode: React.FC<EpisodeProps> = ({ episode, currentEp, layout }) => {
  // Logic: Check if this is the currently playing episode
  const isCurrent = episode.id === currentEp.id;

  // Logic: Format the URL
  // Note: Depending on your routing setup, ensure '::' to '?' conversion is handled on the destination page
  const episodeLink = `/watch/${episode.id.replaceAll("::", "?")}`;

  // Helper for background color logic
  // Priority: Current (Primary) > Filler (Red) > Default (BtnBg)
  const getBgClass = () => {
    if (isCurrent) return "bg-primary";
    if (episode.isFiller) return "bg-red-500";
    return "bg-btnbg";
  };

  const bgClass = getBgClass();

  // --- Layout: ROW View ---
  if (layout === "row") {
    return (
      <li
        title={episode.title}
        className={`w-full px-2 py-3 text-black transition-colors ${bgClass}`}
      >
        <Link href={episodeLink} className="block w-full">
          <div className="flex gap-3 items-center">
            {/* Episode Number */}
            <button
              className={`text-sm font-medium ${
                isCurrent ? "text-black" : "text-primary"
              }`}
            >
              {episode.episodeNumber}
            </button>

            {/* Episode Title */}
            {/* Changed from <li> to <div>/<span> because nesting <li> is invalid HTML */}
            <div
              className={`flex-1 text-sm truncate ${
                isCurrent ? "text-black" : "text-white"
              }`}
            >
              {episode.title}
            </div>

            {/* Filler Indicator */}
            {episode.isFiller && <span title="Filler">👻</span>}
          </div>
        </Link>
      </li>
    );
  }

  // --- Layout: COLUMN/GRID View ---
  return (
    <li
      title={episode.title}
      className={`w-full rounded-sm py-1 transition-colors ${bgClass}`}
    >
      <Link href={episodeLink} className="block w-full">
        <p
          className={`text-sm md:text-base text-center font-medium ${
            isCurrent ? "text-black" : "text-white"
          }`}
        >
          {episode.episodeNumber}
        </p>
      </Link>
    </li>
  );
};

export default Episode;

