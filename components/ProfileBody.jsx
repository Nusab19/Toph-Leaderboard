import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";

import "@/helpers/stringMethods"; // String.prototype.capitalize() & String.prototype.titleCase()
import icons from "@/helpers/icons";

const motto = {
  shortest: "Every bit counts!",
  fastest: "Faster by 1 μs!",
  lightest: "Less is more!",
};

const iconList = {
  fastest: icons.lightning,
  lightest: icons.ram,
  shortest: icons.bulb,
};

const ITEMS_PER_PAGE = 50;

const ProfileBody = ({ props }) => {
  const { data, userName, selected, PHOTO_URL } = props;
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  const items = data[selected] || [];
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  // Reset page when category changes
  useMemo(() => {
    setCurrentPage(1);
  }, [selected]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Keyboard shortcuts for navigation
  useKeyboardShortcut(
    useMemo(
      () => [
        { key: "arrowright", action: goToNextPage, runOnInput: false },
        { key: "arrowleft", action: goToPrevPage, runOnInput: false },
      ],
      [totalPages],
    ),
  );

  return (
    <div className="mx-1 bg-white p-0.5 text-[#2f353b] shadow-md sm:rounded-lg md:mx-5 dark:bg-gray-800/30 dark:text-gray-100">
      {PHOTO_URL ? (
        <img
          src={PHOTO_URL}
          alt={`${userName}'s Profile Picture`}
          className="m-2 block h-[200px] w-[200px] rounded-lg border border-gray-200 md:m-4 dark:border-gray-800"
          fetchPriority="high"
        />
      ) : (
        <div className="m-2 flex h-[200px] w-[200px] items-center justify-center rounded-lg bg-blue-500 text-7xl font-bold text-blue-50 md:m-4">
          {userName[0].toUpperCase()}
        </div>
      )}

      <div className="m-2 mt-5 text-left font-semibold md:ml-4">
        <Link
          href={`https://toph.co/u/${userName}`}
          target="_blank"
          className="rounded-md bg-blue-500 bg-opacity-10 px-3 py-2 text-xl text-blue-500 hover:bg-opacity-15 md:text-2xl lg:text-3xl dark:bg-blue-400 dark:bg-opacity-5 dark:text-blue-400 dark:hover:bg-opacity-10"
        >
          @{userName}
        </Link>
        <div className="flex items-center justify-start gap-2 py-5">
          <span>{iconList[selected]}</span>
          <h2 className="font-mono text-lg tracking-widest underline underline-offset-8 md:text-xl">
            {motto[selected]}
          </h2>
        </div>
        <div className="whitespace-pre font-semibold text-gray-700 dark:text-gray-300">
          <p>
            Fastest<span className="ml-[15px] mr-1">:</span>
            <code className="text-center font-mono tracking-wide">
              {data.fastest.length}
            </code>
          </p>
          <p>
            Lightest<span className="ml-[8px] mr-1">:</span>
            <code className="text-center font-mono tracking-wide">
              {data.lightest.length}
            </code>
          </p>
          <p>
            Shortest
            <span className="ml-[6px] mr-1">:</span>
            <code className="text-center font-mono tracking-wide">
              {data.shortest.length}
            </code>
          </p>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 font-bold uppercase dark:bg-gray-800 dark:bg-opacity-50 dark:text-gray-200">
            <th className="flex items-center">
              <div className="w-5 px-2 py-3 md:px-6">#</div>
              <div className="px-3 py-3 md:px-6">Problems</div>
            </th>
          </tr>
        </thead>
        {items.length === 0 && (
          <tbody>
            <tr>
              <td>
                <div className="flex h-64 items-center justify-center">
                  <p className="text-lg font-bold md:text-2xl lg:text-4xl">
                    Nothing Here...
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        )}
        <tbody className="divide-y-2 divide-gray-200 dark:divide-gray-800">
          {currentItems.map((problem, idx) => {
            const absoluteIndex = startIndex + idx + 1;
            return (
              <tr
                key={problem}
                className="flex items-center justify-between text-sm font-semibold dark:text-gray-200"
              >
                <td className="flex items-center">
                  <div className="w-10 px-2 py-4 text-center">
                    {absoluteIndex}
                  </div>
                  <Link
                    href={`https://toph.co/p/${problem}`}
                    target="_blank"
                    className="group ml-1.5 flex items-center justify-center gap-2 rounded-md bg-[#d2cbcb] bg-opacity-10 px-3 py-1 pl-2 text-start hover:bg-opacity-15 hover:text-sky-500 md:ml-4 dark:bg-opacity-5 dark:hover:bg-opacity-10 dark:hover:text-sky-400"
                  >
                    {problem.replace(/-/g, " ")}
                    <svg
                      className="transition-all duration-100 group-hover:ml-0.5 group-hover:text-sky-500 dark:group-hover:text-sky-400"
                      fill="currentColor"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5,2 L7,2 C7.55228475,2 8,2.44771525 8,3 C8,3.51283584 7.61395981,3.93550716 7.11662113,3.99327227 L7,4 L5,4 C4.48716416,4 4.06449284,4.38604019 4.00672773,4.88337887 L4,5 L4,19 C4,19.5128358 4.38604019,19.9355072 4.88337887,19.9932723 L5,20 L19,20 C19.5128358,20 19.9355072,19.6139598 19.9932723,19.1166211 L20,19 L20,17 C20,16.4477153 20.4477153,16 21,16 C21.5128358,16 21.9355072,16.3860402 21.9932723,16.8833789 L22,17 L22,19 C22,20.5976809 20.75108,21.9036609 19.1762728,21.9949073 L19,22 L5,22 C3.40231912,22 2.09633912,20.75108 2.00509269,19.1762728 L2,19 L2,5 C2,3.40231912 3.24891996,2.09633912 4.82372721,2.00509269 L5,2 L7,2 L5,2 Z M21,2 L21.081,2.003 L21.2007258,2.02024007 L21.3121425,2.04973809 L21.4232215,2.09367336 L21.5207088,2.14599545 L21.6167501,2.21278596 L21.7071068,2.29289322 L21.8036654,2.40469339 L21.8753288,2.5159379 L21.9063462,2.57690085 L21.9401141,2.65834962 L21.9641549,2.73400703 L21.9930928,2.8819045 L22,3 L22,3 L22,9 C22,9.55228475 21.5522847,10 21,10 C20.4477153,10 20,9.55228475 20,9 L20,5.414 L13.7071068,11.7071068 C13.3466228,12.0675907 12.7793918,12.0953203 12.3871006,11.7902954 L12.2928932,11.7071068 C11.9324093,11.3466228 11.9046797,10.7793918 12.2097046,10.3871006 L12.2928932,10.2928932 L18.584,4 L15,4 C14.4477153,4 14,3.55228475 14,3 C14,2.44771525 14.4477153,2 15,2 L21,2 Z" />
                    </svg>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/50 px-4 py-4 dark:border-gray-800 dark:bg-gray-800/10">
          <div className="hidden text-sm font-medium tracking-wider text-gray-500 md:block dark:text-gray-400">
            Showing{" "}
            <span className="font-bold text-gray-900 dark:text-gray-100">
              {startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-gray-900 dark:text-gray-100">
              {Math.min(startIndex + ITEMS_PER_PAGE, items.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-gray-900 dark:text-gray-100">
              {items.length}
            </span>{" "}
            results
          </div>

          <div className="flex flex-1 justify-between gap-2 md:justify-end">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-700"
            >
              Previous
            </button>
            <div className="flex items-center px-2 text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBody;
