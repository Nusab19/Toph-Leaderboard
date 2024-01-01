"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [theme, setTheme] = useState(null);

  // Do NOT even think about touching this useEffect hook. It's a mess. 
  useEffect(() => {
    function changeTheme(newTheme) {
      const bodyTheme = document.documentElement.classList;
      if (newTheme === "light") {
        bodyTheme.remove("dark");
        return;
      }

      bodyTheme.add("dark");
    }
    if (theme === null) {
      const localPreference = localStorage.getItem("theme");
      const userPreference = window.matchMedia("(prefers-color-scheme: dark)");

      if (localPreference) {
        setTheme(localPreference);
        changeTheme(localPreference);
        return;
      }

      if (userPreference.matches) {
        setTheme("dark");
        return;
      }

      setTheme("light");
      changeTheme("light");
      return;
    }

    changeTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  return (
    <nav className="fixed left-0 top-0 flex w-full items-center justify-between border-b-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
      <Link href="/">
        <div className="mx-5 my-2 flex items-center justify-start gap-3">
          <Image
            href="/"
            src={"/logo.svg"}
            width={50}
            height={50}
            alt="Toph Leaderboard logo"
          />
          <span className="mt-2 text-lg font-bold md:text-3xl">
            Toph Leaderboard
          </span>
        </div>
      </Link>

      <Image
        src={`/images/${theme === "light" ? "moon" : "sun"}.svg`}
        width={30}
        height={30}
        alt="Toggle between light and dark theme"
        className="mr-5 cursor-pointer"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </nav>
  );
};

export default Navbar;
