import { AnimeService } from "@/services/anime-service";
import { SearchApiResponseData } from "@/types/home.type";
import AnimeList from "@/components/anime/AnimeList";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SubbedPage({ params }: Props) {
  const resolvedParams = await params;
  const response = await AnimeService.getFilteredAnime("dubbed-anime", 1);

  const data: SearchApiResponseData = response.data;

  return (
    <>
      <h1 className="text-[#ffbade] text-xl font-bold">{resolvedParams.id}</h1>
      <AnimeList
        title="Subbede Anime"
        path="recently-updated"
        data={data.response}
      />
    </>
  );
}
