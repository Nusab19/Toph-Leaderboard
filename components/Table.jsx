import Link from "next/link";

import "@helpers/stringMethods"; // String.prototype.capitalize() & String.prototype.titleCase()
import icons from "@helpers/icons";

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

const colors = {
  // colors for the top 5 users
  1: "text-[#d62828] bg-[#d62828] dark:bg-[#ff3333] dark:text-[#ff3333]",
  2: "text-[#f77f00] bg-[#f77f00] dark:bg-[#ff901a] dark:text-[#ff901a]",
  3: "text-[#2eaa71] bg-[#2eaa71] dark:bg-[#37c884] dark:text-[#37c884]",
  4: "text-[#3598dc] bg-[#3598dc] dark:bg-[#52a7e0] dark:text-[#52a7e0]",
  5: "text-[#7209b7] bg-[#7209b7] dark:bg-[#b655f7] dark:text-[#b655f7]",
};

const Table = ({ props }) => {
  const { data, selected } = props;

  return (
    <div className="mx-1 overflow-x-auto bg-white text-[#2f353b] shadow-md sm:rounded-lg md:mx-5 dark:bg-gray-800/30 dark:text-gray-100">
      <div className="p-5 text-left font-semibold">
        <span className="flex items-center justify-start gap-2">
          <span>{iconList[selected]}</span>
          <span className="text-3xl md:text-4xl">
            {selected.titleCase()} Coders
          </span>
        </span>

        <p className="mt-5 mb-1 text-base font-normal text-gray-500 dark:text-gray-200">
          The table below shows the users with the most shortest submissions on
          toph.co
          <br />
          <q>
            <code className="inline-block rounded-md py-1 font-bold text-gray-700 dark:text-gray-300">
              {motto[selected]}
            </code>
          </q>
        </p>
      </div>

      <table className="w-full">

        <thead>
          <tr className="flex items-center justify-between bg-gray-100 font-bold uppercase dark:bg-gray-800 dark:bg-opacity-50 dark:text-gray-200">
            <th className="flex items-center">
              <div className="w-5 px-6 py-3">#</div>
              <div className="px-6 py-3">Solvers</div>
            </th>
            <th className="px-6 py-3 ">Problems</th>
          </tr>
        </thead>

        <tbody className="divide-y-2 divide-gray-200 dark:divide-gray-700">
          {Object.keys(data[selected]).map((userName, index) => {
            return (
              <tr
                key={index}
                className="flex items-center justify-between text-sm font-semibold dark:text-gray-200"
              >
                <td className="flex items-center">
                  <div className="w-5 px-6 py-4">{index + 1}</div>
                  <Link
                    key={index}
                    href={`/${userName}`}
                    className={
                      "ml-5 rounded-md bg-opacity-10 dark:bg-opacity-5 px-3 py-1 text-start hover:bg-opacity-15 dark:hover:bg-opacity-10 " +
                      (index < 5 ? colors[index + 1] : "bg-[#d2cbcb]")
                    }
                  >
                    {userName}
                  </Link>
                </td>
                <td className="px-6 py-4">{data[selected][userName]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
