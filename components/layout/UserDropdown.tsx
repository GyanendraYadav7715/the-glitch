import React from "react";
import {
  User,
  History,
  Heart,
  Bell,
  Import,
  Settings,
  LogOut,
} from "lucide-react";

const UserDropdown: React.FC = () => {
  return (
    <div className="absolute right-0 mt-2 w-72 bg-[#1a1927] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100] p-4 text-white">
      {/* 1. Header Section */}
      <div className="mb-4 px-1">
        <h3 className="text-[#ffbade] font-bold text-lg">Gyan</h3>
        <p className="text-white/50 text-[11px] truncate">
          gyanendrayadav12345789@gmail.co...
        </p>
      </div>

      {/* 2. Menu Items Section */}
      <div className="space-y-1.5">
        <MenuButton icon={<User size={18} />} label="Profile" />
        <MenuButton icon={<History size={18} />} label="Continue Watching" />
        <MenuButton icon={<Heart size={18} />} label="Watch List" />
        <MenuButton icon={<Bell size={18} />} label="Notification" />
        <MenuButton icon={<Import size={18} />} label="MAL Import / Export" />
        <MenuButton icon={<Settings size={18} />} label="Settings" />
      </div>

      {/* 3. Footer / Logout */}
      <div className="mt-4 pt-2 border-t border-white/5 flex justify-end">
        <button className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors py-2 px-1">
          <span>Logout</span>
          <LogOut size={18} className="rotate-180" />
        </button>
      </div>
    </div>
  );
};

/**
 * Reusable Menu Button Component
 */
interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ icon, label }) => (
  <button className="w-full flex items-center gap-4 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all text-sm font-medium text-white/90 group">
    <span className="text-white/60 group-hover:text-white transition-colors">
      {icon}
    </span>
    {label}
  </button>
);

export default UserDropdown;
