"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Table from "@/components/Table";

const Styles = {
  buttons: {
    active:
      "bg-[#3598dc] text-[#e7ecf1] dark:bg-[#2283c3] text-lg px-3 py-2 rounded-md transition duration-100 ease-in-out",
    inactive:
      "hover:bg-[#e4f0f8] dark:hover:bg-gray-800/50 text-[#3598dc] dark:text-[#52a7e0] text-lg px-3 py-2 rounded-md transition duration-100 ease-in-out ring-2 ring-[#e4f0f8] dark:ring-gray-800/50",
  },
};

function HomeContent({ props }) {
  const [data, setData] = useState(props.data);
  const [selected, setSelected] = useState("fastest");
  const classes = [Styles.buttons.active, Styles.buttons.inactive];

  const router = useRouter();
  const query = useSearchParams().get("q");

  useEffect(() => {
    if (query) {
      setSelected(query);
    }
  }, [query]);

  useEffect(() => {
    router.replace(`?q=${selected}`, undefined, { shallow: true });
  }, [selected, router]);

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
      <Table props={{ data, selected }} />
    </div>
  );
}

const Home = ({ props }) => {
  return (
    <Suspense
      fallback={<div className="mx-1 mt-20 md:mx-5 md:mt-24">Loading...</div>}
    >
      <HomeContent props={props} />
    </Suspense>
  );
};

export default Home;
