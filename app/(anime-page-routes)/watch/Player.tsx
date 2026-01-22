"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
  Expand,
  Lightbulb,
  Play,
  SkipForward,
  ChevronRight,
  ChevronLeft,
  Edit,
  MessageSquare,
  Mic,
  Rocket,
  X,
} from "lucide-react";

// Types
interface Episode {
  title: string;
  episodeNumber: number;
  isFiller?: boolean;
  [key: string]: any;
}

interface PlayerProps {
  id: string;
  episodeId: string;
  currentEp: Episode;
  changeEpisode: (action: "next" | "prev") => void;
  hasNextEp: boolean;
  hasPrevEp: boolean;
}

/* --- MAIN PLAYER COMPONENT --- */
const Player: React.FC<PlayerProps> = ({
  episodeId,
  currentEp,
  changeEpisode,
  hasNextEp,
  hasPrevEp,
}) => {
  // 1. Core State for Video Logic
  const [category, setCategory] = useState<"sub" | "dub">("sub");
  const [activeServer, setActiveServer] = useState<string>("HD-1");

  // 2. Computed Logic for Iframe Source
  const cleanEpisodeId = episodeId.split("ep=").pop() || "";

  // Mapping server names to actual domains/logic
  const getServerDomain = () => {
    switch (activeServer) {
      case "HD-1":
        return "vidwish.live";
      case "HD-2":
        return "megaplay.buzz";
      case "HD-3":
        return "streamtape.com"; // Example placeholder
      default:
        return "vidwish.live";
    }
  };

  const iframeSrc = `https://${getServerDomain()}/stream/s-2/${cleanEpisodeId}/${category}`;

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto overflow-hidden rounded-lg bg-[#0f0f13] shadow-2xl">
      {/* Video Container */}
      <div className="w-full aspect-video bg-black relative border-b border-gray-800">
        <iframe
          src={iframeSrc}
          sandbox="allow-forms allow-scripts allow-same-origin"
          className="w-full h-full"
          allowFullScreen
          title="Video Player"
          style={{ border: "none" }}
        />
      </div>

      {/* Integrated Controls */}
      <VideoControls
        currentEp={currentEp}
        activeServer={activeServer}
        setActiveServer={setActiveServer}
        category={category}
        setCategory={setCategory}
        onNext={() => hasNextEp && changeEpisode("next")}
        onPrev={() => hasPrevEp && changeEpisode("prev")}
        hasPrev={hasPrevEp}
        hasNext={hasNextEp}
      />
    </div>
  );
};

