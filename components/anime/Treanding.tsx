"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { register } from "swiper/element/bundle";

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

  useEffect(() => {
    // 1. Register Swiper Web Components
    register();

    // 2. Swiper Parameters (matches your Nuxt logic)
    const params = {
      loop: true,
      breakpoints: {
        0: { slidesPerView: 3 },
        800: { slidesPerView: 4 },
        1320: { slidesPerView: 6 },
      },
    };

    // 3. Initialize
    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();
    }
  }, []);

  return (
    <div id="trending" className="mt-5">
      <h1 className="text-2xl font-bold mb-4">Trending</h1>

      <swiper-container
        ref={swiperRef}
        init="false"
        class="flex justify-center items-center px-8"
      >
        {trending.map((item) => (
          <swiper-slide key={item.id} class="text-center">
            <div className="flex flex-col px-1 group">
              {/* Poster Container with Aspect Ratio 2:3 */}
              <Link
                href={`${config.siteRoutes.detail}${item.id}`}
                className="w-full h-0 pb-[150%] bg-gray-800 relative overflow-hidden block"
              >
                <Image
                  fill
                  src={item.poster}
                  alt={item.title}
                  sizes="(max-width: 800px) 33vw, (max-width: 1320px) 25vw, 16vw"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Rank Badge */}
                <div className="absolute top-0 left-0 bg-white text-black py-1 px-2 text-sm md:text-base font-bold min-w-[35px] text-center">
                  <span>{item.rank < 10 ? `0${item.rank}` : item.rank}</span>
                </div>
              </Link>

              {/* Title */}
              <h2
                title={item.title}
                className="text-sm text-center truncate w-full mt-2 cursor-pointer hover:text-primary transition-colors"
              >
                {item.title}
              </h2>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
}
