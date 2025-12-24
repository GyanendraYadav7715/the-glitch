"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { register } from "swiper/element/bundle";

// Replace with your actual config import
const config = {
  siteRoutes: {
    detail: "/detail/",
  },
};
const trendings= [
    {
        "title": "One Piece",
        "alternativeTitle": "One Piece",
        "rank": 1,
        "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/bcd84731a3eda4f4a306250769675065.jpg",
        "id": "one-piece-100"
    },
    {
        "title": "My Hero Academia Final Season",
        "alternativeTitle": "Boku no Hero Academia: Final Season",
        "rank": 2,
        "poster": "https://cdn.myanimelist.net/images/anime/1959/151055l.jpg",
        "id": "my-hero-academia-final-season-19930"
    },
    {
        "title": "One-Punch Man Season 3",
        "alternativeTitle": "One Punch Man 3",
        "rank": 3,
        "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/269a2fc7ec4b9c0592493ef192ad2a9d.jpg",
        "id": "one-punch-man-season-3-19932"
    },
    {
        "title": "A Gatherer's Adventure in Isekai",
        "alternativeTitle": "Sozai Saishuka no Isekai Ryokouki",
        "rank": 4,
        "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c514b6042ba1d9092b292ea84be8ae23.jpg",
        "id": "a-gatherers-adventure-in-isekai-19901"
    },
    {
        "title": "My Status as an Assassin Obviously Exceeds the Hero's",
        "alternativeTitle": "Ansatsusha de Aru Ore no Status ga Yuusha yori mo Akiraka ni Tsuyoi no da ga",
        "rank": 5,
        "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/01673a7d3c4080cb4773e105a1aaa215.jpg",
        "id": "my-status-as-an-assassin-obviously-exceeds-the-heros-19922"
    },
    {
        "title": "My Gift Lvl 9999 Unlimited Gacha: Backstabbed in a Backwater Dungeon, I'm Out for Revenge!",
        "alternativeTitle": "Shinjiteita Nakama-tachi ni Dungeon Okuchi de Korosarekaketa ga Gift \"Mugen Gacha\" de Level 9999 no Nakama-tachi wo Te ni Irete Moto Party Member to Sekai ni Fukushuu & \"Zamaa!\" Shimasu!",
        "rank": 6,
        "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/d771473a4b74662f3a969a33d0e7951e.jpg",
        "id": "my-gift-lvl-9999-unlimited-gacha-backstabbed-in-a-backwater-dungeon-im-out-for-revenge-19908"
    },
    {
        "title": "A Wild Last Boss Appeared!",
        "alternativeTitle": "Yasei no Last Boss ga Arawareta!",
        "rank": 7,
        "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/6bbde70a6ecf5cfce152f122da1d9cb0.jpg",
        "id": "a-wild-last-boss-appeared-19909"
    },
    {
        "title": "Campfire Cooking in Another World with My Absurd Skill Season 2",
        "alternativeTitle": "Tondemo Skill de Isekai Hourou Meshi 2",
        "rank": 8,
        "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/0e05c4d1a105058516d1f96bc78a33d5.jpg",
        "id": "campfire-cooking-in-another-world-with-my-absurd-skill-season-2-19928"
    },
    {
        "title": "May I Ask for One Final Thing?",
        "alternativeTitle": "Saigo ni Hitotsu dake Onegai shitemo Yoroshii deshou ka",
        "rank": 9,
        "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/c47d9623085a6057088ccffdc6198492.jpg",
        "id": "may-i-ask-for-one-final-thing-19927"
    },
    {
        "title": "Dusk Beyond the End of the World",
        "alternativeTitle": "Towa no Yuugure",
        "rank": 10,
        "poster": "https://cdn.myanimelist.net/images/anime/1294/151734l.jpg",
        "id": "dusk-beyond-the-end-of-the-world-19905"
    }
];
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
        class="flex justify-center items-center"
      >
        {trendings.map((item) => (
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
