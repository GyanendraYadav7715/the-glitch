"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
      <div
        className="flex items-center justify-between px-8 py-3 
                bg-[rgba(0, 0, 0, 0.454)] backdrop-blur-lg 
                border border-white/10 
                rounded-full shadow-2xl"
      >
        {/* Logo Section */}
        {/* <div className="flex items-center gap-2">
         
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
          </svg>
          <span className="text-white font-semibold text-xl tracking-tight">
            The 25th Hour
          </span>
        </div> */}

        {/* Links Section */}

        <Link
          href="/home"
          className="text-gray-300 hover:text-white transition-colors font-medium"
        >
          Home
        </Link>
        <Link
          href="/docs"
          className="text-gray-300 hover:text-white transition-colors font-medium"
        >
          Movies
        </Link>
        <Link
          href="/"
          className="text-gray-300 hover:text-white transition-colors font-medium"
        >
          TV Series
        </Link>
        <Link
          href="/docs"
          className="text-gray-300 hover:text-white transition-colors font-medium"
        >
          Most Popular
        </Link>
        <Link
          href="/"
          className="text-gray-300 hover:text-white transition-colors font-medium"
        >
          Top Airing
        </Link>
        <Link
          href="/docs"
          className="text-gray-300 hover:text-white transition-colors font-medium"
        >
          My Watch Recemendestion
        </Link>
      </div>
    </nav>
  );
}
