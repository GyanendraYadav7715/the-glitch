"use client";

import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa"; // Assuming you use react-icons for the font-awesome icon

const FilterComponent = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Example handler for inputs
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle filter logic here
  };

  return (
    <div id="filter-block" className="my-5 mx-auto max-w-[1300px]">
      {/* Toggle Button for Mobile/Collapsed State */}
      <div className={`text-center ${isExpanded ? "hidden" : "block"}`}>
        <button
          id="toggle-filter"
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn btn-sm btn-secondary rounded-full bg-[#3a3951] text-white border-[#3a3951] hover:bg-[#403f59] px-4 py-2 text-sm font-normal flex items-center justify-center mx-auto"
        >
          <FaPlusCircle className="mr-2" />
          Advanced search
        </button>
      </div>

      {/* Main Filter Container */}
      <div
        id="cate-filter"
        className={`category_filter bg-white/10 p-8 rounded-2xl ${
          isExpanded ? "block" : "hidden"
        }`}
      >
        <div className="category_filter-content">
          <form method="get" id="filter-form" onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="keyword"
              value="Demon Slayer: Mt. Natagumo Arc"
            />

            {/* --- Select Filters Section --- */}
            <div className="cfc-min-block relative mb-4 overflow-hidden">
              <div className="ni-head mb-3 font-medium text-white block">
                <strong>Filter</strong>
              </div>

              {/* Helper component for Select Item to keep code clean */}
              <FilterSelect label="Type" name="type">
                <option value="">All</option>
                <option value="1">Movie</option>
                <option value="2">TV</option>
                <option value="3">OVA</option>
                <option value="4">ONA</option>
                <option value="5">Special</option>
                <option value="6">Music</option>
              </FilterSelect>

              <FilterSelect label="Status" name="status">
                <option value="">All</option>
                <option value="1">Finished Airing</option>
                <option value="2">Currently Airing</option>
                <option value="3">Not yet aired</option>
              </FilterSelect>

              <FilterSelect label="Rated" name="rated">
                <option value="">All</option>
                <option value="1">G</option>
                <option value="2">PG</option>
                <option value="3">PG-13</option>
                <option value="4">R</option>
                <option value="5">R+</option>
                <option value="6">Rx</option>
              </FilterSelect>

              <FilterSelect label="Score" name="score">
                <option value="">All</option>
                <option value="1">(1) Appalling</option>
                <option value="2">(2) Horrible</option>
                <option value="3">(3) Very Bad</option>
                <option value="4">(4) Bad</option>
                <option value="5">(5) Average</option>
                <option value="6">(6) Fine</option>
                <option value="7">(7) Good</option>
                <option value="8">(8) Very Good</option>
                <option value="9">(9) Great</option>
                <option value="10">(10) Masterpiece</option>
              </FilterSelect>

              <FilterSelect label="Season" name="season">
                <option value="">All</option>
                <option value="1">Spring</option>
                <option value="2">Summer</option>
                <option value="3">Fall</option>
                <option value="4">Winter</option>
              </FilterSelect>

              <FilterSelect label="Language" name="language">
                <option value="">All</option>
                <option value="1">SUB</option>
                <option value="2">DUB</option>
                <option value="3">SUB & DUB</option>
              </FilterSelect>

              <div className="clearfix clear-both"></div>
            </div>

            {/* --- Date Filters Section --- */}
            <div className="cfc-min-block cfc-min-block-date relative mb-4 overflow-hidden">
              {/* Start Date */}
              <div className="cmb-item cmb-date float-left mr-2.5 mb-2.5 border border-[#575a64] rounded-md px-2.5 py-1 flex items-center">
                <div className="ni-head mr-2 font-medium text-xs text-white min-w-[65px]">
                  Start Date
                </div>
                <div className="nl-item flex gap-1">
                  <DateSelect name="sy" placeholder="Year" />
                  <DateSelect name="sm" placeholder="Month" />
                  <DateSelect name="sd" placeholder="Day" />
                </div>
              </div>

              {/* End Date */}
              <div className="cmb-item cmb-date float-left mr-2.5 mb-2.5 border border-[#575a64] rounded-md px-2.5 py-1 flex items-center">
                <div className="ni-head mr-2 font-medium text-xs text-white min-w-[65px]">
                  End Date
                </div>
                <div className="nl-item flex gap-1">
                  <DateSelect name="ey" placeholder="Year" />
                  <DateSelect name="em" placeholder="Month" />
                  <DateSelect name="ed" placeholder="Day" />
                </div>
              </div>

              {/* Sort */}
              <FilterSelect label="Sort" name="sort">
                <option value="default">Default</option>
                <option value="recently_added">Recently Added</option>
                <option value="recently_updated">Recently Updated</option>
                <option value="score">Score</option>
                <option value="name_az">Name A-Z</option>
                <option value="released_date">Released Date</option>
                <option value="most_watched">Most Watched</option>
              </FilterSelect>

              <div className="clearfix clear-both"></div>
            </div>

            {/* --- Genre Section --- */}
            <div className="cfc-item cfc-item-large cfc-genre mb-10">
              <div className="ni-head font-medium block mb-2.5 text-white">
                Genre
              </div>
              <div className="ni-list">
                <input type="hidden" id="f-genre-ids" name="genres" value="" />
                {genres.map((genre) => (
                  <div
                    key={genre.id}
                    className="btn btn-sm btn-radius btn-filter-item f-genre-item float-left mr-1.5 mb-1.5 border border-[#4a4c55] text-[#ddd] hover:text-[#ffbade] hover:bg-[#373646] hover:border-[#ffbade] cursor-pointer px-2.5 py-2 text-xs rounded-md min-w-[50px] transition-colors"
                    data-id={genre.id}
                  >
                    {genre.name}
                  </div>
                ))}
                <div className="clearfix clear-both"></div>
              </div>
            </div>

            <div className="clearfix clear-both"></div>

            {/* --- Submit Button --- */}
            <div className="cfc-button mt-6">
              <button className="btn btn-primary bg-[#ffbade] text-black border-[#ffbade] hover:bg-[#ffbade] hover:opacity-90 px-4 py-2 rounded-lg font-medium text-base">
                <strong>Filter</strong>
              </button>
              <div className="clearfix clear-both"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/* --- Sub Components for Reusability --- */

const FilterSelect = ({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="cmb-item float-left mr-2.5 mb-2.5 border border-[#575a64] rounded-md px-2.5 py-1 flex items-center">
      <div className="ni-head font-medium mr-1 text-xs text-white leading-8">
        {label}
      </div>
      <div className="nl-item block h-8 relative">
        <div className="nli-select float-left">
          <select
            className="custom-select bg-[#373646] text-[#ffbade] border-none text-xs cursor-pointer max-w-[140px] h-8 px-1.5 rounded-none shadow-none focus:ring-0 focus:outline-none truncate"
            name={name}
          >
            {children}
          </select>
        </div>
      </div>
    </div>
  );
};

const DateSelect = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) => {
  // Simplified options logic for brevity
  return (
    <div className="nli-select float-left">
      <select
        className="custom-select bg-[#373646] text-[#ffbade] border-none text-xs cursor-pointer h-8 px-1.5 rounded-none shadow-none focus:ring-0 focus:outline-none"
        name={name}
      >
        <option value="">{placeholder}</option>
        {/* You would populate years/months/days dynamically here */}
        <option value="1">01</option>
        <option value="2">02</option>
        {/* ... etc */}
      </select>
    </div>
  );
};

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 3, name: "Cars" },
  { id: 4, name: "Comedy" },
  { id: 5, name: "Dementia" },
  { id: 6, name: "Demons" },
  { id: 8, name: "Drama" },
  { id: 9, name: "Ecchi" },
  { id: 10, name: "Fantasy" },
  { id: 11, name: "Game" },
  { id: 35, name: "Harem" },
  { id: 13, name: "Historical" },
  { id: 14, name: "Horror" },
  { id: 44, name: "Isekai" },
  { id: 43, name: "Josei" },
  { id: 15, name: "Kids" },
  { id: 16, name: "Magic" },
  { id: 17, name: "Martial Arts" },
  { id: 18, name: "Mecha" },
  { id: 38, name: "Military" },
  { id: 19, name: "Music" },
  { id: 7, name: "Mystery" },
  { id: 20, name: "Parody" },
  { id: 39, name: "Police" },
  { id: 40, name: "Psychological" },
  { id: 22, name: "Romance" },
  { id: 21, name: "Samurai" },
  { id: 23, name: "School" },
  { id: 24, name: "Sci-Fi" },
  { id: 42, name: "Seinen" },
  { id: 25, name: "Shoujo" },
  { id: 26, name: "Shoujo Ai" },
  { id: 27, name: "Shounen" },
  { id: 28, name: "Shounen Ai" },
  { id: 36, name: "Slice of Life" },
  { id: 29, name: "Space" },
  { id: 30, name: "Sports" },
  { id: 31, name: "Super Power" },
  { id: 37, name: "Supernatural" },
  { id: 41, name: "Thriller" },
  { id: 32, name: "Vampire" },
];

export default FilterComponent;
