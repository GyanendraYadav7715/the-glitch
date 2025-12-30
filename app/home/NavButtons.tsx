"use client";

import Link from "next/link";
import { Disc, Shuffle, Rss, MessageCircle } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  isSpecial?: boolean;
}

const NavButtons = () => {
  const navItems: NavItem[] = [
    {
      label: "Watch2gether",
      icon: <Disc size={20} />,
      href: "/watch2gether",
    },
    {
      label: "Random",
      icon: <Shuffle size={20} />,
      href: "/random",
    },
    {
      label: "Anime Name",
      badge: "EN • JP",
      isSpecial: true,
      href: "/az-list",
    },
    {
      label: "News",
      icon: <Rss size={20} />,
      href: "/news",
    },
    {
      label: "Community",
      icon: <MessageCircle size={20} />,
      href: "/community",
    },
  ];

  return (
    <div className="hidden xl:flex items-center gap-5 ml-6">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="group flex flex-col items-center justify-center min-w-[70px] text-white hover:text-pink-400 transition-all duration-200 ease-in-out hover:-translate-y-0.5"
        >
          {item.isSpecial ? (
            <div className="flex flex-col items-center">
              <span className="text-[10px] bg-pink-500 text-gray-900 font-bold px-1.5 py-[1px] rounded-[3px] mb-1 uppercase leading-tight shadow-sm">
                {item.badge}
              </span>
              <span className="text-[13px] font-medium whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ) : (
            <>
              <div className="mb-1 group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </div>
              <span className="text-[13px] font-medium whitespace-nowrap">
                {item.label}
              </span>
            </>
          )}
        </Link>
      ))}
    </div>
  );
};

export default NavButtons;
