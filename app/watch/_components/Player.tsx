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
  id: string; // From previous context, usually needed
  episodeId: string; // The full string likely containing '?ep='
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
  // We extract the ID part after 'ep=' similar to your Vue logic
  const cleanEpisodeId = episodeId.split("ep=").pop() || "";
  const serverDomain = server === "vidWish" ? "vidwish.live" : "megaplay.buzz";

  const iframeSrc = `https://${serverDomain}/stream/s-2/${cleanEpisodeId}/${category}`;

  return (
    <div className="flex flex-col gap-2">
      {/* Video Container */}
      <div className="w-full bg-background aspect-video relative rounded-sm max-w-7xl overflow-hidden">
        <iframe
          src={iframeSrc}
          className="w-full h-full"
          allowFullScreen
          title="Video Player"
        />
      </div>

      {/* Controls Container */}
      <div className="category flex flex-wrap flex-col sm:flex-row items-center justify-center sm:justify-between px-2 md:px-20 gap-3 bg-lightbg py-2 rounded-md">
        {/* Server Selection */}
        <div className="servers flex gap-4">
          <button
            className={`px-2 py-1 rounded text-sm font-semibold transition-colors ${
              server === "vidWish"
                ? "bg-primary text-black"
                : "bg-btnbg text-white"
            }`}
            onClick={() => handleServerChange("vidWish")}
          >
            vidwish
          </button>
          <button
            className={`px-2 py-1 rounded text-sm font-semibold transition-colors ${
              server === "megaPlay"
                ? "bg-primary text-black"
                : "bg-btnbg text-white"
            }`}
            onClick={() => handleServerChange("megaPlay")}
          >
            megaplay
          </button>
        </div>

        <div className="flex gap-5 items-center">
          {/* Audio Category (Sub/Dub) */}
          <div className="sound flex gap-3">
            {(["sub", "dub"] as const).map((type) => (
              <button
                key={type}
                className={`px-2 py-1 rounded text-sm font-semibold transition-colors ${
                  category === type
                    ? "bg-primary text-black"
                    : "bg-btnbg text-white"
                }`}
                onClick={() => handleCategoryChange(type)}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="btns flex gap-4">
            {hasPrevEp && (
              <button
                title="prev"
                className="prev bg-primary px-2 py-1 rounded-md text-black hover:opacity-80 transition-opacity"
                onClick={() => changeEpisode("prev")}
              >
                <Icon icon="fa-solid:fast-backward" />
              </button>
            )}
            {hasNextEp && (
              <button
                title="next"
                className="next bg-primary px-2 py-1 rounded-md text-black hover:opacity-80 transition-opacity"
                onClick={() => changeEpisode("next")}
              >
                <Icon icon="fa-solid:fast-forward" />
              </button>
            )}
          </div>
        </div>

        {/* Episode Info */}
        <div className="flex flex-col text-center sm:text-right">
          <p className="text-gray-400 text-sm">
            you are watching Episode {currentEp.episodeNumber}
          </p>
          {currentEp.isFiller && (
            <p className="text-red-400 text-sm animate-pulse">
              you are watching filler Episode 👻
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
