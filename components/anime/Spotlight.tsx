"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { register } from "swiper/element/bundle";
import { Play, Clock, Calendar, ChevronRight } from "lucide-react";


// Mock config - replace with your actual config import
const config = {
  siteRoutes: {
    watch: "/watch/",
    detail: "/detailed/",
  },
};

interface SpotlightItem {
  id: string;
  rank: number;
  title: string;
  poster: string;
  type: string;
  duration: string;
  aired: string;
  quality: string;
  episodes: any;
  synopsis: string;
}

interface SpotlightProps {
  spotlight: SpotlightItem[];
}

export default function SpotlightSlider({ spotlight }: SpotlightProps) {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Swiper Web Component
    register();

    const params = {
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
      },
      pagination: {
        clickable: true,
      },
      injectStyles: [`.swiper-pagination-bullet { background: white; }`],
    };

    // Assign parameters to the swiper element
    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();
    }
  }, []);

  return (
    <section className="relative w-full">
      <swiper-container ref={swiperRef} init="false">
        {spotlight.map((item) => (
          <swiper-slide
            suppressHydrationWarning={true}
            key={item.id}
            className="relative overflow-hidden bg-[#201f31] h-[40vh] md:h-[50vh] xl:h-[calc(100vh-142px)]"
          >
            {/* Image Layer */}
            <div className="opacity-layer absolute left-0 md:left-[15%] xl:left-[30%] top-0 right-0 bottom-0 overflow-hidden">
              <Image
                fill
                src={item.poster}
                alt={item.title}
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 70vw"
              />
            </div>

            {/* Content Layer */}
            <div className="z-10 ml-2 md:ml-12 min-w-32 md:max-w-2xl absolute top-30 gap-5">
              <h2 className="mb-2 text-[#ffbade] font-medium text-xl p-3 text-left">
                #{item.rank} Spotlight
              </h2>

              <h1 className="title text-lg md:text-2xl xl:text-5xl font-bold mb-6 text-[#ffffff] max-w-lg ">
                {item.title}
              </h1>

              <ul className="text-base text-white mb-3 gap-5 hidden md:flex items-center">
                <li className="flex items-center gap-1">
                  <Play size={16} fill="currentColor" />
                  <span>{item.type}</span>
                </li>
                <li className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{item.duration}</span>
                </li>
                <li className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{item.aired}</span>
                </li>
                <div className="flex">
                  <li className="bg-[#ffbade] text-black text-sm font-bold px-2 rounded-lg">
                    {item.quality}
                  </li>
                  <li className="bg-[#ffbade] text-black text-sm font-bold px-2 rounded-lg">
                    {item.quality}
                  </li>
                </div>
              </ul>

              <p className="synopsis text-gray-300">{item.synopsis}</p>

              <div className="relative z-50 text-sm md:text-base mt-5 flex gap-2">
                <Link href={`${config.siteRoutes.watch}${item.id}`}>
                  <button className="bg-[#ffbade] rounded-3xl px-6 py-2 text-black flex justify-center items-center gap-2 font-semibold transition cursor-pointer">
                    <Play size={18} fill="black" />
                    <span>Watch Now</span>
                  </button>
                </Link>

                <Link href={`${config.siteRoutes.detail}${item.id}`}>
                  <button className="bg-[#2b2a3c] text-white rounded-3xl px-6 py-2 flex justify-center items-center gap-2 transition hover:bg-gray-700 cursor-pointer">
                    <span>Detail</span>
                    <ChevronRight size={18} />
                  </button>
                </Link>
              </div>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>

      <style jsx>{`
        .opacity-layer {
          mask-image:
            linear-gradient(
              to right,
              transparent 0,
              black 30%,
              black 70%,
              transparent
            ),
            linear-gradient(
              to bottom,
              2 transparent 0,
              black 30%,
              black 70%,
              transparent
            );
          mask-composite: intersect;
          -webkit-mask-image:
            linear-gradient(
              to right,
              transparent 0,
              black 30%,
              black 70%,
              transparent
            ),
            linear-gradient(
              to bottom,
              transparent 0,
              black 30%,
              black 70%,
              transparent
            );
          -webkit-mask-composite: source-in;
        }
        .synopsis {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 1299px) {
          .synopsis {
            -webkit-line-clamp: 2;
            line-clamp: 2;
          }
        }
        @media (max-width: 768px) {
          .synopsis {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
