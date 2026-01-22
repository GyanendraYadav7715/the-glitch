export default function Loading() {
  const shimmer = "bg-white/5 animate-pulse rounded-md";

  return (
    <div className="w-full space-y-10 pb-10">
      {/* 1. Spotlight Skeleton */}
      <div
        className={`h-[45vh] md:h-[60vh] xl:h-[calc(100vh-142px)] w-full ${shimmer}`}
      />

      {/* 2. Trending Slider Skeleton */}
      <div className="px-4 space-y-4">
        <div className={`h-8 w-48 ${shimmer}`} />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`h-40 min-w-[150px] flex-1 ${shimmer}`} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 px-4">
        {/* 3. AnimeCards (Top Airing, etc.) */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="col-span-12 md:col-span-6 xl:col-span-3 space-y-3"
          >
            <div className={`h-6 w-32 ${shimmer}`} />
            <div className={`h-96 w-full ${shimmer}`} />
          </div>
        ))}

        {/* 4. Main Content Area */}
        <div className="col-span-12 xl:col-span-9 space-y-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className={`h-8 w-40 ${shimmer}`} />
              <div className={`h-[500px] w-full ${shimmer}`} />
            </div>
          ))}
        </div>

        {/* 5. Sidebar Area */}
        <div className="col-span-12 xl:col-span-3 space-y-6">
          <div className="space-y-4">
            <div className={`h-8 w-24 ${shimmer}`} />
            <div className={`h-64 w-full ${shimmer}`} />
          </div>
          <div className="space-y-4">
            <div className={`h-8 w-24 ${shimmer}`} />
            <div className={`h-96 w-full ${shimmer}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
