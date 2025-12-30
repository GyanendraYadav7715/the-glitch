"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Send,
  MessageSquare,
  Twitter,
  ChevronUp,
  ArrowBigUpDash,
} from "lucide-react";

const Footer = () => {
  const alphabets = [
    "All",
    "#",
    "0-9",
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#201f31] text-gray-400 py-10 px-4 md:px-12 mt-auto border-t border-gray-800">
      <div className="max-w-350 mx-auto">
        {/* Top Section: Logo and Socials */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="flex">
            <Image
              src="/logo.png"
              alt="h!anime logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          <div className="h-6 w-px bg-gray-700 hidden md:block mx-4"></div>

          <div className="flex gap-3">
            <SocialIcon
              icon={<MessageSquare size={18} />}
              bg="bg-[#5865F2]"
              href="#"
            />
            <SocialIcon icon={<Send size={18} />} bg="bg-[#0088cc]" href="#" />
            <SocialIcon
              icon={<ArrowBigUpDash size={18} />}
              bg="bg-[#ff4500]"
              href="#"
            />
            <SocialIcon
              icon={<Twitter size={18} />}
              bg="bg-[#1da1f2]"
              href="#"
            />
          </div>
        </div>

        {/* A-Z List Section */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h3 className="text-white font-bold text-lg">A-Z LIST</h3>
            <span className="text-sm text-gray-500">
              Searching anime order by alphabet name A to Z.
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {alphabets.map((char) => (
              <Link
                key={char}
                href={`/az-list/${char.toLowerCase()}`}
                className="bg-[#2a2c38] hover:bg-pink-500 hover:text-white transition-colors px-3 py-1 rounded text-sm font-medium min-w-[35px] text-center"
              >
                {char}
              </Link>
            ))}
          </div>
        </div>

        {/* Links and Copyright */}
        <div className="border-t border-gray-800 pt-8 relative">
          <ul className="flex flex-wrap gap-6 text-sm mb-6">
            <li>
              <Link href="/terms" className="hover:text-white transition">
                Terms of service
              </Link>
            </li>
            <li>
              <Link href="/dmca" className="hover:text-white transition">
                DMCA
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/app" className="hover:text-white transition">
                HiAnime App
              </Link>
            </li>
          </ul>

          <p className="text-xs leading-relaxed max-w-3xl mb-4">
            HiAnime does not store any files on our server, we only linked to
            the media which is hosted on 3rd party services.
          </p>

          <p className="text-xs">© HiAnime.to. All rights reserved.</p>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="absolute right-0 bottom-4 bg-[#2a2c38] p-3 rounded-full hover:bg-gray-700 transition"
          >
            <ChevronUp className="text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};

// Sub-component for Social Icons
const SocialIcon = ({
  icon,
  bg,
  href,
}: {
  icon: React.ReactNode;
  bg: string;
  href: string;
}) => (
  <Link
    href={href}
    className={`${bg} text-white p-2 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center`}
  >
    {icon}
  </Link>
);

export default Footer;
