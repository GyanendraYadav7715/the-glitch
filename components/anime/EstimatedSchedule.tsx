import React from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface ScheduleItem {
  time: string;
  title: string;
  episode: number;
}

const scheduleData: ScheduleItem[] = [
  { time: "01:15", title: "Theatre of Darkness: Yamishibai 16", episode: 1 },
  {
    time: "16:30",
    title: "Fist of the North Star: Elegy of Ken-Oh's Army Grunts",
    episode: 2,
  },
  { time: "19:00", title: "Wash It All Away", episode: 2 },
  { time: "19:30", title: "My Hero Academia: Vigilantes Season 2", episode: 2 },
  { time: "20:00", title: "Golden Kamuy Final Season", episode: 2 },
  {
    time: "20:00",
    title: '\'Tis Time for "Torture," Princess Season 2',
    episode: 1,
  },
  {
    time: "21:00",
    title: "You Can't Be In a Rom-Com with Your Childhood Friends!",
    episode: 2,
  },
];

const days = [
  { day: "Mon", date: "Jan 12", active: true },
  { day: "Tue", date: "Jan 13", active: false },
  { day: "Wed", date: "Jan 14", active: false },
  { day: "Thu", date: "Jan 15", active: false },
  { day: "Fri", date: "Jan 16", active: false },
  { day: "Sat", date: "Jan 17", active: false },
  { day: "Sun", date: "Jan 18", active: false },
];

const EstimatedSchedule = () => {
  return (
    <section className="  text-white p-6 rounded-xl font-poppins mt-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-[#ff8eb2]">
          Estimated Schedule
        </h2>
        <div className="bg-[#2b2a3c] px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 border border-slate-700">
          (GMT+05:30) 12/01/2026 06:10:59 PM
        </div>
      </div>

      {/* Date Selector */}
      <div className="relative flex items-center mb-8">
        <button className="absolute -left-3 z-10 bg-white text-black p-1 rounded-full shadow-lg hover:bg-slate-200 transition">
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 w-full">
          {days.map((item, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 w-28 py-3 rounded-lg flex flex-col items-center cursor-pointer transition-all duration-300 ${
                item.active
                  ? "bg-[#ff8eb2] text-black"
                  : "bg-[#2b2a3c] text-slate-400 hover:bg-[#2a2e42]"
              }`}
            >
              <span className="text-sm font-bold uppercase">{item.day}</span>
              <span className="text-xs">{item.date}</span>
            </div>
          ))}
        </div>

        <button className="absolute -right-3 z-10 bg-white text-black p-1 rounded-full shadow-lg hover:bg-slate-200 transition">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Schedule List */}
      <div className="space-y-1">
        {scheduleData.map((item, index) => (
          <div
            key={index}
            className="group flex items-center justify-between p-4 rounded-lg hover:bg-[#1e212f] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-6">
              <span className="text-slate-500 font-bold min-w-[50px]">
                {item.time}
              </span>
              <h3 className="text-sm md:text-base font-semibold text-slate-200 group-hover:text-white transition-colors line-clamp-1">
                {item.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-slate-400 group-hover:text-[#ff8eb2] transition-colors whitespace-nowrap ml-4">
              <Play size={14} fill="currentColor" />
              <span className="text-sm font-medium">
                Episode {item.episode}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button className="mt-6 text-slate-300 font-bold hover:text-white transition-colors text-sm px-4">
        Show more
      </button>
    </section>
  );
};

export default EstimatedSchedule;
