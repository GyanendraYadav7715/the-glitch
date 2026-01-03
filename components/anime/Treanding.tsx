"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { register } from "swiper/element/bundle";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Ensure you have lucide-react or use standard SVGs

// Replace with your actual config import
const config = {
  siteRoutes: {
    detail: "/detailed/",
  },
};

interface TrendingItem {
  id: string;
  rank: number;
  title: string;
  poster: string;
}

interface TrendingProps {
  trending: TrendingItem[];
}

export default function TrendingSlider({ trending }: TrendingProps) {
  const swiperRef = useRef<any>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    register();

    const params = {
      loop: true,
      slidesPerView: 2, // Default mobile
      spaceBetween: 20,
      navigation: {
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      },
      breakpoints: {
        640: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 5, spaceBetween: 20 },
        1400: { slidesPerView: 6, spaceBetween: 25 },
      },
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();
    }
  }, []);

  return (
    <div id="trending" className="mt-8 px-6 relative">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-6">
        <h1 className="text-2xl font-bold text-[#FFB6D9]">Trending</h1>

        {/* Custom Navigation Buttons (Visual Match) */}
        <div className="hidden md:flex gap-2 bg-[#1a1a1a] p-2 rounded-lg border border-gray-800">
          <button className="custom-prev text-white  hover:text-[#FFB6D9] transition-colors p-1">
            <ChevronLeft size={24} />
          </button>
          <div className="w-[1px] h-6 bg-gray-700 mx-1"></div>
          <button className="custom-next text-white hover:text-[#FFB6D9] transition-colors p-1">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <swiper-container ref={swiperRef} init="false" class="w-full">
        {trending.map((item) => (
          <swiper-slide key={item.id}>
            <div className="flex flex-row h-[280px] group cursor-pointer overflow-hidden">
              {/* LEFT SIDE: Vertical Text & Rank */}
              <div className="flex flex-col justify-end items-center w-10 mr-3 shrink-0 relative">
                {/* Rotated Title */}
                {/* We rotate -90deg and position absolute to ensure it doesn't break layout width */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[200px] h-10 origin-bottom flex items-end justify-start -rotate-90">
                  <h2
                    title={item.title}
                    className="text-gray-200 text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis w-full text-left hover:text-[#FFB6D9] transition-colors"
                  >
                    {item.title}
                  </h2>
                </div>

                {/* Rank Number */}
                <span className="text-[#FFB6D9] font-bold text-xl leading-none z-10 relative mt-2">
                  {item.rank < 10 ? `0${item.rank}` : item.rank}
                </span>
              </div>

              {/* RIGHT SIDE: Poster Image */}
              <Link
                href={`${config.siteRoutes.detail}${item.id}`}
                className="relative w-full h-full block rounded-sm overflow-hidden"
              >
                <Image
                  fill
                  src={item.poster}
                  alt={item.title}
                  sizes="(max-width:300px) 33vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />

                {/* Optional: Dark gradient overlay on bottom of image for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
}
