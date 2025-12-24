"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { register } from 'swiper/element/bundle';
import { Play, Clock, Calendar, ChevronRight } from 'lucide-react';

// Mock config - replace with your actual config import
const config = {
  siteRoutes: {
    watch: '/watch/',
    detail: '/detail/'
  }
};

const spotLight = [
    {
        "title": "One-Punch Man Season 3",
        "alternativeTitle": "One Punch Man 3",
        "id": "one-punch-man-season-3-19932",
        "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/2f47e2d725857103471c84591c26ef2b.jpg",
        "rank": 1,
        "type": "TV",
        "quality": "HD",
        "duration": "24m",
        "aired": "Oct 12, 2025",
        "synopsis": "The third season of One Punch Man.\n\nSaitama is a hero who only became a hero for fun. After three years of \"special training,\" he’s become so strong that he's practically invincible. In fact, he's too strong—even his mightiest opponents are taken out with a single punch. Alongside Genos, his faithful disciple, Saitama performs his official hero duties as a member of the Hero Association.\n\nOne day, monsters claiming to be from the Monster Association suddenly appeared, taking a child of Hero Association executive hostage. The S-class heroes gather and plan a raid on the Monster Association hideout to rescue the hostage. Meanwhile, Garou, a \"human monster\" who was taken by the Monster Association during a battle with the heroes, awakens in the Monster Association hideout.",
        "episodes": {
            "sub": 10,
            "dub": 3,
            "eps": 10
        }
    },
    {
        "title": "A Wild Last Boss Appeared!",
        "alternativeTitle": "Yasei no Last Boss ga Arawareta!",
        "id": "a-wild-last-boss-appeared-19909",
        "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/dabd71c694f52722fd0bce176c4eff64.jpg",
        "rank": 2,
        "type": "TV",
        "quality": "HD",
        "duration": "24m",
        "aired": "Oct 4, 2025",
        "synopsis": "Lufas Maphaahl, the black-winged overlord and leader of the Twelves Stars of Heaven, has been vanquished.\n\nA man wakes up in the body of the Exgate game character Lufas, two hundred years after her defeat at the hands of the seven heroes. The game world of Exgate he knew is no longer ruled by humans—and it is no longer just a game. Exgate is a world of its own where the characters think, feel, and live just like he does. Lufas journeys through Exgate, looking for the long-disbanded Twelve Stars of Heaven.\n\nLufas is without country, army, or allies. A question remains: what is the real reason an ordinary man was reincarnated into Exgate as Lufas?",
        "episodes": {
            "sub": 12,
            "dub": 0,
            "eps": 12
        }
    },
    {
        "title": "My Hero Academia Final Season",
        "alternativeTitle": "Boku no Hero Academia: Final Season",
        "id": "my-hero-academia-final-season-19930",
        "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/4f4966ce74cde6a1297f0470cc657018.jpg",
        "rank": 3,
        "type": "TV",
        "quality": "HD",
        "duration": "24m",
        "aired": "Oct 4, 2025",
        "synopsis": "The appearance of \"quirks,\" newly discovered super powers, has been steadily increasing over the years, with 80 percent of humanity possessing various abilities from manipulation of elements to shapeshifting. This leaves the remainder of the world completely powerless, and Izuku Midoriya is one such individual.\n\nSince he was a child, the ambitious middle schooler has wanted nothing more than to be a hero. Izuku's unfair fate leaves him admiring heroes and taking notes on them whenever he can. But it seems that his persistence has borne some fruit: Izuku meets the number one hero and his personal idol, All Might. All Might's quirk is a unique ability that can be inherited, and he has chosen Izuku to be his successor!\n\nEnduring many months of grueling training, Izuku enrolls in UA High, a prestigious high school famous for its excellent hero training program, and this year's freshmen look especially promising. With his bizarre but talented classmates and the looming threat of a villainous organization, Izuku will soon learn what it really means to be a hero.",
        "episodes": {
            "sub": 11,
            "dub": 9,
            "eps": 11
        }
    },
    {
        "title": "One Piece",
        "alternativeTitle": "One Piece",
        "id": "one-piece-100",
        "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/db8603d2f4fa78e1c42f6cf829030a18.jpg",
        "rank": 4,
        "type": "TV",
        "quality": "HD",
        "duration": "24m",
        "aired": "Oct 20, 1999",
        "synopsis": "Gold Roger was known as the \"Pirate King,\" the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\n\nEnter Monkey Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy's reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\n\n[Written by MAL Rewrite]",
        "episodes": {
            "sub": 1153,
            "dub": 1143,
            "eps": 1153
        }
    },
    {
        "title": "The Banished Court Magician Aims to Become the Strongest",
        "alternativeTitle": "Mikata ga Yowasugite Hojo Mahou ni Tesshiteita Kyuutei Mahoushi, Tsuihou sarete Saikyou wo Mezashimasu",
        "id": "the-banished-court-magician-aims-to-become-the-strongest-19902",
        "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/1aca3f6a2579fba9310e6765a6ee26c7.jpg",
        "rank": 5,
        "type": "TV",
        "quality": "HD",
        "duration": "24m",
        "aired": "Oct 4, 2025",
        "synopsis": "\"This party doesn't need an incompetent magician who can only use supportive magic. You're fired, Alec Ygret.\"  Suddenly, Alec, a court magician who had joined the crown prince's party to help him conquer dungeons—was banished from the party. And not just the party, but the crown prince's harassment has banished him from the royal palace as well, and a friend from the \"magic academy\" approached Alec, who was at his wit's end.  \"Hey, Alec. Do you want to try to conquer the dungeon with us again?\"  And so, together with the friends he used to party with, Alec begins his second journey in life. This is the adventure story of a former court magician who had been abandoned.  Four years ago, the \"Lasting Period,\" a party of four that had been called \"legendary,\" has gradually spread its name around the world.",
        "episodes": {
            "sub": 11,
            "dub": 9,
            "eps": 11
        }
    },
    {
        "title": "Campfire Cooking in Another World with My Absurd Skill Season 2",
        "alternativeTitle": "Tondemo Skill de Isekai Hourou Meshi 2",
        "id": "campfire-cooking-in-another-world-with-my-absurd-skill-season-2-19928",
        "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/897effd8d1c3438cc0396f653dc118dc.jpg",
        "rank": 6,
        "type": "TV",
        "quality": "HD",
        "duration": "24m",
        "aired": "Oct 8, 2025",
        "synopsis": "The second season of Tondemo Skill de Isekai Hourou Meshi.\n\nWhen a magical realm looks to summon heroes, they’re sorely disappointed to end up with a mediocre salaryman. Mukoda Tsuyoshi may not be a hero, but this conjuring error has given him a delicious power—Online Grocery. And something about this modern food brings with it unbelievable effects. This easy access paired with his cooking skills will have patrons from across the land coming back for more!",
        "episodes": {
            "sub": 10,
            "dub": 10,
            "eps": 10
        }
    },
    {
        "title": "My Status as an Assassin Obviously Exceeds the Hero's",
        "alternativeTitle": "Ansatsusha de Aru Ore no Status ga Yuusha yori mo Akiraka ni Tsuyoi no da ga",
        "id": "my-status-as-an-assassin-obviously-exceeds-the-heros-19922",
        "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/a95b402657d2c052ef51a04440af84c7.jpg",
        "rank": 7,
        "type": "TV",
        "quality": "HD",
        "duration": "24m",
        "aired": "Oct 7, 2025",
        "synopsis": "Oda Akira is the kind of guy who people forget is even there. His unassuming nature pays off, though, when his entire class is swept away to a fantasy world, and he slips easily into his new role as a silent assassin. Between his suspiciously high starting stats and too many details that don't fit, Akira is sure something is wrong. But digging into royal secrets is a dangerous game, and when Akira uncovers an evil scheme, he also makes a powerful enemy—the very king who brought him to this world! With the help of the elven spirit medium Amelia, can he find the power to set things right, and get his revenge?",
        "episodes": {
            "sub": 10,
            "dub": 10,
            "eps": 10
        }
    },
    {
        "title": "A Gatherer's Adventure in Isekai",
        "alternativeTitle": "Sozai Saishuka no Isekai Ryokouki",
        "id": "a-gatherers-adventure-in-isekai-19901",
        "poster": "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/cbebd7e7e61f157b6480aeba6f675621.jpg",
        "rank": 8,
        "type": "TV",
        "quality": "HD",
        "duration": "23m",
        "aired": "Oct 7, 2025",
        "synopsis": "Takeru Kamishiro is a normal guy with an ordinary office job but finds himself summoned to another world. Takeru starts his new life in \"Madeus,\" a world with swords and magic, fully equipped with multiple skills! Not only does he have enhanced physical and amazing magic abilities, but also the power to \"search\" for valuable items. With the cheat skills he's been provided, Takeru starts his new adventure in the new isekai!!",
        "episodes": {
            "sub": 11,
            "dub": 9,
            "eps": 12
        }
    }
];

