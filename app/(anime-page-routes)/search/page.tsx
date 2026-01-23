import FilterComponent from "./_components/FilterComponent";
import Genre from "@/components/anime/Genres";
import AnimeCard from "@/components/anime/AnimeCard";
import { getHomeData } from "@/lib/api";
import ListpageMapper from "../../(anime-routes)/_components/ListpageMapper";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}
const page = async ({ params, searchParams }: PageProps) => {
  const { id } = await params;
  const { page } = await searchParams;
  const response = await getHomeData();
  const homeData = response.data;
    const currentPage = Number(page) || 1;
    const pageTitle = id;
  return (
    <div className="bg-[#201f31] w-full min-h-screen ">
      <section className="row grid gap-2 justify-center grid-cols-12 p-5">
        <div className="left col-span-12 xl:col-span-9 pl-5 pt-5">
          <FilterComponent />
          <h1 className="text-[#ffbade] text-xl text-bold">
            Search Result for:{pageTitle}
          </h1>

          <ListpageMapper
            id={id}
            apiPath={`search`}
            title={pageTitle}
            currentPage={currentPage}
          />
        </div>
        <div className="right col-span-12 xl:col-span-3 space-y-4 ">
          <div className="mostpular">
            <AnimeCard
              data={homeData.mostPopular}
              title="Most Popular"
              path="most-popular"
            />
          </div>
          <div className="genre">
            <Genre />
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
