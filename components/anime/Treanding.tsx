"use client";

import React, { useEffect, useRef, useMemo, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { register } from "swiper/element/bundle";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Types
interface TrendingItem {
  id: string;
  rank: number;
  title: string;
  poster: string;
}

interface TrendingProps {
  trending: TrendingItem[];
}

// 1. Sub-component for individual cards to prevent re-rendering the whole slider
const TrendingCard = memo(({ item }: { item: TrendingItem }) => {
  const detailUrl = `/detailed/${item.id}`; // Hardcoded for example, use config in production

  return (
    <div className="flex h-[280px] group cursor-pointer overflow-hidden select-none">
      {/* LEFT SIDE: Rank & Vertical Title */}
      <div className="flex flex-col justify-end items-center w-12 mr-2 shrink-0 relative pb-2">
        <div className="absolute top-4 bottom-14 flex items-center justify-center">
          <h2
            className="text-gray-400 text-sm font-semibold whitespace-nowrap -rotate-90 origin-center uppercase tracking-wider group-hover:text-[#FFB6D9] transition-colors duration-300"
            style={{ width: "220px" }} // Fixed width for the rotated container to prevent layout shift
          >
            {item.title}
          </h2>
        </div>
        <span className="text-[#FFB6D9] font-black text-2xl italic leading-none z-10">
          {item.rank < 10 ? `0${item.rank}` : item.rank}
        </span>
      </div>

      {/* RIGHT SIDE: Poster Image */}
      <Link
        href={detailUrl}
        className="relative flex-1 h-full rounded-md overflow-hidden shadow-lg border border-transparent group-hover:border-[#FFB6D9]/50 transition-all duration-500"
      >
        <Image
          fill
          src={item.poster}
          alt={item.title}
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </Link>
    </div>
  );
});

TrendingCard.displayName = "TrendingCard";

export default function TrendingSlider({ trending }: TrendingProps) {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    // Register Swiper only once
    register();

    const params = {
      slidesPerView: 2,
      spaceBetween: 15,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      },
      breakpoints: {
        640: { slidesPerView: 3, spaceBetween: 15 },
        1024: { slidesPerView: 4, spaceBetween: 20 },
        1280: { slidesPerView: 5, spaceBetween: 20 },
        1536: { slidesPerView: 6, spaceBetween: 25 },
      },
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();
    }
  }, []);

  // Memoize the mapping to avoid re-calculation if props haven't changed
  const slides = useMemo(
    () =>
      trending.map((item) => (
        <swiper-slide key={item.id}>
          <TrendingCard item={item} />
        </swiper-slide>
      )),
    [trending]
  );

  return (
    <section
      id="trending"
      className="mt-12 px-4 sm:px-8 relative max-w-[1800px] mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#FFB6D9] rounded-full" />
          <h1 className="text-3xl font-black text-white tracking-tighter">
            Trending
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex gap-1 bg-black/20 p-1.5 rounded-xl border border-white/5 backdrop-blur-sm">
          <button className="custom-prev w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-[#FFB6D9] hover:text-black transition-all active:scale-95">
            <ChevronLeft size={22} />
          </button>
          <button className="custom-next w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-[#FFB6D9] hover:text-black transition-all active:scale-95">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      <swiper-container
        ref={swiperRef}
        init="false"
        class="w-full visible-swiper"
      >
        {slides}
      </swiper-container>

      <style jsx global>{`
        .visible-swiper {
          overflow: visible !important; /* Allows hover scales to not get clipped */
        }
      `}</style>
    </section>
  );
}
