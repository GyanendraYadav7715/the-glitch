"use client";
import { useState } from "react";
export function SynopsisSection({
  synopsis,
  truncated,
}: {
  synopsis: string;
  truncated: string;
}) {
  const [showFull, setShowFull] =useState(false);

  return (
    <div className="text-gray-300 mb-6">
      <p className="leading-relaxed">
        {showFull ? synopsis : `${truncated}...`}
        {!showFull && synopsis.length > 200 && (
          <button
            onClick={() => setShowFull(true)}
            className="text-pink-400 hover:text-pink-300 ml-2 font-semibold"
          >
            + More
          </button>
        )}
      </p>
    </div>
  );
}
