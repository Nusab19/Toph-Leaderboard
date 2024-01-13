"use client";
import { useState } from "react";
import Link from "next/link";

import ProfileBody from "@components/ProfileBody";
import icons from "@helpers/icons";

const Styles = {
  buttons: {
    active:
      "bg-[#3598dc] text-[#e7ecf1] dark:bg-[#2283c3] text-lg px-3 py-2 rounded-md transition duration-100 ease-in-out",
    inactive:
      "hover:bg-[#e4f0f8] dark:hover:bg-[#e4f0f820] text-[#3598dc] dark:text-[#52a7e0] text-lg px-3 py-2 rounded-md transition duration-100 ease-in-out",
  },
};

const ProfilePage = ({ props }) => {
  const [data, setData] = useState(props.data);
  const [selected, setSelected] = useState(props.selected);
  const [userName, setUserName] = useState(props.userName);
  const classes = [Styles.buttons.active, Styles.buttons.inactive];

  return (
    <div className="mt-24">
      <Link
        href="/"
        className="mx-1 flex w-fit items-center gap-2 rounded-md bg-[#3598dc] px-4 py-3 text-lg text-[#e7ecf1] transition duration-100 ease-in-out hover:bg-[#3587bd] md:mx-5 dark:bg-[#2283c3] dark:hover:bg-[#3598dc]"
      >
        {icons.goback} Go Back
      </Link>
      <div className="mx-1 mb-5 mt-10 flex gap-3 md:mx-5">
        <button
          type="button"
          className={classes[selected === "fastest" ? 0 : 1]}
          onClick={() => setSelected("fastest")}
        >
          Fastest
        </button>
        <button
          type="button"
          className={classes[selected === "lightest" ? 0 : 1]}
          onClick={() => setSelected("lightest")}
        >
          Lightest
        </button>
        <button
          type="button"
          className={classes[selected === "shortest" ? 0 : 1]}
          onClick={() => setSelected("shortest")}
        >
          Shortest
        </button>
      </div>
      <ProfileBody props={{ data, selected, userName }} />
    </div>
  );
};

export default ProfilePage;
