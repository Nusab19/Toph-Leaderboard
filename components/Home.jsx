"use client";
import { useState, useEffect, Suspense } from "react";
import { useQueryState } from "nuqs";

import Table from "@/components/Table";
import getLeaderboardData from "@/helpers/getLeaderboardData";

const Styles = {
  buttons: {
    active:
      "bg-[#3598dc] text-[#e7ecf1] dark:bg-[#2283c3] text-lg px-3 py-2 rounded-md transition duration-100 ease-in-out",
    inactive:
      "hover:bg-[#e4f0f8] dark:hover:bg-gray-800/50 text-[#3598dc] dark:text-[#52a7e0] text-lg px-3 py-2 rounded-md transition duration-100 ease-in-out ring-2 ring-[#e4f0f8] dark:ring-gray-800/50",
  },
};

function HomeContent({ props }) {
  const [data, setData] = useState(null);
  // Initialize state based on the default value of the query parameter
  const [selected, setSelected] = useState("fastest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const classes = [Styles.buttons.active, Styles.buttons.inactive];

  const [query, setQuery] = useQueryState("q", { defaultValue: "fastest" });

  // 1. Data Fetching Effect (No change needed here)
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        const leaderboardData = await getLeaderboardData();
        setData(leaderboardData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        setError(`Could not fetch the data: ${String(err)}`);
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  // 2. Query to State Effect (Kept to handle initial load and back/forward navigation)
  useEffect(() => {
    // Only update local state if the query value is different from the current selected state
    if (query && query !== selected) {
      setSelected(query);
    }
  }, [query, selected]);

  // 3. REMOVED the useEffect that was: useEffect(() => { setQuery(selected); }, [selected]);
  // This was the source of the infinite loop.

  // New handler function to update both local state and URL query
  const handleSelect = (value) => {
    setSelected(value); // Update local state
    setQuery(value);    // Update URL query (This replaces the removed useEffect)
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-5 text-4xl font-semibold tracking-wider md:text-6xl">
        <span className="loader h-9 w-9 border-[5px] border-blue-500/80 md:h-12 md:w-12"></span>
        <span className="opacity-95">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-5 text-sm font-semibold tracking-wider md:text-xl">
        <pre className="font-mono">{error}</pre>
      </div>
    );
  }

  return (
    <div className="mt-20 md:mt-24">
      <div className="mx-auto -mt-5 w-fit">
        <p className="mx-5 text-balance rounded-md bg-blue-100 p-2 text-center text-sm text-xs tracking-wide text-blue-900 md:p-4 md:text-sm dark:bg-blue-950 dark:text-blue-200">
          This project is not maintained for a long time. Data might be
          outdated.
        </p>
      </div>
      <div className="mx-1 mb-5 mt-4 flex gap-3 md:mx-5">
        <button
          type="button"
          className={classes[selected === "fastest" ? 0 : 1]}
          onClick={() => handleSelect("fastest")} // Use consolidated handler
        >
          Fastest
        </button>
        <button
          type="button"
          className={classes[selected === "lightest" ? 0 : 1]}
          onClick={() => handleSelect("lightest")} // Use consolidated handler
        >
          Lightest
        </button>
        <button
          type="button"
          className={classes[selected === "shortest" ? 0 : 1]}
          onClick={() => handleSelect("shortest")} // Use consolidated handler
        >
          Shortest
        </button>
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
