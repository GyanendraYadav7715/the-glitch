"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Play, Star, Calendar, Clock } from "lucide-react";
import SoundsInfo from "./SoundsInfo";
import config from "@/config/config";
import * as motion from "motion/react-client";

// TypeScript Interfaces
interface AnimeItem {
  id: string;
  title: string;
  poster: string;
  type?: string;
  episodes: any;
  rating?: number;
  year?: string;
  duration?: string;
  status?: string;
  genres?: string[];
  description?: string;
}

interface AnimeListSectionProps {
  title: string;
  data: AnimeItem[];
  path?: string;
}

interface DetailedAnimeData {
  rating: number;
  year: string;
  duration: string;
  status: string;
  genres: string[];
  description: string;
}

// Hover Detail Card Component
function AnimeDetailCard({
  anime,
  details,
  isLoading,
}: {
  anime: AnimeItem;
  details: DetailedAnimeData | null;
  isLoading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute left-full top-0 ml-4 w-80 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden"
    >
      {/* Poster Header */}
      <div className="relative h-40 w-full">
        <Image
          src={anime.poster}
          alt={anime.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
      </div>

      <div className="p-4 -mt-8 relative">
        {/* Title */}
        <h3 className="text-base font-bold text-white mb-3 line-clamp-2">
          {anime.title}
        </h3>

        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-800 rounded animate-pulse w-1/2" />
            <div className="h-16 bg-gray-800 rounded animate-pulse" />
          </div>
        ) : details ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {details.rating && (
                <div className="flex items-center gap-1.5 text-xs">
                  <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                  <span className="text-gray-300">{details.rating}/10</span>
                </div>
              )}
              {details.year && (
                <div className="flex items-center gap-1.5 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-300">{details.year}</span>
                </div>
              )}
              {details.duration && (
                <div className="flex items-center gap-1.5 text-xs">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-300">{details.duration}</span>
                </div>
              )}
              {details.status && (
                <div className="flex items-center gap-1.5 text-xs">
                  <Play className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-gray-300">{details.status}</span>
                </div>
              )}
            </div>

            {/* Genres */}
            {details.genres && details.genres.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {details.genres.slice(0, 4).map((genre, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-[#FFB6D9]/10 text-[#FFB6D9] text-xs rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {details.description && (
              <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                {details.description}
              </p>
            )}
          </>
        ) : null}

        {/* Watch Button */}
        <Link
          href={`${config.siteRoutes.detail}${anime.id}`}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-[#FFB6D9] hover:bg-[#ff9fca] text-gray-900 font-semibold text-sm py-2 rounded-md transition-colors"
        >
          <Play className="w-4 h-4 fill-current" />
          Watch Now
        </Link>
      </div>
    </motion.div>
  );
}

// Main Anime Card Component
function AnimeCard({ item }: { item: AnimeItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [detailsData, setDetailsData] = useState<DetailedAnimeData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = async () => {
    // Delay fetching to avoid unnecessary API calls on quick hovers
    hoverTimeout = setTimeout(async () => {
      setIsHovered(true);
      setIsLoading(true);

      try {
        // Replace with your actual API endpoint
        const response = await fetch(
          `http://localhost:3030/api/v1/anime/${item.id}`
        );
        const data = await response.json();
        setDetailsData(data);
      } catch (error) {
        console.error("Failed to fetch anime details:", error);
        // Fallback to existing data if available
        setDetailsData({
          rating: item.rating || 0,
          year: item.year || "",
          duration: item.duration || "",
          status: item.status || "",
          genres: item.genres || [],
          description: item.description || "",
        });
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms delay
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center gap-3 py-3 border-t border-white/5 first:border-t-0 group"
    >
      {/* Poster */}
      <Link
        href={`${config.siteRoutes.detail}${item.id}`}
        className="relative w-14 h-20 rounded-md overflow-hidden flex-shrink-0 ring-1 ring-white/5"
      >
        <Image
          src={item.poster}
          alt={item.title}
          fill
          sizes="56px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link href={`${config.siteRoutes.detail}${item.id}`}>
          <h2 className="text-sm font-semibold text-white/90 group-hover:text-[#FFB6D9] transition-colors line-clamp-2 mb-1.5 leading-tight">
            {item.title}
          </h2>
        </Link>

        <div className="flex items-center gap-2 text-xs">
          <SoundsInfo episodes={item.episodes} />
          {item.type && (
            <>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <span className="text-gray-500">{item.type}</span>
            </>
          )}
        </div>
      </div>

      {/* Hover Detail Card */}
      {isHovered && (
        <AnimeDetailCard
          anime={item}
          details={detailsData}
          isLoading={isLoading}
        />
      )}
    </motion.div>
  );
}

// Main Section Component
export default function AnimeListSection({
  title,
  data,
  path,
}: AnimeListSectionProps) {
  return (
    <section className="col-span-12 md:col-span-6 xl:col-span-3">
      {/* Section Header */}
      <h2 className="text-lg font-bold mb-4 text-[#FFB6D9]">{title}</h2>

      {/* Anime List */}
      <div className="bg-[#2b2a3c] rounded-lg border border-white/5 p-4">
        <div className="space-y-0">
          {data.map((item) => (
            <AnimeCard key={item.id} item={item} />
          ))}
        </div>

        {/* View More Link */}
        {path && (
          <Link
            href={`${config.siteRoutes.discover}${path}`}
            className="mt-4 pt-4 border-t border-white/5 flex items-center gap-1 text-sm text-[#FFB6D9]/80 hover:text-[#FFB6D9] transition-colors w-fit group"
          >
            <span>View More</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </section>
  );
}
