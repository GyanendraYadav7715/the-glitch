import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react"; // Using Lucide for the arrow icon
import  SoundsInfo from "./SoundsInfo"; // Assuming you have this
import config from "@/config/config";

// 1. Define strict TypeScript Interfaces
interface AnimeItem {
  id: string;
  title: string;
  poster: string;
  type?: string;
  episodes: any; // Ideally define your episode structure
}

interface AnimeListSectionProps {
  title: string;
  data: AnimeItem[];
  path?: string;
}

export default function AnimeListSection({
  title,
  data,
  path,
}: AnimeListSectionProps) {
  return (
    <div className="col-span-12 md:col-span-6 mt-5 xl:col-span-3">
      {/* Heading - Ensure standard font-weights and colors */}
      <h1 className="text-xl font-bold mb-4 text-white">{title}</h1>

      <div className="bg-[#1a1a1a] rounded-md p-3 h-auto w-full flex flex-col gap-4">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-4 group">
            {/* Poster Image - Using Next.js Image Component for optimization */}
            <Link
              href={`${config.siteRoutes.detail}${item.id}`}
              className="relative w-16 aspect-[3/4] rounded-md overflow-hidden flex-shrink-0"
            >
              <Image
                src={item.poster}
                alt={item.title}
                fill
                sizes="64px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </Link>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <Link href={`${config.siteRoutes.detail}${item.id}`}>
                <h2 className="text-sm font-bold text-white hover:text-[var(--primary)] transition-colors line-clamp-2 mb-1">
                  {item.title}
                </h2>
              </Link>

              <div className="flex items-center gap-2">
                <SoundsInfo episodes={item.episodes} />

                {item.type && (
                  <>
                    <span className="block size-1 bg-[var(--primary)] rounded-full shrink-0" />
                    <span className="text-xs text-gray-400 truncate">
                      {item.type}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* View More Link */}
        {path && (
          <div className="mt-2 pt-2 border-t border-white/5">
            <Link
              href={`${config.siteRoutes.discover}${path}`}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-[var(--primary)] transition-colors w-fit"
            >
              <span>View More</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
