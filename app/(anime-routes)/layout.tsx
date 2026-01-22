import { AnimeService } from "@/services/anime-service";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/ui/Footer";
import TopTen from "@/components/anime/TopTen";
import Genre from "@/components/anime/Genres";
import ShareSection from "@/components/ShareSection";
export default async function AnimeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await AnimeService.getHomeData();
  const homeData = response.data;

  return (
    <div className="bg-[#201f31] w-full min-h-screen">
      <Navbar />
      <ShareSection/>
      <section className="row grid gap-2 justify-center grid-cols-12 p-5">
        <div className="left col-span-12 xl:col-span-9 pl-5 pt-4">
          {children}
        </div>

        <div className="right col-span-12 xl:col-span-3 space-y-4">
          <div className="mostpular pt-10">
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
}
