"use client";
import { useState } from "react";
import Link from "next/link";
// Helper Component for Social Buttons
function SocialButton({ href, color, icon }) {
  return (
    <div className="item mr-1.5 shrink-0 last:mr-0">
      <a href={href} className={`zr-social-button ${color} inline-flex items-center justify-center h-8 w-8 rounded-full text-white transition-opacity hover:opacity-80`}>
        <i className={`${icon} text-base`}></i>
      </a>
    </div>
  );
}
export default function Navigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          id="sidebar_menu_bg"
          onClick={toggleSidebar}
          className="fixed inset-0 bg-dark/80 z-[103] backdrop-blur-sm"
        ></div>
      )}

      {/* Sidebar Menu */}
      <div
        id="sidebar_menu"
        className={`fixed top-0 bottom-0 left-0 w-[260px] bg-white/10 text-white z-[1000200] border-r border-black/10 overflow-y-auto transition-transform duration-200 ease-in-out backdrop-blur-md ${
          isSidebarOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        <div className="p-5">
          <button
            onClick={toggleSidebar}
            className="btn btn-sm btn-secondary rounded-full px-4 py-2 bg-secondary hover:bg-secondary-hover text-white text-sm font-medium transition-colors mb-4"
          >
            <i className="fas fa-angle-left mr-2"></i>Close menu
          </button>

          {/* Sidebar Settings Block */}
          <div className="sb-setting mb-4">
            {/* Reusing header toggle structure for sidebar if needed, simplified here based on HTML */}
            <div className="hs-toggles flex gap-4 justify-start">
              <Link
                href="/watch2gether"
                className="flex flex-col items-center gap-1 min-w-[50px]"
              >
                <div className="h-5">
                  <i className="fas fa-broadcast-tower text-accent"></i>
                </div>{" "}
                {/* Placeholder for custom zicon */}
                <span className="text-xs">W.2.G</span>
              </Link>
              <Link
                href="/random"
                className="flex flex-col items-center gap-1 min-w-[50px]"
              >
                <div className="h-5">
                  <i className="fas fa-random text-accent"></i>
                </div>
                <span className="text-xs">Random</span>
              </Link>
              {/* Language Toggle */}
              <div className="flex flex-col items-center gap-1 min-w-[50px]">
                <div className="flex bg-[#4d5059] rounded overflow-hidden h-[18px] cursor-pointer">
                  <span className="px-1 bg-accent text-black text-[10px] font-bold flex items-center">
                    EN
                  </span>
                  <span className="px-1 text-[10px] font-bold flex items-center">
                    JP
                  </span>
                </div>
                <span className="text-xs">Name</span>
              </div>
            </div>
          </div>

          <div className="sb-donate mb-4">
            <Link
              href="/community/board"
              className="btn btn-sm w-full block text-center bg-[#4e4e6d] rounded-full py-2 text-white hover:bg-[#5e5e82] transition-colors"
            >
              <i className="fas fa-comments mr-2 text-accent"></i>Community
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="nav sidebar_menu-list list-none p-0 mt-2 text-sm">
            {[
              { title: "Home", href: "/home" },
              { title: "Subbed Anime", href: "/subbed-anime" },
              { title: "Dubbed Anime", href: "/dubbed-anime" },
              { title: "Most Popular", href: "/most-popular" },
              { title: "Movies", href: "/movie" },
              { title: "TV Series", href: "/tv" },
              { title: "OVAs", href: "/ova" },
              { title: "ONAs", href: "/ona" },
              { title: "Specials", href: "/special" },
              { title: "Events", href: "/events" },
            ].map((link) => (
              <li
                key={link.title}
                className="nav-item block w-full border-b border-white/5 relative"
              >
                <Link
                  href={link.href}
                  className="nav-link block p-4 font-semibold hover:text-accent transition-colors"
                >
                  {link.title}
                </Link>
              </li>
            ))}

            {/* Genre Submenu */}
            <li className="nav-item block w-full border-b border-white/5 relative p-4">
              <div className="font-bold mb-2 text-white">Genre</div>
              <ul className="nav color-list sub-menu clearfix block">
                {["Action", "Adventure", "Comedy", "Drama", "Fantasy"].map(
                  (genre, index) => (
                    <li
                      key={genre}
                      className="nav-item inline-block w-[49%] mr-[1%] mb-2"
                    >
                      <Link
                        href={`/genre/${genre.toLowerCase()}`}
                        className={`nav-link block text-xs py-1.5 px-3 border-l-2 hover:text-accent pl-2`}
                        style={{
                          borderColor: [
                            "#86e3ce",
                            "#d0e6a5",
                            "#ffbade",
                            "#fc887b",
                            "#ccabda",
                          ][index],
                        }}
                      >
                        {genre}
                      </Link>
                    </li>
                  )
                )}
                <li className="nav-item inline-block w-[49%] mr-[1%] mb-2">
                  <span className="nav-link cursor-pointer text-xs py-1.5 px-3 hover:text-accent">
                    <i className="fas fa-plus mr-2"></i>More
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Header */}
      <div
        id="header"
        className="fixed top-0 left-0 right-0 h-[70px] z-[102] bg-dark/80 backdrop-blur-md transition-all"
      >
        <div className="container mx-auto px-4 max-w-container relative h-full flex items-center">
          {/* Mobile Menu Toggle */}
          <div
            id="mobile_menu"
            onClick={toggleSidebar}
            className="text-white cursor-pointer absolute top-4 left-2 w-10 h-10 text-center z-[4] md:hidden block"
          >
            <i className="fa fa-bars text-2xl leading-10"></i>
          </div>

          {/* Logo */}
          <Link href="/" id="logo" className="block h-10 ml-12 md:ml-0 mr-6">
            <img
              src="./images/logo.png?v=0.1"
              alt="HiAnime"
              className="h-full w-auto"
            />
          </Link>

          {/* Search Bar */}
          <div
            id="search"
            className="hidden md:block w-[400px] mr-auto relative group"
          >
            <div className="search-content relative">
              <form action="/search">
                <a
                  href="/filter"
                  className="filter-icon absolute right-2 top-2 h-[26px] leading-[26px] bg-black text-white text-xs px-2 rounded hover:bg-accent hover:text-black transition-colors z-[3]"
                >
                  Filter
                </a>
                <input
                  type="text"
                  className="form-control search-input h-10 w-full text-black pl-4 pr-[100px] text-sm bg-white border-none shadow-sm focus:shadow-lg transition-shadow outline-none"
                  name="keyword"
                  placeholder="Search anime..."
                  required
                />
                <button
                  type="submit"
                  className="search-icon absolute right-12 top-0 w-10 h-10 bg-transparent border-none text-black text-center leading-10 hover:text-accent"
                >
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
          </div>

          {/* Header Socials (Desktop) */}
          <div className="header-group hidden lg:flex h-10 items-center ml-4">
            <div className="anw-group flex items-center">
              <div className="zrg-title flex flex-col justify-center items-center mr-2 text-sm">
                <span className="text-white/50 text-xs">Join now</span>
              </div>
              <div className="zrg-list flex">
                <SocialButton
                  href="https://discord.gg/hianime"
                  color="bg-discord"
                  icon="fab fa-discord"
                />
                <SocialButton
                  href="https://tinyurl.com/2y2yy3ba"
                  color="bg-telegram"
                  icon="fab fa-telegram-plane"
                />
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="header-setting ml-4 h-[70px] flex items-center">
            <div className="hs-toggles flex gap-4">
              <Link
                href="/watch2gether"
                className="hst-item flex flex-col items-center justify-center gap-1 min-w-[50px] group"
              >
                <div className="hst-icon h-5 overflow-hidden">
                  <i className="fas fa-broadcast-tower text-xl text-accent"></i>
                </div>
                <span className="text-xs group-hover:text-accent">
                  Watch2gether
                </span>
              </Link>
              <Link
                href="/random"
                className="hst-item flex flex-col items-center justify-center gap-1 min-w-[50px] group"
              >
                <div className="hst-icon h-5 overflow-hidden">
                  <i className="fas fa-random text-xl text-accent"></i>
                </div>
                <span className="text-xs group-hover:text-accent">Random</span>
              </Link>
              <Link
                href="/community/board"
                className="hst-item flex flex-col items-center justify-center gap-1 min-w-[50px] group"
              >
                <div className="hst-icon h-5 overflow-hidden">
                  <i className="fas fa-comments text-xl text-accent"></i>
                </div>
                <span className="text-xs group-hover:text-accent">
                  Community
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
