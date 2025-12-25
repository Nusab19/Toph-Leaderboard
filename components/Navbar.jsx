"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ModeToggle from "./sub/theme-toggle";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const accumulatedScroll = useRef(0);
  const scrollThreshold = 50; // Minimum scroll distance before toggling

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Reset to visible at the very top regardless of threshold
      if (currentScrollY <= 10) {
        setIsVisible(true);
        accumulatedScroll.current = 0;
      } else {
        // If direction changed, reset accumulated scroll
        if ((delta > 0 && accumulatedScroll.current < 0) || (delta < 0 && accumulatedScroll.current > 0)) {
          accumulatedScroll.current = 0;
        }

        accumulatedScroll.current += delta;

        // Hide if scrolled down past threshold
        if (accumulatedScroll.current > scrollThreshold && isVisible) {
          setIsVisible(false);
          accumulatedScroll.current = 0;
        }
        // Show if scrolled up past threshold
        else if (accumulatedScroll.current < -scrollThreshold && !isVisible) {
          setIsVisible(true);
          accumulatedScroll.current = 0;
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-md transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900/80 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Link href="/" className="group flex items-center">
        <div className="mx-2 my-2 flex items-center justify-start gap-2 md:mx-5 md:gap-3">
          <Image
            priority
            className="h-9 w-9 md:h-12 md:w-12 transition-transform group-hover:scale-105"
            src="/logo.svg"
            width={48}
            height={48}
            alt="Toph Leaderboard logo"
          />
          <span className="mt-1 text-xl font-black tracking-tighter md:text-3xl text-gray-900 dark:text-white">
            Toph Leaderboard
          </span>
        </div>
      </Link>

      <div className="mr-2 md:mr-5">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
