"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import config from "@/config/config";
import SoundsInfo from "./SoundsInfo";

// Define Types for strict safety
interface TopItem {
  id: string;
  rank: number;
  title: string;
  poster: string;
  type?: string;
  episodes: any;
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

  return (
    <section className="w-full">
      {/* Header & Tab Buttons */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="heading text-xl font-bold uppercase italic">Top 10</h1>

        <div className="flex bg-[#1a1a1a] p-1 rounded-md">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-1.5 rounded-sm text-xs md:text-sm font-bold uppercase transition-all ${
                selectedTab === tab
                  ? "bg-[var(--primary)] text-black"
                  : "text-gray-400 hover:text-[var(--primary)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* List Container */}
      <div className="bg-[#1a1a1a] px-3 sm:px-5 py-4 rounded-md">
        {data[selectedTab]?.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 sm:gap-5 mb-5 last:mb-0 group"
          >
            {/* Rank Number */}
            <span
              className={`text-xl sm:text-3xl font-black italic min-w-[40px] ${
                item.rank <= 3
                  ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                  : "text-gray-500"
              }`}
            >
              {item.rank < 10 ? `0${item.rank}` : item.rank}
            </span>

            {/* Poster Thumbnail */}
            <Link
              href={`${config.siteRoutes.detail}${item.id}`}
              className="relative w-14 sm:w-16 aspect-[10/14] flex-shrink-0 overflow-hidden rounded-md"
            >
              <Image
                src={item.poster}
                alt={item.title}
                fill
                sizes="64px"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Link href={`${config.siteRoutes.detail}${item.id}`}>
                <h2 className="text-sm sm:text-base font-bold text-white hover:text-[var(--primary)] truncate transition-colors mb-1">
                  {item.title}
                </h2>
              </Link>

              <div className="flex items-center gap-1">
                <SoundsInfo episodes={item.episodes} />
                {item.type && (
                  <>
                    <span className="block mx-1 size-1 bg-gray-600 rounded-full" />
                    <span className="text-xs text-gray-400 uppercase">
                      {item.type}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
