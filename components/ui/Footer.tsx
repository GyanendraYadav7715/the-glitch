import Link from "next/link";
import {
  Send,
  MessageSquare,
  Twitter,
  ArrowBigUpDash,
} from "lucide-react";


export default function Footer() {
  return (
    <div
      id="footer"
      className="relative w-full text-white font-poppins text-[14px] bg-[#201f31] pt-28"
    >
      <div id="footer-about" className="py-8 bg-dark">
        <div className="container mx-auto px-4 max-w-container relative z-[3]">
          {/* Top Section: Logo & Socials */}
          <div className="footer-top mb-6 pb-6 border-b border-white/10 flex flex-col md:flex-row items-center justify-start">
            <Link href="/home" className="footer-logo block mr-8 mb-4 md:mb-0">
              <img src="./logo.png" alt="HiAnime" className="h-10 w-auto" />
            </Link>

            <div className="footer-joingroup flex items-center">
              <div className="anw-group flex items-center pl-8 border-l border-white/15 text-[0.9em]">
                <div className="zrg-list flex items-center h-10 gap-1">
                  <SocialIcon
                    icon={<MessageSquare size={18} />}
                    bg="bg-[#5865F2]"
                    href="#"
                  />
                  <SocialIcon
                    icon={<Send size={18} />}
                    bg="bg-[#0088cc]"
                    href="#"
                  />
                  <SocialIcon
                    icon={<ArrowBigUpDash size={18} />}
                    bg="bg-[#ff4500]"
                    href="#"
                  />
                  <SocialIcon
                    icon={<Twitter size={18} />}
                    bg="bg-[#1da1f2]"
                    href="#"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* A-Z List */}
          <div className="footer-az mb-4">
            <div className="block mb-3">
              <span className="ftaz inline-block pr-5 mr-5 border-r border-white/30 leading-none text-xl font-semibold">
                A-Z LIST
              </span>
              <span className="size-s text-sm opacity-80">
                Searching anime order by alphabet name A to Z.
              </span>
            </div>
            <ul className="ulclear az-list flex flex-wrap -m-1 list-none p-0">
              {[
                "All",
                "#",
                "0-9",
                ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
              ].map((char) => (
                <li key={char} className="m-1">
                  <Link
                    href={`/az-list/${char === "All" ? "all" : char}`}
                    className="block px-2.5 py-1.5 bg-white/10 rounded hover:bg-accent hover:bg-[#ff8fbe] hover:shadow-xl hover:shadow-[#FFB6D9]/10 font-semibold text-[1.1em] transition-colors"
                  >
                    {char}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links & Copyright */}
          <div className="footer-links mb-2.5">
            <ul className="ulclear flex flex-wrap list-none p-0">
              {["Terms of service", "DMCA", "Contact"].map((item) => (
                <li key={item} className="mr-10 float-left">
                  <Link
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="leading-[30px] text-[0.9em] hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-text mx-auto mb-1.5 opacity-50 text-[0.9em] leading-[1.4em]">
            死iAnime does not store any files on our server, we only linked to
            the media which is hosted on 3rd party services.
          </div>
          <p className="copyright mb-0 opacity-50">
            © 死iAnime.to. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Social Buttons
const SocialIcon = ({
  icon,
  bg,
  href,
}: {
  icon: React.ReactNode;
  bg: string;
  href: string;
}) => (
  <Link
    href={href}
    className={`${bg} text-white p-2 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center`}
  >
    {icon}
  </Link>
);
