"use client";
import { useState, useEffect, Suspense, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

import Link from "next/link";

import ProfileBody from "@/components/ProfileBody";
import icons from "@/helpers/icons";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";

const Styles = {
  buttons: {
    active:
      "bg-[#3598dc] text-[#e7ecf1] dark:bg-[#2283c3] text-lg px-3 py-2 rounded-md transition duration-100 ease-in-out",
    inactive:
      "hover:bg-[#e4f0f8] dark:hover:bg-gray-800/50 text-[#3598dc] dark:text-[#52a7e0] text-lg px-3 py-2 rounded-md transition duration-100 ease-in-out ring-2 ring-[#e4f0f8] dark:ring-gray-800/50",
  },
};

function ProfilePageContent({ props }) {
  const router = useRouter();
  const [data, setData] = useState(props.data);
  // Keep selected state local for immediate UI updates
  const [selected, setSelected] = useState(props.selected);
  const [userName, setUserName] = useState(props.userName);
  const classes = [Styles.buttons.active, Styles.buttons.inactive];

  useEffect(() => {
    document.title = `${userName}'s Profile - Toph Leaderboard`;
  }, [userName]);

  // Set defaultValue to null so that "shortest" is treated as an explicit value in the URL
  const [query, setQuery] = useQueryState("q");

  useEffect(() => {
    if (query && query !== selected) {
      setSelected(query);
    }
  }, [query]);

  const handleSelect = (value) => {
    setSelected(value);
    setQuery(value);
  };

  // Keyboard Handlers
  useKeyboardShortcut(
    useMemo(
      () => [
        { key: "f", action: () => handleSelect("fastest"), runOnInput: false },
        { key: "l", action: () => handleSelect("lightest"), runOnInput: false },
        { key: "s", action: () => handleSelect("shortest"), runOnInput: false },
        {
          key: "ctrl+backspace",
          action: () => router.push("/"),
          runOnInput: false,
        },
        { key: "backspace", action: () => router.back(), runOnInput: false },
      ],
      [router],
    ),
  );

  return (
    <div className="mt-24">
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
