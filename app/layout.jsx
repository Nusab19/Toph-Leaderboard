import { ThemeProvider } from "../components/sub/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";
import { Ubuntu } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Ubuntu({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Toph Leaderboard",
  metataBase: new URL("https://toph.pages.dev/"),
  description:
    "Toph Leaderboard is a website showcasing the users with the most Fastest, Lightest & Shortest code submissions in toph.co online judge",
  keywords:
    "toph, toph.co, toph leaderboard, toph fastest, toph lightest, toph shortest, toph user profile, toph user, nusab taha, nusab19, nusab toph",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toph.pages.dev/" />
        <meta property="og:image:alt" content={metadata.title} />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />

        <meta
          name="google-site-verification"
          content="WPPXho-ehsTzL41OYAECiVP8ilWMxfxjHtHwQUsu1FU"
        />
      </head>
      <body
        className={`${inter.className} bg-[#f8fafc] text-[#2f353b] dark:bg-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <NuqsAdapter>{children}</NuqsAdapter>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
