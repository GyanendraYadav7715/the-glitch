"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
 
import Link from "next/link";
import config from "@/config/config";

// Assuming these components exist in your project
// import Loader from "../_components/Loader";
import Player from "../_components/Player";
// import Episode from "../_components/Episode";

// 1. Updated Interface to match your Error
interface EpisodeData {
  id: string;
  episodeNumber: number;
  title: string; // Added
  isFiller: boolean; // Added
  [key: string]: any; // Allows other loose properties
}

export default function WatchPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // State
  const [data, setData] = useState<{ data: EpisodeData[] } | null>(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState<any>(null);
  const [layout, setLayout] = useState<"row" | "column">("row");

  // Computeds / Derived State
  const id = (params?.id as string) || "";
  const ep = searchParams.get("ep");

  const titleArr = useMemo(() => id.split("-"), [id]);
  const title = useMemo(
    () => titleArr.slice(0, titleArr.length - 1).join(" "),
    [titleArr]
  );

  const episodes = useMemo(() => data?.data || [], [data]);

  const currentEp = useMemo(() => {
    if (!ep || !episodes.length) return null;
    return episodes.find((e) => e.id.split("ep=").pop() === ep) || null;
  }, [ep, episodes]);

  const hasNextEp = useMemo(() => {
    if (!currentEp) return false;
    const idx = currentEp.episodeNumber - 1;
    return Boolean(episodes[idx + 1]);
  }, [currentEp, episodes]);

  const hasPrevEp = useMemo(() => {
    if (!currentEp) return false;
    const idx = currentEp.episodeNumber - 1;
    return Boolean(episodes[idx - 1]);
  }, [currentEp, episodes]);

  // Effects
  useEffect(() => {
    document.title = `Watch | ${title}`;
  }, [title]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPending(true);
        const res = await fetch(`http://localhost:3030/api/v1/episodes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setPending(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const updateParams = (newEp: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("ep", newEp);
    router.replace(`?${newParams.toString()}`);
  };

  useEffect(() => {
    if (!pending && !ep && episodes.length > 0) {
      const firstEp = episodes[0].id.split("ep=").pop();
      if (firstEp) updateParams(firstEp);
    }
  }, [pending, ep, episodes]);

  if (error) {
    throw new Error("Page not found");
  }

  const changeEpisode = (action: "next" | "prev") => {
    if (!currentEp) return;
    const idx = currentEp.episodeNumber - 1;
    if (action === "next") {
      const next = episodes[idx + 1];
      if (next) updateParams(next.id.split("ep=").pop() || "");
    } else {
      const prev = episodes[idx - 1];
      if (prev) updateParams(prev.id.split("ep=").pop() || "");
    }
  };

  return (
    <>
      
        <div>
            <div className="w-full h-15 bg-red-800 fixed top-0 z-50"></div>
          <div className="bg-[#1E1E1E] pt-14 w-full mx-auto py-2 md:px-2">
            <div className="flex flex-col gap-2">
              <div className="path flex mb-2 mx-2 items-center gap-2 text-base">
                <Link href={config.siteRoutes.home}>
                  <h4 className="hover:text-primary cursor-pointer">home</h4>
                </Link>
                <span className="h-1 w-1 rounded-full bg-primary" />
                <Link href={config.siteRoutes.detail + id}>
                  <h4 className="hover:text-primary cursor-pointer">
                    {id.replaceAll("-", " ")}
                  </h4>
                </Link>
                <span className="h-1 w-1 rounded-full bg-primary" />
                <h4 className="gray">episode {currentEp?.episodeNumber}</h4>
              </div>

              {ep && id && currentEp && (
                <Player
                  id={id}
                  episodeId={`${id}?ep=${ep}`}
                  currentEp={currentEp}
                  changeEpisode={changeEpisode}
                  hasNextEp={hasNextEp}
                  hasPrevEp={hasPrevEp}
                />
              )}

              <div className="input w-full mt-2 flex items-end justify-end gap-3 text-end">
                <div className="btns bg-btnbg flex mx-2 rounded-child">
                  <button
                    className={`row item p-2 ${
                      layout === "row" ? "bg-primary text-black" : ""
                    }`}
                    onClick={() => setLayout("row")}
                  >
                    hello
                  </button>
                  <button
                    className={`column item p-2 ${
                      layout === "column" ? "bg-primary text-black" : ""
                    }`}
                    onClick={() => setLayout("column")}
                  >
                    hello
                  </button>
                </div>
              </div>
              {/* 
            {episodes.length > 0 && currentEp && (
              <ul
                className={`episodes max-h-[50vh] py-4 px-2 overflow-scroll bg-lightbg grid gap-1 md:gap-2 ${
                  layout === "row"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-5 md:grid-cols-10"
                }`}
              >
                
                {episodes.map((episode) => (
                  <Episode
                    key={episode.id}
                    episodeData={episode}
                    currentEp={currentEp} 
                    layout={layout}
                  />
                ))}
              </ul>
            )} */}
            </div>
          </div>
        </div>
      <style jsx global>{`
        .episodes {
          scrollbar-width: none;
        }
        .episodes::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
