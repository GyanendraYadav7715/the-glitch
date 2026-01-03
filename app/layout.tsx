import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.variable}>
        <div id="sidebar_menu_bg"></div>
        {children}
      </body>
    </html>
  );
}
