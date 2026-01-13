"use client";

import React, { useEffect, useRef, useMemo, memo, useState } from "react"; // Added useState
import Image from "next/image";
import Link from "next/link";
import { register } from "swiper/element/bundle";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ... (TrendingItem and TrendingProps interfaces remain the same)

const TrendingCard = memo(({ item }: { item: TrendingItem }) => {
  const detailUrl = `/detailed/${item.id}`;

  return (
    <div className="flex h-[280px] group cursor-pointer overflow-hidden select-none">
      <div className="flex flex-col justify-end items-center w-12 mr-2 shrink-0 relative pb-2">
        <div className="absolute top-4 bottom-14 flex items-center justify-center">
          <h2
            className="text-gray-400 text-sm font-semibold whitespace-nowrap -rotate-90 origin-center uppercase tracking-wider group-hover:text-[#FFB6D9] transition-colors duration-300"
            style={{ width: "220px" }}
          >
            {item.title}
          </h2>
        </div>
        <span className="text-[#FFB6D9] font-black text-2xl  leading-none z-10">
          {item.rank < 10 ? `0${item.rank}` : item.rank}
        </span>
      </div>

      <Link
        href={detailUrl}
        className="relative flex-1 h-full rounded-md overflow-hidden shadow-lg border border-transparent group-hover:border-[#FFB6D9]/50 transition-all duration-500"
      >
        <Image
          fill
          src={item.poster}
          alt={item.title}
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          sizes="(max-width: 768px) 50vw, 20vw"
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
  const [mounted, setMounted] = useState(false); // Track mounting status

  useEffect(() => {
    setMounted(true); // Set mounted to true on client-side
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

    // Use a small timeout to ensure the element is in the DOM
    const initSwiper = () => {
      if (swiperRef.current) {
        Object.assign(swiperRef.current, params);
        swiperRef.current.initialize();
      }
    };

    // If already mounted, init immediately, else wait a tick
    const timer = setTimeout(initSwiper, 0);
    return () => clearTimeout(timer);
  }, [mounted]); // Re-run when mounted becomes true

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
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#FFB6D9] rounded-full" />
          <h1 className="text-3xl font-black text-white tracking-tighter">
            Trending
          </h1>
        </div>

        <div className="flex gap-1 bg-black/20 p-1.5 rounded-xl border border-white/5 backdrop-blur-sm">
          <button className="custom-prev w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-[#FFB6D9] hover:text-black transition-all active:scale-95">
            <ChevronLeft size={22} />
          </button>
          <button className="custom-next w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-[#FFB6D9] hover:text-black transition-all active:scale-95">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* CRITICAL FIX: 
        Only render the swiper-container if mounted. 
        This prevents the SSR/Client mismatch.
      */}
      {mounted ? (
        <swiper-container
          ref={swiperRef as any}
          init="false"
          className="w-full visible-swiper"
        >
          {slides}
        </swiper-container>
      ) : (
        /* Placeholder to prevent layout shift */
        <div className="w-full h-[280px] bg-white/5 animate-pulse rounded-md" />
      )}

      <style jsx global>{`
        .visible-swiper {
          overflow: visible !important;
        }
      `}</style>
    </section>
  );
}
