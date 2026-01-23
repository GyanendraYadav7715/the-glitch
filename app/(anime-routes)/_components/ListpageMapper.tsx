import { AnimeService } from "@/services/anime-service";
import AnimeList from "@/components/anime/AnimeList";
import Pagination from "./Pagination";
import { SearchApiResponseData } from "@/types/home.type";

interface Props {
  apiPath: string;
  title: string;
  currentPage: number;
  id: string;
}

export default async function ListpageMapper({
  apiPath,
  title,
  currentPage,
  id,
}: Props) {
  // Fetching data directly on the server
  let response;
  if (apiPath == "search") {
    response = await AnimeService.getSearchAnime(id, currentPage);
    
  } else {
     response = await AnimeService.getFilteredAnime(id, currentPage);

  }
    
  if (!response?.success) {
    throw new Error("Failed to fetch anime list");
  }

  const data: SearchApiResponseData = response.data;
  const pageInfo = data.pageInfo;
  // Vue logic: totalPages * 36 or list length
  const totalResults =
    pageInfo.totalPages > 1 ? pageInfo.totalPages * 36 :data.response.length;

  return (
    <div className="min-h-screen">
      <AnimeList data={data.response}   totalResults={totalResults} />

      {pageInfo && pageInfo.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pageInfo.totalPages}
          basePath={`/animes/${id}`}
        />
      )}
    </div>
  );
}
