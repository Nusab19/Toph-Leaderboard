"use client";
import { useState } from "react";

import Table from "@components/Table";

const Styles = {
  buttons: {
    active: "bg-[#3598dc] text-[#e7ecf1] dark:bg-[#2283c3] text-lg px-3 py-2 rounded-md transition duration-100 ease-in-out",
    inactive: "hover:bg-[#e4f0f8] dark:hover:bg-[#e4f0f820] text-[#3598dc] dark:text-[#52a7e0] text-lg px-3 py-2 rounded-md transition duration-100 ease-in-out",
  },
};

const Home = ({ props }) => {
  const [data, setData] = useState(props.data);
  const [selected, setSelected] = useState("fastest");
  const classes = [Styles.buttons.active, Styles.buttons.inactive];

  return (
    <div className="mt-32">
      <div className="md:mx-5 mx-1 mt-10 mb-5 flex gap-3">
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
      <Table props={{ data, selected}} />
    </div>
  );
};

export default Home;
