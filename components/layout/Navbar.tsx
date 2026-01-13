"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
import AuthModal from "../auth/AuthModal";
import Sidebar from "./Sidebar";
// import  Avatar  from "../ui/Avatar";
// import SocialButtons from "../SocialButtons"; // Adjust paths as needed
// import NavButtons from "../NavButtons";       // Adjust paths as needed

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="lg:px-4 py-3 sticky top-0 z-50  ">
        <div className="max-w-375 mx-auto flex items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-white hover:text-pink-400 transition-colors not-first:lg:hidden"
            >
              <Menu size={24} className="font-bold" />
            </button>
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Middle Section (Search) */}
          {/* <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-sm"
              />
              <Search className="absolute right-2 top-2 text-white" size={20} />
            </div>
          </div> */}

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* <SocialButtons /> */}
            <Search
              onClick={() => setIsSearchOpen(true)}
              className=" text-white lg:hidden"
              size={25}
            />
            <button
              onClick={() => setIsLoginOpen(true)}
              className="bg-[#ffbade]   text-black font-bold px-3 py-1.5 rounded-sm text-sm transition-transform active:scale-95"
            >
              Login
            </button>
            {/* <Avatar/> */}
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="top-15 absolute bg-opacity-50 flex items-center justify-center z-50 lg:hidden">
          <div className="bg-[#201f31] rounded-sm p-4 w-11/12 max-w-md  flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-amber-50"></div>
            <div className="relative bg-white rounded">
              <input
                autoFocus
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-sm border "
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <Search
                  onClick={() => setIsSearchOpen(true)}
                  className=" text-black"
                  size={25}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render Components */}
      {isLoginOpen && <AuthModal onClose={() => setIsLoginOpen(false)} />}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
