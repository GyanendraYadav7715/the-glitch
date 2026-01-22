import React from "react";
import { Send, Twitter, Facebook, Share2, MessageSquare } from "lucide-react";

const ShareSection: React.FC = () => {
  // Common button classes to keep the code DRY
  const buttonBase =
    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-90";

  return (
    <div className="bg-[#12111a] p-4 flex flex-wrap items-center gap-6 border-b border-white/5">
      {/* Left side: Avatar and Text */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#ffbade]">
          <img
            src="/share-icon.gif" // Replace with your local asset path
            alt="Luffy"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-[#ffbade] font-bold text-sm leading-tight">
            Share HiAnime
          </h3>
          <p className="text-white/70 text-xs">to your friends</p>
        </div>
      </div>

      {/* Center: Share Counter */}
      <div className="hidden sm:flex flex-col items-center border-l border-white/10 pl-6">
        <span className="text-white text-lg font-bold leading-none">50</span>
        <span className="text-white/40 text-[10px] uppercase tracking-tighter">
          Shares
        </span>
      </div>

      {/* Right side: Social Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Telegram */}
        <button className={`${buttonBase} bg-[#0088cc] text-white`}>
          <Send size={16} fill="currentColor" />
          <span>Share</span>
        </button>

        {/* X / Twitter */}
        <button
          className={`${buttonBase} bg-black text-white border border-white/10`}
        >
          <Twitter size={16} fill="currentColor" />
          <span>Tweet</span>
        </button>

        {/* Facebook */}
        <button className={`${buttonBase} bg-[#3b5998] text-white`}>
          <Facebook size={16} fill="currentColor" />
          <span>Share</span>
        </button>

        {/* Reddit */}
        <button className={`${buttonBase} bg-[#ff4500] text-white`}>
          <MessageSquare size={16} fill="currentColor" />
          <span>Share</span>
        </button>

        {/* Plus / More */}
        <button className="p-2 rounded-full bg-[#a3e635] text-black hover:opacity-90 transition-opacity">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ShareSection;
