// 1. Remove "use client" from here
import AnimeCard from "@/components/anime/AnimeCard";
import Navbar from "../../components/layout/Navbar";
import Footer from "@/components/ui/Footer";
import SpotLightSlider from "@/components/anime/Spotlight";
import Trending from "@/components/anime/Treanding";
import { getHomeData } from "@/lib/api";
import AnimeList from "@/components/anime/AnimeList";
import Genre from "@/components/anime/Genres";
import TopTen from "@/components/anime/TopTen";
import EstimatedSchedule from "@/components/anime/EstimatedSchedule";
const page = async () => {
  const response = await getHomeData();
  const homeData = response.data;

  return (
    <div className="bg-[#201f31] w-full min-h-screen">
      <Navbar />
      <SpotLightSlider spotlight={homeData.spotlight} />
      <Trending trending={homeData.trending} />
      <section className="grid grid-cols-12 gap-2 my-5 px-5 bg-[#201f31]">
        <AnimeCard
          data={homeData.topAiring}
          title="Top Airing"
          path="top-airing"
        />
        <AnimeCard
          data={homeData.mostPopular}
          title="Most Popular"
          path="most-popular"
        />
        <AnimeCard
          data={homeData.mostFavorite}
          title="Most Favorite"
          path="most-favorite"
        />
        <AnimeCard
          data={homeData.latestCompleted}
          title="Completed"
          path="completed"
        />
      </section>
      <section className="row grid gap-2 justify-center grid-cols-12">
        <div className="left col-span-12 xl:col-span-9 pl-5">
          <AnimeList
            title="Latest Episode"
            path="recently-updated"
            data={homeData.latestEpisode}
          />
          <AnimeList
            title="New On HiAnime"
            path="recently-added"
            data={homeData.newAdded}
          />
          {/* <EstimatedSchedule /> */}
          <AnimeList
            title="Top Upcoming"
            path="top-upcoming"
            data={homeData.topUpcoming}
          />
        </div>
        <div className="right col-span-12 xl:col-span-3 space-y-4 ">
          <div className="top10">
            <TopTen data={homeData.top10} />
          </div>
          <div className="genre">
            <Genre />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default page;
