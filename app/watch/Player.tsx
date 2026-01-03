"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

// Define the shape of the Episode object
interface Episode {
  episodeNumber: number;
  isFiller?: boolean;
  [key: string]: any;
}

// Define the Component Props
interface PlayerProps {
  id: string;
  episodeId: string;
  currentEp: Episode;
  changeEpisode: (action: "next" | "prev") => void;
  hasNextEp: boolean;
  hasPrevEp: boolean;
}

const Player: React.FC<PlayerProps> = ({
  episodeId,
  currentEp,
  changeEpisode,
  hasNextEp,
  hasPrevEp,
}) => {
  // State
  const [category, setCategory] = useState<"sub" | "dub">("sub");
  const [server, setServer] = useState<"vidWish" | "megaPlay">("vidWish");

  // Helper to change category safely
  const handleCategoryChange = (newType: "sub" | "dub") => {
    if (newType !== category) setCategory(newType);
  };

  // Helper to change server safely
  const handleServerChange = (newServer: "vidWish" | "megaPlay") => {
    if (newServer !== server) setServer(newServer);
  };

  // Computed Logic for Iframe Source
  const cleanEpisodeId = episodeId.split("ep=").pop() || "";
  const serverDomain = server === "vidWish" ? "vidwish.live" : "megaplay.buzz";
  const iframeSrc = `https://${serverDomain}/stream/s-2/${cleanEpisodeId}/${category}`;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 1. Video Container 
          - Used 'w-full' to fill the grid column.
          - Kept 'aspect-video' (16:9 ratio) to maintain height automatically.
          - Added border/shadow to match the site theme.
      */}
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative border border-gray-800 shadow-lg group">
        <iframe
          src={iframeSrc}
          className="w-full h-full"
          allowFullScreen
          title="Video Player"
          style={{ border: "none" }}
        />
      </div>

      {/* 2. Controls Container 
          - Removed 'md:px-20' (too wide for a middle column).
          - Used 'bg-[#1c1c22]' to match the dark theme.
      */}
      <div className="flex flex-col xl:flex-row items-center justify-between px-4 py-3 gap-4 bg-[#1c1c22] rounded-lg border border-gray-800">
        {/* Left Side: Server & Category */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* Server Selection */}
          <div className="flex gap-2 bg-[#0f0f0f] p-1 rounded">
            <button
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                server === "vidWish"
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-900/20"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => handleServerChange("vidWish")}
            >
              VidWish
            </button>
            <button
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                server === "megaPlay"
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-900/20"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => handleServerChange("megaPlay")}
            >
              MegaPlay
            </button>
          </div>

          {/* Audio Category (Sub/Dub) */}
          <div className="flex gap-2 bg-[#0f0f0f] p-1 rounded">
            {(["sub", "dub"] as const).map((type) => (
              <button
                key={type}
                className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all ${
                  category === type
                    ? "bg-gray-700 text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
                onClick={() => handleCategoryChange(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Navigation & Info */}
        <div className="flex items-center gap-4 w-full xl:w-auto justify-between xl:justify-end">
          {/* Episode Info Text */}
          <div className="flex flex-col text-right hidden sm:block">
            <p className="text-gray-400 text-xs">
              Episode{" "}
              <span className="text-white font-bold">
                {currentEp.episodeNumber}
              </span>
            </p>
            {currentEp.isFiller && (
              <p className="text-[10px] text-orange-400 flex items-center gap-1 justify-end">
                Filler <Icon icon="mdi:ghost" />
              </p>
            )}
          </div>

          {/* Nav Buttons */}
          <div className="flex gap-2">
            <button
              disabled={!hasPrevEp}
              className={`w-10 h-10 flex items-center justify-center rounded bg-[#2d2b44] text-white border border-gray-700 transition-all ${
                hasPrevEp
                  ? "hover:bg-pink-600 hover:border-pink-500"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => changeEpisode("prev")}
            >
              <Icon icon="fa-solid:backward" width="14" />
            </button>

            <button
              disabled={!hasNextEp}
              className={`w-10 h-10 flex items-center justify-center rounded bg-[#2d2b44] text-white border border-gray-700 transition-all ${
                hasNextEp
                  ? "hover:bg-pink-600 hover:border-pink-500"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => changeEpisode("next")}
            >
              <Icon icon="fa-solid:forward" width="14" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
