"use client";
import { useState, useEffect, Suspense, useMemo } from "react";
import { useQueryState } from "nuqs";

import Table from "@/components/Table";
import getLeaderboardData from "@/helpers/getLeaderboardData";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";

const Styles = {
  buttons: {
    active: "bg-[#3598dc] text-[#e7ecf1] dark:bg-[#2283c3] text-lg px-3 py-2 rounded-md transition duration-100 ease-in-out",
    inactive: "hover:bg-[#e4f0f8] dark:hover:bg-gray-800/50 text-[#3598dc] dark:text-[#52a7e0] text-lg px-3 py-2 rounded-md transition duration-100 ease-in-out ring-2 ring-[#e4f0f8] dark:ring-gray-800/50",
  },
};

function HomeContent({ props }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false); // New flag to prevent mismatch

  const [selected, setSelected] = useQueryState("q", {
    defaultValue: "fastest",
    shallow: true
  });

  // 1. First effect: Sync with localStorage immediately after mount
  useEffect(() => {
    setIsHydrated(true);
    const saved = localStorage.getItem("LeaderboardData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
        setLoading(false); // Stop loading immediately if cache exists
      } catch (e) {
        console.warn("Cache parse error");
      }
    }
  }, []);

  // 2. Second effect: Background fetch and update logic
  useEffect(() => {
    if (!isHydrated) return;

    const fetchLeaderboardData = async () => {
      try {
        // Only show spinner if we don't have cached data yet
        if (!data) setLoading(true);

        const initialData = await getLeaderboardData((freshData) => {
          if (freshData) setData(freshData);
        });

        if (initialData) setData(initialData);
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        if (!data) setError(`Could not fetch the data: ${String(err)}`);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboardData();
  }, [isHydrated]); // Depends on hydration status

  useKeyboardShortcut(useMemo(() => [
    { key: "f", action: () => setSelected("fastest"), runOnInput: false },
    { key: "l", action: () => setSelected("lightest"), runOnInput: false },
    { key: "s", action: () => setSelected("shortest"), runOnInput: false },
    { key: "ctrl+.", action: () => console.log("Secret shortcut!"), runOnInput: true }
  ], [setSelected]));

  // Prevent rendering anything that relies on localStorage until hydrated
  if (!isHydrated || (loading && !data)) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-5 text-4xl font-semibold tracking-wider md:text-6xl">
        <span className="loader h-9 w-9 border-[5px] border-blue-500/80 md:h-12 md:w-12"></span>
        <span className="opacity-95">Loading...</span>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-5 text-sm font-semibold tracking-wider md:text-xl">
        <pre className="font-mono">{error}</pre>
      </div>
    );
  }

  return (
    <div className="mt-20 md:mt-24">
      <div className="mx-auto -mt-5 w-fit">
        <p className="mx-5 text-balance rounded-md bg-blue-100 p-2 text-center text-sm tracking-wide text-blue-900 md:p-4 dark:bg-blue-950 dark:text-blue-200">
          This project is not maintained for a long time. Data might be outdated.
        </p>
      </div>

      <div className="mx-1 mb-5 mt-4 flex gap-3 md:mx-5">
        {["fastest", "lightest", "shortest"].map((type) => (
          <button
            key={type}
            type="button"
            className={selected === type ? Styles.buttons.active : Styles.buttons.inactive}
            onClick={() => setSelected(type)}
          >
            {type.capitalize()}
          </button>
        ))}
      </div>

      <Table props={{ data, selected }} />
    </div>
  );
}

const Home = ({ props }) => {
  return (
    <Suspense fallback={<div className="min-h-screen"></div>}>
      <HomeContent props={props} />
    </Suspense>
  );
};

export default Home;
