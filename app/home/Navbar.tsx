"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Search,
  X,
  Disc,
  Shuffle,
  Rss,
  MessageCircle,
} from "lucide-react";

// Assuming these are in your components folder
import SocialButtons from "./SocialButtons";
import NavButtons from "./NavButtons";

export default function HiAnimeNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <nav className="bg-[#272a3796] backdrop-blur-md px-4 py-3 sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle */}
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-pink-400 transition-colors"
              aria-label="Toggle Menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="h!anime logo"
                width={120}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Search Bar - Hidden on small mobile, grows on desktop */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search anime..."
                className="w-full bg-white text-gray-900 rounded-sm px-4 py-2 pr-24 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <div className="absolute right-0 top-0 h-full flex items-center gap-2 pr-2">
                <button className="text-gray-500 hover:text-pink-500 transition-colors">
                  <Search size={20} />
                </button>
                <button className="bg-[#4a4b58] hover:bg-gray-600 text-white px-3 py-1 rounded-sm text-xs font-medium uppercase tracking-tighter">
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Social & Nav Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <SocialButtons />
              <NavButtons />
            </div>

            {/* Login Button */}
            <button className="bg-pink-300 hover:bg-pink-400 text-gray-900 font-bold px-5 py-2 rounded-sm text-sm transition-transform active:scale-95">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#1a1a2e] z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <span className="text-pink-400 font-black text-2xl tracking-tighter">
              h!anime
            </span>
            <button
              onClick={toggleSidebar}
              className="text-white hover:rotate-90 transition-transform duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
            <SidebarLink href="/" label="Home" />
            <SidebarLink href="/movies" label="Movies" />
            <SidebarLink href="/tv-series" label="TV Series" />
            <SidebarLink href="/popular" label="Most Popular" />
            <SidebarLink href="/top-airing" label="Top Airing" />

            <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
              <SidebarLink
                href="/random"
                label="Random"
                icon={<Shuffle size={18} />}
              />
              <SidebarLink
                href="/watch2gether"
                label="Watch2gether"
                icon={<Disc size={18} />}
              />
              <SidebarLink href="/news" label="News" icon={<Rss size={18} />} />
              <SidebarLink
                href="/community"
                label="Community"
                icon={<MessageCircle size={18} />}
              />
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}

// Reusable Nav Link Component for Sidebar
function SidebarLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-md transition-all group"
    >
      {icon && (
        <span className="text-pink-400 group-hover:scale-110 transition-transform">
          {icon}
        </span>
      )}
      <span className="font-medium text-[15px]">{label}</span>
    </Link>
  );
}
