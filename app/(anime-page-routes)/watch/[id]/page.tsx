"use client";
import { useState, useEffect, use } from "react";
import EpisodeList from "../EpisodeList";
import Player from "../Player";
import { Episode } from "@/types/episodes.type";
import { AnimeService } from "@/services/anime-service";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const AnimeWatchPage = ({ params }: PageProps) => {
  const { id } = use(params);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await AnimeService.getAnimeEpisodesData(id);
      setEpisodes(data);
      setLoading(false);
    };

    if (id) {
      loadData();
    }
  }, [id]);

  const currentEpisode = episodes[currentIndex];

  const handleChangeEpisode = (action: "next" | "prev") => {
    if (action === "next" && currentIndex < episodes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (action === "prev" && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSelectEpisode = (epId: string) => {
    const foundIndex = episodes.findIndex((ep) => ep.id === epId);
    if (foundIndex !== -1) setCurrentIndex(foundIndex);
  };

  if (!episodes || episodes.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">No Episodes Found</h2>
          <p className="text-gray-400">
            Could not find episodes for ID:{" "}
            <span className="text-pink-500">{id}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {" "}
      <div className="bg-[#201f31] text-white ">
        <div className="p-4 bg-[#595864] min-h-screen">
          <div className="flex items-center gap-2 text-[16px] text-gray-400 mb-8 pl-2">
            <Link href="/home" className="hover:text-white transition">
              Home
            </Link>
            <span>•</span>
            <Link href="/tv" className="hover:text-white transition">
              TV
            </Link>
            <span>•</span>
            <span className="text-gray-100">{id}</span>
          </div>
          {/* --- GRID LAYOUT --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-100px)]">
            {/* LEFT: Episode List */}
            <EpisodeList
              episodes={episodes}
              activeId={currentEpisode.id}
              onSelect={handleSelectEpisode}
            />

            {/* CENTER: Player & Controls */}
            <section className="lg:col-span-6 flex flex-col gap-4">
              <Player
                id={id}
                episodeId={currentEpisode.id}
                currentEp={currentEpisode}
                changeEpisode={handleChangeEpisode}
                hasNextEp={currentIndex < episodes.length - 1}
                hasPrevEp={currentIndex > 0}
              />

              {/* Episode Title Card */}
              {/* <div className="bg-[#1c1c22] p-4 rounded-lg border border-gray-800 shadow-sm">
                <h1 className="text-lg md:text-xl font-bold text-white mb-1">
                  <span className="text-pink-500 mr-2">
                    #{currentEpisode.episodeNumber}
                  </span>
                  {currentEpisode.title}
                </h1>
                {currentEpisode.alternativeTitle && (
                  <p className="text-gray-500 text-xs italic">
                    {currentEpisode.alternativeTitle}
                  </p>
                )}
              </div> */}
            </section>

            {/* RIGHT: Anime Details (Static Placeholder) */}
            <section className="lg:col-span-3 flex flex-col gap-4 h-full overflow-y-auto pb-4">
              {/* Info Card */}
              <div className="bg-[#1c1c22] p-5 rounded-lg flex flex-col gap-4">
                {/* Poster */}
                <div className="w-32 aspect-[2/3] bg-gray-700 self-center rounded shadow-lg mb-2"></div>

                {/* Title Skeleton */}
                <div className="space-y-2 flex flex-col items-center">
                  <div className="h-5 w-full text-center rounded">{id}</div>
                  <div className="h-5 w-2/3 bg-gray-600 rounded"></div>
                </div>

                {/* Metadata Badges */}
                <div className="flex justify-center gap-2 border-b border-gray-800 pb-4">
                  <div className="h-5 w-10 bg-gray-700 rounded text-[10px] flex items-center justify-center">
                    PG-13
                  </div>
                  <div className="h-5 w-10 bg-pink-900/50 text-pink-500 rounded text-[10px] flex items-center justify-center">
                    HD
                  </div>
                  <div className="h-5 w-10 bg-green-900/50 text-green-500 rounded text-[10px] flex items-center justify-center">
                    TV
                  </div>
                </div>

                {/* Synopsis */}
                <div className="space-y-2 text-sm mt-1">
                  <div className="h-2 w-full bg-gray-700 rounded opacity-40"></div>
                  <div className="h-2 w-full bg-gray-700 rounded opacity-40"></div>
                  <div className="h-2 w-full bg-gray-700 rounded opacity-40"></div>
                  <div className="h-2 w-full bg-gray-700 rounded opacity-40"></div>
                  <div className="h-2 w-3/4 bg-gray-700 rounded opacity-40"></div>
                </div>
              </div>

              {/* Voting Box */}
              <div className="bg-[#18181b] border border-gray-800 p-4 rounded-lg mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2 items-center">
                    <div className="text-yellow-500 font-bold text-xl">9.3</div>
                  </div>
                  <div className="h-8 w-20 bg-gray-700 rounded-full"></div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-14 bg-[#27272a] rounded flex flex-col items-center justify-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-gray-600"></div>
                    <div className="w-8 h-1 bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-14 bg-[#27272a] rounded flex flex-col items-center justify-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-yellow-600"></div>
                    <div className="w-8 h-1 bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-14 bg-[#27272a] rounded flex flex-col items-center justify-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-red-600"></div>
                    <div className="w-8 h-1 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default AnimeWatchPage;
