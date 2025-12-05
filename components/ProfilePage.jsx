"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

import Link from "next/link";

import ProfileBody from "@/components/ProfileBody";
import icons from "@/helpers/icons";

const Styles = {
  buttons: {
    active:
      "bg-[#3598dc] text-[#e7ecf1] dark:bg-[#2283c3] text-lg px-3 py-2 rounded-md transition duration-100 ease-in-out",
    inactive:
      "hover:bg-[#e4f0f8] dark:hover:bg-gray-800/50 text-[#3598dc] dark:text-[#52a7e0] text-lg px-3 py-2 rounded-md transition duration-100 ease-in-out ring-2 ring-[#e4f0f8] dark:ring-gray-800/50",
  },
};

function ProfilePageContent({ props }) {
  const [data, setData] = useState(props.data);
  // Keep selected state local for immediate UI updates
  const [selected, setSelected] = useState(props.selected);
  const [userName, setUserName] = useState(props.userName);
  const classes = [Styles.buttons.active, Styles.buttons.inactive];
  document.title = `${userName}'s Profile - Toph Leaderboard`;

  // Use this to read the 'q' query parameter
  const [query, setQuery] = useQueryState("q", { defaultValue: "fastest" });

  // 1. **Keep this useEffect:** This ensures the local 'selected' state
  //    is updated when the URL query 'q' changes (e.g., from a back/forward button).
  useEffect(() => {
    // We only need to check if query is different from selected to prevent state update on every render
    if (query && query !== selected) {
      setSelected(query);
    }
  }, [query]); // Removed 'userName' as it's not needed here

  // 2. **Removed the recursive useEffect:**
  // The 'useEffect' that called `setQuery(selected)` is what caused the loop.
  // We will now update both state AND query in the button handlers.

  const handleSelect = (value) => {
    setSelected(value); // Update local state for immediate UI/component prop change
    setQuery(value); // Update URL query parameter
  };

  return (
    <div className="mt-24">
      {/* <Link
        href={`/?q=${selected}`}
        className="mx-1 flex w-fit items-center gap-2 rounded-md bg-[#3598dc] px-4 py-3 text-lg text-[#e7ecf1] transition duration-100 ease-in-out hover:bg-[#3587bd] md:mx-5 dark:bg-[#2283c3] dark:hover:bg-[#3599dc88]"
      >
        {icons.goback} Go Back
      </Link> */}
      <div className="mx-1 mb-5 mt-10 flex gap-3 md:mx-5">
        <button
          type="button"
          className={classes[selected === "fastest" ? 0 : 1]}
          onClick={() => handleSelect("fastest")} // Use the new handler
        >
          Fastest
        </button>
        <button
          type="button"
          className={classes[selected === "lightest" ? 0 : 1]}
          onClick={() => handleSelect("lightest")} // Use the new handler
        >
          Lightest
        </button>
        <button
          type="button"
          className={classes[selected === "shortest" ? 0 : 1]}
          onClick={() => handleSelect("shortest")} // Use the new handler
        >
          Shortest
        </button>
      </div>
      <ProfileBody
        props={{ data, selected, userName, PHOTO_URL: props.PHOTO_URL }}
      />
    </div>
  );
}

const ProfilePage = ({ props }) => {
  return (
    <Suspense fallback={<div className="min-h-screen"></div>}>
      <ProfilePageContent props={props} />
    </Suspense>
  );
};

export default ProfilePage;
