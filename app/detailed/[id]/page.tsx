// TypeScript interfaces
import Link from "next/link";
import config from "@/config/config";
import { SynopsisSection } from "../_components/SynopsisSection";
interface Episodes {
  sub: number;
  dub: number;
  eps: number;
}

interface Aired {
  from: string;
  to: string | null;
}

interface AnimeData {
  title: string;
  alternativeTitle: string;
  japanese: string;
  id: string;
  poster: string;
  rating: string;
  type: string;
  is18Plus: boolean;
  episodes: Episodes;
  synopsis: string;
  synonyms: string;
  aired: Aired;
  premiered: string;
  duration: string;
  status: string;
  MAL_score: string;
  genres: string[];
  studios: string[];
  producers: string[];
}

interface ApiResponse {
  success: boolean;
  data: AnimeData;
}

interface Props {
  params: Promise<{ id: string }>;
}

// Fetch anime data function
async function getAnimeData(id: string): Promise<AnimeData | null> {
  try {
    // Replace with your actual API endpoint
    const res = await fetch(`http://localhost:3030/api/v1/anime/${id}`, {
       cache:"force-cache"
    });

    if (!res.ok) {
      return null;
    }

    const data: ApiResponse = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching anime data:", error);
    return null;
  }
}

const AnimeDetailPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const animeData = await getAnimeData(id);

  if (!animeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Anime not found</div>
      </div>
    );
  }

  const truncatedSynopsis =
    animeData.synopsis.length > 200
      ? animeData.synopsis.slice(0, 200)
      : animeData.synopsis;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span className="hover:text-white cursor-pointer">Home</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer">TV</span>
          <span>•</span>
          <span className="text-white">{animeData.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Poster */}
          <div className="flex-shrink-0">
            <img
              src={animeData.poster}
              alt={animeData.title}
              className="w-64 h-auto rounded-lg shadow-2xl"
            />
            <button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              Watch2gether
            </button>
          </div>

          {/* Middle Section - Main Content */}
          <div className="flex-grow">
            <h1 className="text-5xl font-bold text-white mb-4">
              {animeData.title}
            </h1>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded">
                {animeData.rating}
              </span>
              <span className="px-3 py-1 bg-pink-600 text-white text-sm font-semibold rounded">
                HD
              </span>
              <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                {animeData.episodes.sub}
              </span>
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0z" />
                </svg>
                {animeData.episodes.dub}
              </span>
              <span className="text-gray-400 text-sm">• {animeData.type}</span>
              <span className="text-gray-400 text-sm">
                • {animeData.duration}
              </span>
            </div>

            {/* Action Buttons - These need to be client components for interactivity */}
            <div className="flex gap-4 mb-6">
              <Link href={`${config.siteRoutes.watch}${animeData.id}`}>
                <button className="px-8 py-3 bg-pink-400 hover:bg-pink-500 text-gray-900 font-semibold rounded-full transition-colors flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Watch now
                </button>
              </Link>
              <button className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-full transition-colors flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Watch List
              </button>
            </div>

            {/* Synopsis - Use Client Component for expandable functionality */}
            <SynopsisSection
              synopsis={animeData.synopsis}
              truncated={truncatedSynopsis}
            />

            {/* HiAnime Promotion */}
            <div className="text-gray-400 text-sm mb-6">
              <p>
                HiAnime is the best site to watch{" "}
                <span className="font-semibold text-white">
                  {animeData.title}
                </span>{" "}
                SUB online, or you can even watch{" "}
                <span className="font-semibold text-white">
                  {animeData.title}
                </span>{" "}
                DUB in HD quality. You can also find{" "}
                <span className="font-semibold text-white">
                  {animeData.studios.join(", ")}
                </span>{" "}
                anime on HiAnime website.
              </p>
            </div>

            {/* Share Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Share Anime</p>
                  <p className="text-gray-400 text-sm">to your friends</p>
                </div>
                <span className="text-gray-500 text-sm">2.6k Shares</span>
              </div>

              <div className="flex gap-2 ml-auto">
                <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors text-sm font-semibold">
                  Share
                </button>
                <button className="px-6 py-2 bg-black hover:bg-gray-900 text-white rounded-full transition-colors text-sm font-semibold">
                  Tweet
                </button>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors text-sm font-semibold">
                  Share
                </button>
                <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-colors text-sm font-semibold">
                  🔴
                </button>
                <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors text-sm font-semibold">
                  ⚡
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Details */}
          <div className="w-full lg:w-80 bg-gray-800 bg-opacity-50 rounded-lg p-6 h-fit">
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-gray-400">Japanese: </span>
                <span className="text-white">{animeData.japanese}</span>
              </div>

              <div>
                <span className="text-gray-400">Synonyms: </span>
                <span className="text-white">{animeData.synonyms}</span>
              </div>

              <div>
                <span className="text-gray-400">Aired: </span>
                <span className="text-white">
                  {animeData.aired.from} to {animeData.aired.to || "?"}
                </span>
              </div>

              <div>
                <span className="text-gray-400">Premiered: </span>
                <span className="text-white">{animeData.premiered}</span>
              </div>

              <div>
                <span className="text-gray-400">Duration: </span>
                <span className="text-white">{animeData.duration}</span>
              </div>

              <div>
                <span className="text-gray-400">Status: </span>
                <span className="text-white">{animeData.status}</span>
              </div>

              <div>
                <span className="text-gray-400">MAL Score: </span>
                <span className="text-white">{animeData.MAL_score}</span>
              </div>

              <div>
                <span className="text-gray-400 block mb-2">Genres:</span>
                <div className="flex flex-wrap gap-2">
                  {animeData.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-white rounded-full text-xs hover:bg-gray-600 cursor-pointer transition-colors"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-gray-400">Studios: </span>
                <span className="text-white">
                  {animeData.studios.join(", ")}
                </span>
              </div>

              <div>
                <span className="text-gray-400">Producers: </span>
                <span className="text-white">
                  {animeData.producers.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

 


export default AnimeDetailPage;
