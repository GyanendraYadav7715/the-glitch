import Link from "next/link";
import { X, Shuffle, Disc, Rss, MessageCircle } from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#1a1a2e] z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <span className="text-pink-400 font-black text-2xl tracking-tighter">
              h!anime
            </span>
            <button
              onClick={onClose}
              className="text-white hover:rotate-90 transition-transform duration-200"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
            <SidebarLink href="/" label="Home" />
            <SidebarLink href="/movies" label="Movies" />
            <SidebarLink href="/popular" label="Most Popular" />

            <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
              <SidebarLink
                href="/random"
                label="Random"
                icon={<Shuffle size={18} />}
              />
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

function SidebarLink({ href, label, icon }) {
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
