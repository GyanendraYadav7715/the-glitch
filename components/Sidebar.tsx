import Link from "next/link";
import { useState } from "react";

const Sidebar = ({
  isOpen,
  closeMenu,
}: {
  isOpen: boolean;
  closeMenu: () => void;
}) => {
  const genres = [
    "Action",
    "Adventure",
    "Cars",
    "Comedy",
    "Dementia",
    "Demons",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Game",
    "Harem",
    "Historical",
    "Horror",
    "Isekai",
    "Josei",
    "Kids",
    "Magic",
    "Mecha",
    "Military",
    "Music",
    "Mystery",
    "Parody",
    "Police",
    "Psychological",
    "Romance",
    "Samurai",
    "School",
    "Sci-Fi",
    "Seinen",
    "Shoujo",
    "Shounen",
    "Slice of Life",
    "Space",
    "Sports",
    "Super Power",
    "Supernatural",
    "Thriller",
    "Vampire",
  ];

  return (
    <>
      <div
        id="sidebar_menu_bg"
        className={isOpen ? "active" : ""}
        onClick={closeMenu}
      ></div>
      <div id="sidebar_menu" className={isOpen ? "active" : ""}>
        <button
          className="btn btn-radius btn-sm btn-secondary toggle-sidebar"
          onClick={closeMenu}
        >
          <i className="fas fa-angle-left mr-2"></i>Close menu
        </button>

        <div className="sb-setting">
          {/* Add setting toggles here if needed */}
        </div>

        <div className="sb-donate">
          <div className="hr-community">
            <Link href="/community" className="btn btn-sm">
              <i className="fas fa-comments mr-2"></i>Community
            </Link>
          </div>
        </div>

        <ul className="nav sidebar_menu-list">
          <li className="nav-item active">
            <Link href="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/subbed-anime" className="nav-link">
              Subbed Anime
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/dubbed-anime" className="nav-link">
              Dubbed Anime
            </Link>
          </li>

          <li className="nav-item">
            <div className="nav-link">
              <strong>Genre</strong>
            </div>
            <div className="sidebar_menu-sub show" id="sidebar_subs_genre">
              <ul className="nav color-list sub-menu">
                {genres.map((genre) => (
                  <li className="nav-item" key={genre}>
                    <Link
                      href={`/genre/${genre.toLowerCase()}`}
                      className="nav-link"
                    >
                      {genre}
                    </Link>
                  </li>
                ))}
                <li className="nav-item nav-more">
                  <Link href="/genre" className="nav-link">
                    <i className="fas fa-plus mr-2"></i>More
                  </Link>
                </li>
              </ul>
              <div className="clearfix"></div>
            </div>
          </li>
        </ul>
        <div className="clearfix"></div>
      </div>
    </>
  );
};

export default Sidebar;
