"use client";

import { useState, useEffect } from "react";

const Notice = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide if scrolled more than 20px, show if at the very top
      if (window.scrollY > 20) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 hidden md:flex items-center transition-all duration-300 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-gray-500 shadow-sm backdrop-blur-md border border-gray-200 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-400">
        <span>Press</span>
        <kbd className="flex h-5 min-w-[20px] items-center justify-center rounded border border-gray-300 bg-gray-50 px-1.5 text-[10px] font-bold text-gray-900 shadow-[0_1.5px_0_rgba(0,0,0,0.1)] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:shadow-[0_1.5px_0_rgba(255,255,255,0.05)]">
          /
        </kbd>
        <span>for shortcuts</span>
      </div>
    </div>
  );
};

export default Notice;
