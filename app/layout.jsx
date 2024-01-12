export const runtime = "edge";

import "./globals.css";
import { Ubuntu } from "next/font/google";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

const inter = Ubuntu({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Toph Leaderboard",
  description:
    "Toph Leaderboard is a website showcasing the users with the most Fastest, Lightest & Shortest code submissions in toph.co online judge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toph.pages.dev/" />
        <meta property="og:image" content="/logo.svg" />
        <meta property="og:image:type" content="image/svg+xml" />
        <meta property="og:image:alt" content={metadata.title} />
      </head>
      <body
        className={`${inter.className} bg-[#f8fafc] text-[#2f353b] dark:bg-gray-900 dark:text-gray-100`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
