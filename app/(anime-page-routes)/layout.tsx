import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/ui/Footer";
import Nava from "@/components/ui/Navbar"
export default async function AnimeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#201f31] w-full min-h-screen">
      <Navbar />
      {/* <Nava/> */}
      <div>{children}</div>

      <Footer />
    </div>
  );
}
