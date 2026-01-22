import FilterComponent from "../search/_components/FilterComponent";
import Navbar from "../../components/layout/Navbar";
import Footer from "@/components/ui/Footer";
// Removed the incorrect 'Span' import from next/dist/trace

const Page = async () => {
  return (
    <div className="bg-[#201f31] w-full min-h-screen text-white">
      <Navbar />

      {/* Main Container: Limits width on large screens and centers content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb Section */}
        <nav className="mb-8">
          <h1 className="text-xl font-medium flex items-center gap-3">
            <span className="text-white">Home</span>
            {/* Simple CSS Circle Separator */}
            <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
            <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">
              Filter
            </span>
          </h1>
        </nav>

        {/* Content Grid */}
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <FilterComponent />
          </div>
        </section>
        <div className="flex justify-between items-center">
          <h1 className="text-[#ffbade] text-xl text-bold whitespace-nowrap">
            Filter Results
          </h1>
          <h1 className="text-[#ffbade] text-xl text-bold whitespace-nowrap">
            8602 results
          </h1>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
