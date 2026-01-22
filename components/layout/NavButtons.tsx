"use client";
import {
  Radio,
  Shuffle,
  Rss,
  MessagesSquare,
} from "lucide-react";

const NavButtons = () => {
 

  return (
    <div className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-white">
      <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-[#ffbade] transition-colors">
        <Radio size={18} className="text-[#ffbade]" />
        <span className="text-[10px]">Watch2gether</span>
      </div>
      <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-[#ffbade] transition-colors">
        <Shuffle size={18} className="text-[#ffbade]" />
        <span className="text-[10px]">Random</span>
      </div>
      <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-[#ffbade] transition-colors">
        <div className="flex items-center border border-white/20 rounded-sm overflow-hidden text-[9px] h-4">
          <span className="bg-white/20 px-1">EN</span>
          <span className="bg-[#ffbade] text-black px-1 font-bold">JP</span>
        </div>
        <span className="text-[10px]">Anime Name</span>
      </div>
      <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-[#ffbade] transition-colors">
        <Rss size={18} className="text-[#ffbade]" />
        <span className="text-[10px]">News</span>
      </div>
      <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-[#ffbade] transition-colors">
        <MessagesSquare size={18} className="text-[#ffbade]" />
        <span className="text-[10px]">Community</span>
      </div>
    </div>
  );
};

export default NavButtons;
