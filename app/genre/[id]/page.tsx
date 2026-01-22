import Navbar from "../../../components/layout/Navbar";
import Footer from "@/components/ui/Footer";
import Genre from "@/components/anime/Genres";
import AnimeCard from "@/components/anime/AnimeCard";
import { getHomeData } from "@/lib/api";
import AnimeList from "@/components/anime/AnimeList";

const page = async () => {
  const response = await getHomeData();
  const homeData = response.data;
  return (
    <div className="bg-[#201f31] w-full min-h-screen">
      <Navbar />
      <section className="row grid gap-2 justify-center grid-cols-12">
        <div className="left col-span-12 xl:col-span-9 pl-5">
          <h1 className="text-[#ffbade] text-xl text-bold">Isekai Anime</h1>
          <AnimeList
            title="Top Upcoming"
            path="top-upcoming"
            data={homeData.topUpcoming}
          />
        </div>
        <div className="right col-span-12 xl:col-span-3 space-y-4 ">
          <div className="genre">
            <Genre />
          </div>
          <div className="mostpular">
            <AnimeCard
              data={homeData.topAiring}
              title="Top Airing"
              path="top-airing"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default page;
