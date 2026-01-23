import Link from "next/link";
import config from "@/config/config";
import { SynopsisSection } from "../_components/SynopsisSection";
import {
  FaPlay,
  FaPlus,
  FaTelegramPlane,
  FaTwitter,
  FaFacebookF,
  FaRedditAlien,
  FaShareAlt,
} from "react-icons/fa";

import { AnimeService } from "@/services/anime-service";
import { AnimeDetailedApiResponse } from "@/types/detailed.type";

interface Props {
  params: Promise<{ id: string }>;
}

const AnimeDetailPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const data: AnimeDetailedApiResponse =
    await AnimeService.getAnimeDetailedData(resolvedParams.id);
  const animeData = data.data;

  const truncatedSynopsis =
    animeData.synopsis.length > 250
      ? animeData.synopsis.slice(0, 250)
      : animeData.synopsis;

  return (
    <>
      <div className="bg-[#201f31] w-full min-h-screen">
        <div className="relative w-full h-full bg-[#2b2a3c] text-[#eceae2]">
          <div className="relative z-10 container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row items-start gap-6">
              {/* LEFT COLUMN: POSTER (Locked Width) */}
              <div className="w-full lg:w-64 flex-shrink-0 pt-15 pl-10 space-y-3">
                <img
                  src={animeData.poster}
                  alt={animeData.title}
                  className="w-[180px] h-[266px] rounded shadow-2xl object-cover border border-white/5"
                />
                <div className="w-[180px] bg-[#1e2024]/80 backdrop-blur-sm p-3 rounded text-center gap-2 cursor-pointer hover:bg-gray-800 transition group border border-white/5 flex items-center justify-center hidden">
                  <span className="text-pink-400 group-hover:animate-pulse">
                    ((●))
                  </span>
                  <span className="text-sm font-medium">Watch2gether</span>
                </div>
              </div>

              {/* MIDDLE COLUMN: INFO (Flexible, takes remaining space) */}
              <div className="flex-1 min-w-0 pt-15">
                <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-8">
                  <Link href="/home" className="hover:text-white transition">
                    Home
                  </Link>
                  <span>•</span>
                  <Link href="/tv" className="hover:text-white transition">
                    TV
                  </Link>
                  <span>•</span>
                  <span className="text-gray-100">{animeData.title}</span>
                </div>
                <h1 className="text-4xl lg:text-3xl font-semibold text-white mb-5 tracking-tight">
                  {animeData.title}
                </h1>

                {/* BADGES ROW */}
                <div className="flex flex-wrap items-center gap-2 mb-8 text-[12px] font-bold">
                  <span className="px-2 py-0.5 bg-white text-black rounded-sm">
                    PG-13
                  </span>
                  <span className="px-2 py-0.5 bg-[#ffbade] text-black rounded-sm">
                    HD
                  </span>
                  <span className="px-2 py-0.5 bg-[#4ef49a] text-black rounded-sm flex items-center gap-1">
                    <span className="text-[10px] opacity-60 italic">CC</span>{" "}
                    {animeData.episodes.sub}
                  </span>
                  <span className="px-2 py-0.5 bg-[#59c3f1] text-black rounded-sm flex items-center gap-1">
                    <span className="text-[10px] opacity-60">🎙️</span>{" "}
                    {animeData.episodes.dub}
                  </span>
                  <span className="text-gray-400 ml-2 font-medium">
                    • TV • {animeData.duration}
                  </span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <Link href={`${config.siteRoutes.watch}${animeData.id}`}>
                    <button className="px-7 py-3 bg-[#ffbade] hover:bg-[#ff9ecc] text-black font-bold rounded-full flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-pink-500/10">
                      <FaPlay size={12} /> Watch now
                    </button>
                  </Link>
                  <button className="px-7 py-3 bg-white hover:bg-gray-100 text-black font-bold rounded-full flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-white/5">
                    <FaPlus size={12} /> Add to List
                  </button>
                </div>

                {/* SYNOPSIS AREA (Expanding this won't move the sidebars now) */}
                <div className="mb-8 text-gray-200 leading-relaxed text-[13px]">
                  <SynopsisSection
                    synopsis={animeData.synopsis}
                    truncated={truncatedSynopsis}
                  />
                </div>

                <p className="text-[14px] text-gray-400 leading-relaxed mb-10 border-l-2 border-pink-400/30 pl-4">
                  HiAnime is the best site to watch{" "}
                  <span className="text-white font-semibold">
                    {animeData.title}
                  </span>{" "}
                  SUB online, or you can even watch{" "}
                  <span className="text-white font-semibold">
                    {animeData.title}
                  </span>{" "}
                  DUB in HD quality.
                </p>

                {/* SOCIAL SHARE SECTION */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 pt-8 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-400/20 bg-gray-800">
                      <img
                        src="/landing.jpeg"
                        alt="Share"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <p className="text-pink-300 font-semibold text-sm tracking-wide ">
                        Share Anime
                      </p>
                      <p className="text-white-500 text-[15px]">
                        to your friends
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <SocialBtn
                      icon={<FaTelegramPlane />}
                      label="Share"
                      color="bg-[#2ca5e0]"
                    />
                    <SocialBtn
                      icon={<FaTwitter />}
                      label="Tweet"
                      color="bg-[#1da1f2]"
                    />
                    <SocialBtn
                      icon={<FaFacebookF />}
                      label="Share"
                      color="bg-[#1877f2]"
                    />
                    <SocialBtn
                      icon={<FaRedditAlien />}
                      label=""
                      color="bg-[#ff4500]"
                    />
                    <div className="p-3 bg-[#70bd44] rounded-full text-white cursor-pointer hover:opacity-80 transition active:scale-90">
                      <FaShareAlt size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: SIDEBAR (Locked Width) */}
              <div className="w-full lg:w-[350px] flex-shrink-0 bg-[#2b2a3c]/90 backdrop-blur-xl border border-white/5 rounded-xl p-4 space-y-5 text-[14px]">
                <MetaRow label="Japanese" value={animeData.japanese} />
                <MetaRow label="Synonyms" value={animeData.synonyms} />
                <MetaRow
                  label="Aired"
                  value={`${animeData.aired.from} to ${
                    animeData.aired.to || "?"
                  }`}
                />
                <MetaRow label="Premiered" value={animeData.premiered} />
                <MetaRow label="Duration" value={animeData.duration} />
                <MetaRow label="Status" value={animeData.status} />
                <MetaRow label="MAL Score" value={animeData.MAL_score} />

                <div className="pt-4 border-t border-white/10">
                  <span className="text-gray-500 block mb-4 text-[11px] uppercase tracking-[0.1em] font-bold">
                    Genres:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {animeData.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-4 py-1.5 border border-white/10 rounded-full text-[12px] hover:text-[#ffbade] hover:border-[#ffbade] transition cursor-pointer bg-white/5"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-4">
                  <MetaRow
                    label="Studios"
                    value={animeData.studios.join(", ")}
                  />
                  <MetaRow
                    label="Producers"
                    value={animeData.producers.join(", ")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Sub-Components ---

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-gray-500 text-[11px] font-bold uppercase tracking-wider min-w-[80px]">
        {label}:
      </span>
      <span className="text-gray-200 font-medium flex-1">{value || "N/A"}</span>
    </div>
  );
}

function SocialBtn({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <button
      className={`flex items-center gap-2 px-5 py-2.5 ${color} text-white rounded-full text-[12px] font-extrabold hover:brightness-110 transition shadow-lg active:scale-95`}
    >
      {icon} {label && <span className="uppercase tracking-wide">{label}</span>}
    </button>
  );
}

export default AnimeDetailPage;
