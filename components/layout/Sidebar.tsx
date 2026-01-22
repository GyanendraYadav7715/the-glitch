import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { sidebarLinks } from "@/config/meta";
import Genres from "./Genres";

// Define the types for your links
interface SidebarLink {
  name: string;
  link: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void; // Changed from toggleSidebar to onClose
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose, // Changed from toggleSidebar
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`
          sidebar transition-all fixed overflow-y-auto h-full z-50 top-0 left-0 w-64 md:w-80 bg-[rgba(255,255,255,.1)] backdrop-blur-md
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header / Close Button */}
        <div className="buttons h-10 flex justify-between mx-2 mt-4">
          <button
            className="flex bg-black basis-80 hover:text-primary rounded-lg pl-4 items-center gap-2 text-white"
            onClick={onClose}
          >
            <ChevronLeft size={20} />
            <span>close menu</span>
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="py-4 text-white">
          {sidebarLinks.map((item) => (
            <li
              key={item.link}
              className="py-4 pl-4 hover:text-primary border-b border-[rgba(255,255,255,.05)] w-full transition-colors"
              onClick={onClose}
            >
              <Link href={item.link} className="block w-full">
                {item.name}
              </Link>
            </li>
          ))}

          <li className="py-4 pl-4 w-full text-white text-sm tracking-widest">
            Genres
          </li>

          {/* Genres Component */}
          <div className="w-full my-2 pl-4">
            <Genres
              className="w-1/2 my-2 pl-4 hover:opacity-[.7]"
              onToggle={onClose}
            />
          </div>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
