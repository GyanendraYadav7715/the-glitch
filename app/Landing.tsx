"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, ArrowRightCircle, Music4, Pause } from "lucide-react"; // Imported Music & Pause
import Image from "next/image";
 

const menuItems = [
  { title: "Home", path: "/home" },
  { title: "Movies", path: "/movies" },
  { title: "TV Series", path: "/tv" },
  { title: "Most Popular", path: "/most-popular" },
  { title: "Top Airing", path: "/top-airing" },
  { title: "My Watch Recommendation", path: "/my-watched" },
];

const AnimeLanding: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Music State
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const router = useRouter();

  // 2. Handle Autoplay on Load
  useEffect(() => {
    // Try to play audio automatically on load
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set default volume to 50%
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented by browser policy
          console.log("Autoplay prevented by browser:", error);
          setIsPlaying(false);
        });
      }
    }
  }, []);

  // 3. Toggle Function
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(searchQuery)}`);
    }
  };

  const topSearches = [
    "One Piece",
    "Record of Ragnarok III",
    "One-Punch Man Season 3",
    "Chainsaw Man",
    "My Hero Academia",
    "Gachiakuta",
    "Spy x Family",
    "Demon Slayer",
    "Attack on Titan",
  ];

  return (
    <div
      className={`min-h-screen w-full bg-[#121212] text-[#F5F5F5] font-sans relative overflow-x-hidden`}
    >
      {/* 4. Audio Element (Hidden) */}
      {/* Replace '/music.mp3' with your actual file path inside the public folder */}
      <audio ref={audioRef} src="/aura.mp3" loop />

      {/* 5. Music Toggle Button (Fixed Bottom Right) */}
      <button
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl cursor-pointer transition-all duration-300 group ${
          isPlaying
            ? "bg-[#FFB6D9] text-[#121212] rotate-360 shadow-[#FFB6D9]/40"
            : "bg-[#2C2C2C] text-white border border-white/10"
        }`}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          //  could be useful here, but simple icon is cleaner
          <div className="flex items-center justify-center gap-1">
            <Pause size={24} fill="currentColor" />
          </div>
        ) : (
          <Music4 size={24} />
        )}

        {/* Optional: Pulse animation ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full bg-[#FFB6D9] opacity-30 animate-ping pointer-events-none"></span>
        )}
      </button>

      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('/bg.jpeg')] bg-no-repeat bg-cover opacity-20 pointer-events-none" />

      <div className="relative w-full z-10">
        {/* Header */}
        <div className="mt-4 lg:mt-10">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex justify-start mb-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-11 px-4 text-sm rounded-xl text-white flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all"
              >
                <Menu size={18} />
                Menu
              </button>
            </div>

            {/* Navigation List */}
            <nav
              className={`${
                isMobileMenuOpen ? "block" : "hidden"
              } lg:block pb-4`}
            >
              <ul className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-8 bg-[#1E1E1E]/80 backdrop-blur-md lg:bg-transparent p-6 lg:p-0 rounded-3xl">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className="text-large font-semibold tracking-wide hover:text-[#FFB6D9] transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Hero Section */}
        <main className="container mx-auto max-w-6xl px-4 py-10">
          <div className="relative p-8 md:p-16 bg-[#1E1E1E] rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
            {/* Hero Image (Right Side) */}
            <div className="hidden md:block absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden">
              <div className="absolute z-10 inset-0 bg-linear-to-r from-[#1E1E1E] via-[#1E1E1E]/10 to-transparent" />
              <Image
                src="/landing.jpeg"
                alt="Featured Anime"
                fill
                className="object-cover opacity-40 object-top"
              />
            </div>

            {/* Left Content */}
            <div className="relative z-20 max-w-xl">
              {/* Logo */}
              <div className="mb-10 flex justify-center md:justify-start">
                <Link href="/home">
                  <Image
                    src="/logo9.png"
                    alt="死"
                    width={200}
                    height={30}
                    className="object-contain -mt-10"
                    priority
                  />
                </Link>
              </div>

              {/* Search Bar Container */}
              <div className="relative mb-6">
                <form onSubmit={handleSearch} className="flex gap-3">
                  <input
                    type="text"
                    className="h-14 w-full rounded-2xl px-6 text-base bg-[#2C2C2C] text-white border border-white/10 focus:border-[#FFB6D9] focus:outline-none transition-all"
                    placeholder="Search anime..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="h-14 w-14 shrink-0 bg-[#FFB6D9] rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#FFB6D9]/20"
                  >
                    <Search className="text-[#121212]" size={24} />
                  </button>
                </form>
              </div>

              {/* Top Search Tags */}
              <div className="text-sm leading-relaxed mb-10">
                <span className="font-bold text-white mr-2">Top search:</span>
                {topSearches.map((item, index) => (
                  <React.Fragment key={index}>
                    <Link
                      href={`/search?keyword=${encodeURIComponent(item)}`}
                      className="text-[#A0A0A0] hover:text-[#FFB6D9] transition-colors"
                    >
                      {item}
                    </Link>
                    {index < topSearches.length - 1 && (
                      <span className="text-[#444] mx-1.5">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Action Button */}
              <Link
                href="/home"
                className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-10 py-4 bg-[#FFB6D9] text-[#121212] font-bold text-lg rounded-2xl hover:bg-[#ff8fbe] hover:shadow-xl hover:shadow-[#FFB6D9]/10 transition-all group"
              >
                Watch anime
                <ArrowRightCircle
                  size={22}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnimeLanding;
