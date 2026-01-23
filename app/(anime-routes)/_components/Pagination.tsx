import Link from "next/link";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string; 
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: Props) {
  const getPageRange = (page: number, total: number) => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    const start = Math.max(1, page - 2);
    const end = Math.min(total, page + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getPageRange(currentPage, totalPages);
  const liClass =
    "bg-[#2a2937] text-sm sm:text-base hover:text-[#ffbade] rounded-full size-10 sm:size-11 flex justify-center items-center cursor-pointer transition-colors";
  const activeClass = "bg-[#ffbade] text-black hover:text-black";

  // Helper to build the URL
  const getHref = (page: number) => `${basePath}?page=${page}`;

  return (
    <nav aria-label="Pagination">
      <ul className="flex justify-center items-center gap-2 my-10">
        {/* First & Prev */}
        {currentPage > 1 && (
          <>
            <li>
              <Link href={getHref(1)} className={liClass}>
                <ChevronsLeft size={18} />
              </Link>
            </li>
            <li>
              <Link href={getHref(currentPage - 1)} className={liClass}>
                <ChevronLeft size={18} />
              </Link>
            </li>
          </>
        )}

        {/* Page Numbers */}
        {pages.map((p) => (
          <li key={p}>
            <Link
              href={getHref(p)}
              className={`${liClass} ${currentPage === p ? activeClass : ""}`}
            >
              {p}
            </Link>
          </li>
        ))}

        {/* Next & End */}
        {totalPages - currentPage >= 1 && (
          <>
            <li>
              <Link href={getHref(currentPage + 1)} className={liClass}>
                <ChevronRight size={18} />
              </Link>
            </li>
            <li>
              <Link href={getHref(totalPages)} className={liClass}>
                <ChevronsRight size={18} />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
