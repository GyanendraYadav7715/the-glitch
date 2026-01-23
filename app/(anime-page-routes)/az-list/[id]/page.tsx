 //http://localhost:3001/api/animes/genre/parody?page=1
import Link from "next/link";

const Page = async () => {
  return (
    <div className="bg-[#201f31] w-full min-h-screen text-white">

      {/* Main Container: Limits width on large screens and centers content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb Section */}
        <nav className="mb-8">
          <h1 className="text-xl font-medium flex items-center gap-3">
            <span className="text-white">Home</span>
            {/* Simple CSS Circle Separator */}
            <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
            <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">
              A-Z List
            </span>
          </h1>
        </nav>

        <h1 className="text-[#ffbade] text-xl text-bold whitespace-nowrap">
          Sort By Letters
        </h1>

        <ul className="flex flex-wrap -m-1 list-none p-0 mt-5">
          {["All", "#", "0-9", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")].map(
            (char) => (
              <li key={char} className="m-1">
                <Link
                  href={`/az-list/${char === "All" ? "all" : char}`}
                  className="block px-2.5 py-1.5 bg-white/10 rounded hover:bg-accent hover:bg-[#ff8fbe] hover:shadow-xl hover:shadow-[#FFB6D9]/10 font-semibold text-[1.1em] transition-colors min-w-[40px] h-[40px]"
                >
                  {char}
                </Link>
              </li>
            ),
          )}
        </ul>
        {/* Content Grid */}
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12"></div>
        </section>
      </main>
    </div>
  );
};

export default Page;