interface SpotlightItem {
  id: string;
  rank: number;
  title: string;
  poster: string;
  type: string;
  duration: string;
  aired: string;
  quality: string;
  episodes: any;
  synopsis: string;
}

interface SpotlightProps {
  spotlight: SpotlightItem[];
}

export default function SpotlightSlider({ spotlight }: SpotlightProps) {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Swiper Web Component
    register();

    const params = {
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
      },
      injectStyles: [
        `.swiper-pagination-bullet { background: white; }`,
      ],
    };

    // Assign parameters to the swiper element
    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();
    }
  }, []);

  return (
    <section className="relative w-full">
      <swiper-container ref={swiperRef} init="false">
        {spotLight.map((item) => (
          <swiper-slide
            key={item.id}
            class="relative overflow-hidden bg-background h-[40vh] md:h-[50vh] xl:h-[calc(100vh-142px)]"
          >
            {/* Image Layer */}
            <div className="opacity-layer absolute left-0 md:left-[15%] xl:left-[30%] top-0 right-0 bottom-0 overflow-hidden">
              <Image
                fill
                src={item.poster}
                alt={item.title}
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Content Layer */}
            <div className="z-10 ml-2 md:ml-12 min-w-32 md:max-w-2xl absolute bottom-10">
              <h2 className="text-primary mb-2 text-yellow-400 font-bold">
                #{item.rank} Spotlight
              </h2>

              <h1 className="title text-lg md:text-2xl xl:text-5xl font-bold mb-6 text-white">
                {item.title}
              </h1>

              <ul className="text-base text-white mb-3 gap-5 hidden md:flex items-center">
                <li className="flex items-center gap-1">
                  <Play size={16} fill="currentColor" />
                  <span>{item.type}</span>
                </li>
                <li className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{item.duration}</span>
                </li>
                <li className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{item.aired}</span>
                </li>
                <li className="bg-yellow-400 text-black text-sm font-bold px-2 rounded-lg">
                  {item.quality}
                </li>
              </ul>

              <p className="synopsis text-gray-300">{item.synopsis}</p>

              <div className="z-50 text-sm md:text-base mt-5 flex gap-2">
                <Link href={`${config.siteRoutes.watch}${item.id}`}>
                  <button className="bg-yellow-400 rounded-3xl px-6 py-2 text-black flex justify-center items-center gap-2 font-semibold transition hover:bg-yellow-500">
                    <Play size={18} fill="black" />
                    <span>Watch Now</span>
                  </button>
                </Link>

                <Link href={`${config.siteRoutes.detail}${item.id}`}>
                  <button className="bg-gray-800 text-white rounded-3xl px-6 py-2 flex justify-center items-center gap-2 transition hover:bg-gray-700">
                    <span>Detail</span>
                    <ChevronRight size={18} />
                  </button>
                </Link>
              </div>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>

      <style jsx>{`
        .opacity-layer {
          mask-image: linear-gradient(
              to right,
              transparent 0,
              black 30%,
              black 70%,
              transparent
            ),
            linear-gradient(
              to bottom,
              transparent 0,
              black 30%,
              black 70%,
              transparent
            );
          mask-composite: intersect;
          -webkit-mask-image: linear-gradient(
              to right,
              transparent 0,
              black 30%,
              black 70%,
              transparent
            ),
            linear-gradient(
              to bottom,
              transparent 0,
              black 30%,
              black 70%,
              transparent
            );
          -webkit-mask-composite: source-in;
        }
        .synopsis {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 1299px) {
          .synopsis {
            -webkit-line-clamp: 2;
            line-clamp: 2;
          }
        }
        @media (max-width: 768px) {
          .synopsis {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}