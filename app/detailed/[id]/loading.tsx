import React from "react";

const AnimeDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 bg-gray-700 rounded"></div>
          <span className="text-gray-600">•</span>
          <div className="h-4 w-8 bg-gray-700 rounded"></div>
          <span className="text-gray-600">•</span>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Poster Skeleton */}
          <div className="flex-shrink-0">
            {/* Poster Image Placeholder */}
            <div className="w-64 h-96 bg-gray-800 rounded-lg shadow-2xl"></div>
            {/* Watch2gether Button Placeholder */}
            <div className="w-full mt-4 h-12 bg-gray-700 rounded-lg"></div>
          </div>

          {/* Middle Section - Main Content Skeleton */}
          <div className="flex-grow">
            {/* Title */}
            <div className="h-12 w-3/4 bg-gray-700 rounded mb-4"></div>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="h-6 w-10 bg-gray-700 rounded"></div>
              <div className="h-6 w-10 bg-gray-700 rounded"></div>
              <div className="h-6 w-16 bg-gray-700 rounded"></div>
              <div className="h-6 w-16 bg-gray-700 rounded"></div>
              <span className="text-gray-700 text-sm">•</span>
              <div className="h-4 w-12 bg-gray-700 rounded"></div>
              <span className="text-gray-700 text-sm">•</span>
              <div className="h-4 w-16 bg-gray-700 rounded"></div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <div className="h-12 w-40 bg-gray-700 rounded-full"></div>
              <div className="h-12 w-48 bg-gray-700 rounded-full"></div>
            </div>

            {/* Synopsis Lines */}
            <div className="space-y-3 mb-6">
              <div className="h-4 w-full bg-gray-700 rounded"></div>
              <div className="h-4 w-full bg-gray-700 rounded"></div>
              <div className="h-4 w-11/12 bg-gray-700 rounded"></div>
              <div className="h-4 w-4/5 bg-gray-700 rounded"></div>
            </div>

            {/* HiAnime Promotion Text Placeholder */}
            <div className="mb-6 space-y-2">
              <div className="h-3 w-3/4 bg-gray-700/50 rounded"></div>
              <div className="h-3 w-1/2 bg-gray-700/50 rounded"></div>
            </div>

            {/* Share Section */}
            <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-700 rounded"></div>
                  <div className="h-3 w-16 bg-gray-700/50 rounded"></div>
                </div>
              </div>

              {/* Share Buttons Row */}
              <div className="flex gap-2 ml-auto w-full md:w-auto overflow-hidden">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-16 bg-gray-700 rounded-full"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Details Sidebar Skeleton */}
          <div className="w-full lg:w-80 bg-gray-800 bg-opacity-50 rounded-lg p-6 h-fit">
            <div className="space-y-5">
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div key={item} className="flex flex-col gap-1">
                  <div className="h-3 w-20 bg-gray-600 rounded"></div>
                  <div className="h-4 w-32 bg-gray-700 rounded"></div>
                </div>
              ))}

              {/* Genre Pills */}
              <div>
                <div className="h-3 w-16 bg-gray-600 rounded mb-2"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                  <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
                  <div className="h-6 w-14 bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailSkeleton;
