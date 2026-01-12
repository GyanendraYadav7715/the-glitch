import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import config from "@/config/config";
import SoundsInfo from "./SoundsInfo";

interface AnimeItem {
  id: string;
  title: string;
  poster: string;
  type?: string;
  duration?: string;
  episodes: any;
}

interface AnimeGridProps {
  title?: string;
  path?: string;
  data: AnimeItem[];
  totalResults?: number;
}

export default function AnimeGrid({
  title,
  path,
  data,
  totalResults,
}: AnimeGridProps) {
  return (
    <section className="w-full">
      {/* Header Section */}
      <div className="flex mt-8 mb-4 justify-between items-center px-1">
        {title ? (
          <h1 className="text-xl md:text-2xl font-bold text-[#FFB6D9] ">
            {title}
          </h1>
        ) : (
          <h5 className="text-sm md:text-lg text-gray-400">
            {totalResults?.toLocaleString()} Results Found
          </h5>
        )}

        {path && (
          <Link
            href={`${config.siteRoutes.discover}${path}`}
            className="flex items-center gap-1 text-sm text-neutral-400 hover:text-[#FFB6D9] transition-colors"
          >
            <span>View more</span>
            <ChevronRight size={18} />
          </Link>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {data?.length > 0 ? (
          data.map((item) => (
            <Link
              key={item.id}
              href={`${config.siteRoutes.detail}${item.id}`}
              className="group block w-full"
            >
              {/* Poster Container */}
              <div className="relative aspect-[10/14] w-full mb-3 overflow-hidden rounded-md bg-neutral-900">
                {/* Badges Overlay */}
                <div className="absolute bottom-2 left-0 z-10 opacity-95">
                  <SoundsInfo episodes={item.episodes} />
                </div>

                {/* Main Poster */}
                <Image
                  src={item.poster}
                  alt={item.title}
                  fill
                  sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1400px) 25vw, 16vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-75"
                />
              </div>

              {/* Text Info */}
              <div className="px-1">
                <h2
                  title={item.title}
                  className="text-sm md:text-base font-semibold text-white truncate group-hover:text-[#FFB6D9] transition-colors"
                >
                  {item.title}
                </h2>

                {(item.type || item.duration) && (
                  <div className="flex items-center gap-2 mt-1 text-xs md:text-sm text-neutral-400">
                    <span className="truncate">{item.type}</span>
                    {item.type && item.duration && (
                      <span className="w-1 h-1 bg-neutral-600 rounded-full shrink-0" />
                    )}
                    <span className="truncate">{item.duration}</span>
                  </div>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-neutral-500 text-center py-20 font-medium">
            No results found.
          </div>
        )}
      </div>
    </section>
  );
}
