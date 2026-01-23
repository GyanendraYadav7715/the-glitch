import { Metadata } from "next";
import ListpageMapper from "../../_components/ListpageMapper";

// Equivalent to Vue's validQueries config
const VALID_SLUGS = [
  "subbed-anime",
  "dubbed-anime",
  "trending",
  "most-popular",
];

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

// Equivalent to useHead
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const title = id.replaceAll("-", " ");
  return {
    title: `Discover ${title} Anime | HiAnime`,
    description: `Browse the best ${title} anime on HiAnime.`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { page } = await searchParams;

  // Validation
  // if (!VALID_SLUGS.includes(id)) {
  //   notFound(); // Redirects to 404
  // }

  const currentPage = Number(page) || 1;
  const pageTitle = id.replaceAll("-", " ");

  return (
    <main className="px-5">
      <h1 className="text-[#ffbade] text-xl font-bold capitalize">{ pageTitle}</h1>

      <ListpageMapper
        id={id}
        apiPath={`animes/${id}`}
        title={pageTitle}
        currentPage={currentPage}
      />
    </main>
  );
}
