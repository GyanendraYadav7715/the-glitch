"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import config from "@/config/config";
import SoundsInfo from "./SoundsInfo";

// 1. Defined strict interface for episodes to match SoundsInfo
interface EpisodeData {
  sub: number;
  dub?: number;
}

interface TopItem {
  id: string;
  rank: number;
  title: string;
  poster: string;
  type?: string;
  episodes: EpisodeData; // Changed from any
}

interface TopTenProps {
  data: {
    today: TopItem[];
    week: TopItem[];
    month: TopItem[];
  };
}

const TABS = ["today", "week", "month"] as const;
type TabType = (typeof TABS)[number];

export default function TopTen({ data }: TopTenProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>("today");

  // Fallback to empty array if data for a tab is missing
  const currentItems = data[selectedTab] || [];

  return (
    <section className="w-full font-poppins mt-6">
      {/* Header & Tab Buttons */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold uppercase  text-[#FFB6D9]">Top 10</h2>

        <div className="flex bg-[#2b2a3c] p-1 rounded-lg border border-white/5">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              aria-label={`Show top 10 for ${tab}`}
              className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-all duration-200 ${
                selectedTab === tab
                  ? "bg-[#FFB6D9] text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* List Container */}
      <div className="bg-[#2b2a3c] px-4 py-2 rounded-xl border border-white/5">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0 group"
            >
              {/* Rank Number */}
              <span
                className={`text-2xl sm:text-3xl font-black  min-w-[45px] transition-colors ${
                  item.rank <= 3
                    ? "text-white"
                    : "text-gray-600 group-hover:text-gray-400"
                }`}
              >
                {item.rank < 10 ? `0${item.rank}` : item.rank}
              </span>

              {/* Poster Thumbnail */}
              <Link
                href={`${config.siteRoutes.detail}${item.id}`}
                className="relative w-14 sm:w-16 aspect-[3/4] flex-shrink-0 overflow-hidden rounded-lg bg-[#222]"
              >
                <Image
                  src={item.poster}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 56px, 64px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>

              {/* Info Area */}
              <div className="flex-1 min-w-0">
                <Link href={`${config.siteRoutes.detail}${item.id}`}>
                  <h3 className="text-sm sm:text-base font-bold text-slate-100 hover:text-[#FFB6D9] truncate transition-colors mb-1.5">
                    {item.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-2">
                  <SoundsInfo episodes={item.episodes} />
                  {item.type && (
                    <div className="flex items-center gap-2">
                      <span className="size-1 bg-gray-600 rounded-full" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        {item.type}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-500 text-sm">
            No data available for this period.
          </div>
        )}
      </div>
    </section>
  );
}
