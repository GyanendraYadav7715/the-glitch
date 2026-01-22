"use client";

import Link from "next/link";
import { Twitter, MessageCircle, Send, Radio } from "lucide-react";

const DiscordIcon = () => (
  <svg viewBox="0 0 127.14 96.36" width="18" height="18" fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.06,72.06,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.4,80.21a105.73,105.73,0,0,0,32.17,16.15,77.7,77.7,0,0,0,6.89-11.11,68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.72-27.31-4.82-51.1-19.34-72.14ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

const RedditIcon = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
    <path d="M16.5,9.1c0-0.9-0.7-1.6-1.6-1.6c-0.4,0-0.7,0.1-1,0.4C12.8,7.2,11.3,6.7,9.7,6.6L10.3,4l2.1,0.5c0,0.5,0.4,0.9,0.9,0.9c0.5,0,0.9-0.4,0.9-0.9c0-0.5-0.4-0.9-0.9-0.9c-0.4,0-0.7,0.2-0.8,0.5L10.1,3.6C10,3.6,9.9,3.6,9.9,3.7L9.2,6.6C7.5,6.7,6,7.2,4.8,7.9c-0.3-0.2-0.6-0.4-1-0.4c-0.9,0-1.6,0.7-1.6,1.6c0,0.6,0.3,1.1,0.8,1.4C3,10.7,3,10.8,3,11c0,2.2,3.1,4,7,4s7-1.8,7-4c0-0.2,0-0.3,0-0.5C17.5,10.2,17.8,9.7,17.8,9.1z M6.5,11c0-0.6,0.5-1.1,1.1-1.1s1.1,0.5,1.1,1.1s-0.5,1.1-1.1,1.1S6.5,11.6,6.5,11z M12.8,13.3c-0.8,0.8-2.3,0.9-2.8,0.9s-2-0.1-2.8-0.9c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0.5,0.5,1.7,0.7,2.4,0.7s1.9-0.2,2.4-0.7c0.1-0.1,0.3-0.1,0.4,0C12.9,13,12.9,13.2,12.8,13.3z M12.4,12.1c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1s1.1,0.5,1.1,1.1S13,12.1,12.4,12.1z" />
  </svg>
);

const SocialButtons = () => {
  const socialLinks = [
    {
      name: "Discord",
      icon: <DiscordIcon />,
      color: "bg-[#5865F2]", // Exact Discord Blue
      url: "https://discord.com",
    },
    {
      name: "Telegram",
      icon: <Send size={18} className="mr-0.5" />, // Telegram arrow look
      color: "bg-[#24A1DE]", // Exact Telegram Blue
      url: "https://telegram.org",
    },
    {
      name: "Reddit",
      icon: <RedditIcon />,
      color: "bg-[#FF4500]", // Exact Reddit Orange
      url: "https://reddit.com",
    },
    {
      name: "Facebook",
      icon: <Twitter size={14} fill="white" />,
      color: "bg-[#1877F2]", // Exact Facebook Blue
      url: "https://facebook.com",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            w-8 h-8 rounded-full shrink-0 flex items-center justify-center 
            text-white transition-all duration-200 
            ${social.color} hover:brightness-110 hover:-translate-y-0.5
            shadow-lg shadow-black/20
          `}
          aria-label={`Follow us on ${social.name}`}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default SocialButtons;