/* --- SUB-COMPONENT: VIDEO CONTROLS --- */
interface ControlProps {
  currentEp: Episode;
  activeServer: string;
  setActiveServer: (s: string) => void;
  category: "sub" | "dub";
  setCategory: (c: "sub" | "dub") => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const VideoControls: React.FC<ControlProps> = ({
  currentEp,
  activeServer,
  setActiveServer,
  category,
  setCategory,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
}) => {
  // Local UI Settings Toggles
  const [settings, setSettings] = useState({
    light: true,
    autoPlay: true,
    autoNext: true,
    autoSkip: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const serverOptions = ["HD-1", "HD-2", "HD-3"];

  return (
    <div className="w-full p-4 select-none animate-in fade-in duration-500">
      {/* 1. Top Utility Row */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4 text-xs font-medium text-gray-400">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* <button className="flex items-center gap-1 hover:text-white transition-all active:scale-95">
            <Expand size={14} /> Expand
          </button> */}

          <button
            onClick={() => toggleSetting("light")}
            className="flex items-center gap-1 hover:text-white transition-all"
          >
            <Lightbulb
              size={14}
              className={settings.light ? "text-yellow-400" : ""}
            />
            Light{" "}
            <span className="text-pink-400 font-bold">
              {settings.light ? "On" : "Off"}
            </span>
          </button>

          <button
            onClick={() => toggleSetting("autoPlay")}
            className="flex items-center gap-1 hover:text-white transition-all"
          >
            <Play
              size={14}
              fill={settings.autoPlay ? "currentColor" : "none"}
            />
            Auto Play{" "}
            <span className="text-pink-400 font-bold">
              {settings.autoPlay ? "On" : "Off"}
            </span>
          </button>

          <button
            onClick={() => toggleSetting("autoNext")}
            className="flex items-center gap-1 hover:text-white transition-all"
          >
            <SkipForward
              size={14}
              fill={settings.autoNext ? "currentColor" : "none"}
            />
            Auto Next{" "}
            <span className="text-pink-400 font-bold">
              {settings.autoNext ? "On" : "Off"}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={!hasPrev}
            onClick={onPrev}
            className={`p-1 rounded transition-all ${!hasPrev ? "opacity-20" : "hover:bg-gray-800 text-white active:scale-90"}`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            disabled={!hasNext}
            onClick={onNext}
            className={`p-1 rounded transition-all ${!hasNext ? "opacity-20" : "hover:bg-gray-800 text-white active:scale-90"}`}
          >
            <ChevronRight size={24} />
          </button>
          <Edit size={18} className="cursor-pointer hover:text-pink-400 ml-2" />
        </div>
      </div>

      {/* 2. Main Interaction Area */}
      <div className="flex flex-col md:flex-row bg-[#1a1a22] rounded-md overflow-hidden mb-4 border border-gray-800/50 shadow-inner">
        {/* Left Status Box */}
        <div className="bg-pink-300 text-black p-6 md:w-[30%] flex flex-col items-center justify-center text-center">
          <p className="text-[10px] uppercase tracking-widest font-black opacity-60">
            You are watching
          </p>
          <h2 className="text-2xl font-black my-1  tracking-tight">
            EPISODE {currentEp.episodeNumber}
          </h2>
          {currentEp.isFiller && (
            <span className="text-[10px] bg-black/10 px-2 py-0.5 rounded font-bold mb-2">
              FILLER
            </span>
          )}
          <p className="text-[10px] leading-tight font-semibold opacity-80 max-w-[150px]">
            {currentEp.title}
          </p>
        </div>

        {/* Right Server List */}
        <div className="flex-1 p-5 flex flex-col justify-center gap-5">
          {/* SUB Row */}
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 w-14 text-[10px] font-black tracking-tighter ${category === "sub" ? "text-pink-400" : "text-gray-500"}`}
            >
              <MessageSquare size={14} /> SUB:
            </div>
            <div className="flex flex-wrap gap-2">
              {serverOptions.map((name) => (
                <button
                  key={`sub-${name}`}
                  onClick={() => {
                    setActiveServer(name);
                    setCategory("sub");
                  }}
                  className={`px-5 py-1.5 rounded text-xs font-bold transition-all duration-200 ${
                    activeServer === name && category === "sub"
                      ? "bg-pink-300 text-black shadow-[0_0_15px_rgba(249,168,212,0.3)] scale-105"
                      : "bg-[#2a2a35] text-gray-400 hover:bg-[#353545] hover:text-gray-200"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* DUB Row */}
          <div className="flex items-center gap-4 border-t border-gray-800/50 pt-5">
            <div
              className={`flex items-center gap-2 w-14 text-[10px] font-black tracking-tighter ${category === "dub" ? "text-pink-400" : "text-gray-500"}`}
            >
              <Mic size={14} /> DUB:
            </div>
            <div className="flex flex-wrap gap-2">
              {serverOptions.map((name) => (
                <button
                  key={`dub-${name}`}
                  onClick={() => {
                    setActiveServer(name);
                    setCategory("dub");
                  }}
                  className={`px-5 py-1.5 rounded text-xs font-bold transition-all duration-200 ${
                    activeServer === name && category === "dub"
                      ? "bg-pink-300 text-black shadow-[0_0_15px_rgba(249,168,212,0.3)] scale-105"
                      : "bg-[#2a2a35] text-gray-400 hover:bg-[#353545] hover:text-gray-200"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Notification Banner */}
      <div className="bg-[#0073b1] text-white px-4 py-3 rounded-md flex items-center justify-between border border-blue-400/20 group md:hidden">
        <div className="flex items-center gap-3 text-xs sm:text-sm font-bold">
          <Rocket
            size={18}
            fill="white"
            className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          />
          <span className="tracking-tight">
            Estimated the next episode will come at 4/5/2026, 9:15:00 PM
          </span>
        </div>
        <button className="hover:bg-white/10 p-1 rounded transition-colors">
          <X size={18} className="opacity-70" />
        </button>
      </div>
    </div>
  );
};

export default Player;
