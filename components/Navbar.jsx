"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import ModeToggle from "./sub/theme-toggle";

const Navbar = () => {
  const [extraClass, setExtraClass] = useState("");
  const [scrollY, setScrollY] = useState(0);
  // Hide Navbar on Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (scrollY > window.scrollY) {
        setExtraClass("");
      } else {
        setExtraClass("-translate-y-full");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <nav
      className={`fixed left-0 top-0 flex w-full items-center justify-between border-b-2 border-gray-300 bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 ${extraClass}`}
    >
      <Link href="/">
        <div className="mx-1 my-2 flex items-center justify-start gap-1.5 md:mx-5 md:gap-3">
          <Image
            priority
            className="md:h-12 md:w-12 h-9 w-9 cursor-pointer"
            href="/"
            src="/logo.svg"
            width={1}
            height={1}
            alt="Toph Leaderboard logo"
          />
          <span className="mt-2 text-xl font-black tracking-tighter md:text-3xl">
            Toph Leaderboard
          </span>
        </div>
      </Link>

      <ModeToggle />
    </nav>
  );
};

export default Navbar;
