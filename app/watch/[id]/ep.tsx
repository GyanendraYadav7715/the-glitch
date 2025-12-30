"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
// Assuming you have these components or icons installed
import { Icon } from "@iconify/react"; // Example generic icon component
import Loader from "../_components/Loader"; // Placeholder
import Player from "../_components/Player"; // Placeholder
import Episode from "../_components/Episode"; // Placeholder
import config from "@/src/config/config";

interface EpisodeData {
  id: string;
  episodeNumber: number;
  [key: string]: any;
}

interface WatchClientProps {
  id: string;
  episodes: EpisodeData[];
}

export default function WatchClient({ id, episodes }: WatchClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [layout, setLayout] = useState<"row" | "column">("row");
  const [isMounted, setIsMounted] = useState(false);

  // Derived State
  const ep = searchParams.get("ep");

  // Helper to extract clean ID logic matching your Vue code
  const getEpId = (episodeId: string) => episodeId.split("ep=").pop();

  // Handle Initial Redirect if no 'ep' query param
  useEffect(() => {
    setIsMounted(true);
    if (!ep && episodes.length > 0) {
      const firstEp = getEpId(episodes[0].id);
      if (firstEp) {
        // Replace URL without adding to history stack
        router.replace(`?ep=${firstEp}`, { scroll: false });
      }
    }
  }, [ep, episodes, router]);

  const updateParams = (newEp: string) => {
    router.replace(`?ep=${newEp}`, { scroll: false });
  };

  const currentEp = useMemo(() => {
    if (!ep || !episodes.length) return null;
    return episodes.find((e) => getEpId(e.id) === ep);
  }, [ep, episodes]);

  const changeEpisode = (action: "next" | "prev") => {
    if (!currentEp) return;
    const idx = currentEp.episodeNumber - 1; // Assuming 1-based index aligns with array index

    if (action === "next") {
      const next = episodes[idx + 1];
      if (next) updateParams(getEpId(next.id) as string);
    } else {
      const prev = episodes[idx - 1];
      if (prev) updateParams(getEpId(prev.id) as string);
    }
  };

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

  // Prevent hydration mismatch or show loader while redirecting
  if (!isMounted) return <Loader />;

  return (
    <div className="bg-background pt-14 max-w-screen-xl mx-auto py-2 md:px-2">
      <div className="flex flex-col gap-2">
        {/* Breadcrumbs */}
        <div className="path flex mb-2 mx-2 items-center gap-2 text-base">
          <Link href={config.siteRoutes.home}>
            <h4 className="hover:text-primary cursor-pointer">home</h4>
          </Link>
          <span className="h-1 w-1 rounded-full bg-primary" />

          <Link href={`${config.siteRoutes.detail}${id}`}>
            <h4 className="hover:text-primary cursor-pointer">
              {id.replaceAll("-", " ")}
            </h4>
          </Link>
          <span className="h-1 w-1 rounded-full bg-primary" />

          <h4 className="text-gray-500">episode {currentEp?.episodeNumber}</h4>
        </div>

        {/* Player */}
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

        {/* Layout Toggles */}
        <div className="input w-full mt-2 flex items-end justify-end gap-3 text-end">
          <div className="btns bg-btnbg flex mx-2 rounded-lg overflow-hidden">
            <button
              className={`row item p-2 ${
                layout === "row" ? "bg-primary text-black" : ""
              }`}
              onClick={() => setLayout("row")}
            >
              <Icon icon="fa-solid:align-justify" className="rotate-90" />
            </button>
            <button
              className={`column item p-2 ${
                layout === "column" ? "bg-primary text-black" : ""
              }`}
              onClick={() => setLayout("column")}
            >
              <Icon icon="fa-solid:align-justify" />
            </button>
          </div>
        </div>

        {/* Episode List */}
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
                episode={episode}
                currentEp={currentEp}
                layout={layout}
              />
            ))}
          </ul>
        )}
      </div>

      <style jsx>{`
        .episodes {
          scrollbar-width: none;
        }
        .episodes::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
