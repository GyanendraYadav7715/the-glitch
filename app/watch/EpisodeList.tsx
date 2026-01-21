"use client";
import React, { useState } from "react";

// 1. Define the type based on your JSON data
interface Episode {
  title: string;
  alternativeTitle: string;
  id: string;
  isFiller: boolean;
  episodeNumber: number;
}

// 2. Pass your data in here (or import it from a JSON file)
interface EpisodeListProps {
  episodes: Episode[];
  activeId: string; // New Prop
  onSelect: (id: string) => void; // New Prop
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  activeId,
  onSelect,
}) => {
  // State to track the currently playing episode (Default to the first one)
  const [currentEpId, setCurrentEpId] = useState<string>(episodes[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic for the search bar
  const filteredEpisodes = episodes.filter(
    (ep) =>
      ep.episodeNumber.toString().includes(searchQuery) ||
      ep.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="lg:col-span-3 flex flex-col h-full bg-[#1c1c22] rounded-lg overflow-hidden border border-gray-800">
      {/* Header / Search */}
      <div className="h-22 bg-[#0d0d15] px-3 border-b border-gray-800 ">
        <div className="text-white text-xs font-bold  tracking-wider py-3">
          List of episodes:
        </div>
        <div className="flex ">
          <div></div>
          <input
            type="text"
            placeholder="Search Number..."
            className="flex-1 bg-[#15151a] text-gray-300 text-xs p-2 rounded border border-gray-700 focus:outline-none focus:border-[#FFB6D9] transition-colors"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-[#1c1c22] scrollbar-thumb-gray-600 p-2 bg-[#191826]">
        {filteredEpisodes.map((ep, index) => {
          const isActive = activeId === ep.id;

          return (
            <button
              key={ep.id}
              onClick={() => onSelect(ep.id)}
              className={`w-full text-left flex items-center px-4 py-3 mb-2 border-b border-gray-800/50 transition-all duration-200 group
                ${
                  isActive
                    ? "bg-[#2d2b44] border-l-4 border-l-[#FFB6D9]"
                    : "bg-[#2d2b44]/10 hover:bg-[#2d2b44] border-l-4 border-l-transparent transition"
                }
                ${index % 2 !== 0 && !isActive ? "bg-[#1f1f26]" : ""} 
              `}
            >
              {/* Episode Number */}
              <div
                className={`mr-4 text-sm font-mono ${
                  isActive
                    ? "text-[#FFB6D9] font-bold"
                    : "text-gray-500 group-hover:text-gray-300"
                }`}
              >
                {ep.episodeNumber}
              </div>

              {/* Title & Filler Badge */}
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className={`truncate text-sm ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    {ep.title}
                  </span>

                  {/* Filler Badge Logic */}
                  {ep.isFiller && (
                    <span className="flex-shrink-0 px-1.5 py-0.5 rounded-xl text-[10px] bg-orange-900/40 text-orange-400 border border-orange-500/30">
                      Filler
                    </span>
                  )}
                </div>

                {/* Optional: Alternative Title shown on hover or active */}
                <span className="text-[10px] text-gray-600 truncate group-hover:text-gray-500">
                  {ep.alternativeTitle}
                </span>
              </div>

              {/* Active Play Icon */}
              {isActive && (
                <div className="ml-2 text-[#FFB6D9] animate-pulse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}

        {/* Empty State if search fails */}
        {filteredEpisodes.length === 0 && (
          <div className="p-8 text-center text-gray-500 text-sm">
            No episodes found
          </div>
        )}
      </div>
    </section>
  );
};

export default EpisodeList;




 