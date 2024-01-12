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

const ProfileBody = ({ props }) => {
  const { data, userName, selected } = props;

  return (
    <div className="mx-1 overflow-x-auto bg-white text-[#2f353b] shadow-md sm:rounded-lg md:mx-5 dark:bg-gray-800 dark:text-gray-100">
      <div className="p-5 text-left font-semibold">
        <div className="flex items-center justify-start gap-2">
          <span>{iconList[selected]}</span>
          <span className="text-3xl md:text-4xl flex">
            {selected.titleCase()} Solves by{" "}
            <Link
              href={`https://toph.co/u/${userName}`}
              className="rounded-md bg-emerald-500 bg-opacity-10 px-4 py-2 text-emerald-500 hover:bg-opacity-15 dark:bg-emerald-400 dark:bg-opacity-5 dark:text-emerald-400 dark:hover:bg-opacity-10"
            >
              {userName}
            </Link>
          </span>
        </div>

        <p className="mb-1 mt-5 text-base font-normal text-gray-500 dark:text-gray-200">
          The table below shows the {selected.capitalize()} submissions of{" "}
          {userName} on toph.co
          <br />
          <code className="inline-block rounded-md py-1 font-bold text-gray-700 dark:text-gray-300">
            {userName} has <b>{data[selected].length}</b>{" "}
            {selected.capitalize()} submissions on toph.co
          </code>
        </p>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 font-bold uppercase dark:bg-gray-700 dark:bg-opacity-50 dark:text-gray-200">
            <th className="flex items-center">
              <div className="w-5 px-6 py-3">#</div>
              <div className="px-6 py-3">Problems</div>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y-2 divide-gray-200 dark:divide-gray-700">
          {Object.keys(data[selected]).map((_, index) => {
            return (
              <tr
                key={index}
                className="flex items-center justify-between text-sm font-semibold dark:text-gray-200"
              >
                <td className="flex items-center">
                  <div className="w-5 px-6 py-4">{index + 1}</div>
                  <Link
                    key={index}
                    href={`https://toph.co/p/${data[selected][index]}`}
                    target="_blank"
                    className="group ml-5 flex items-center justify-center gap-2 rounded-md bg-[#d2cbcb] bg-opacity-10 px-3 py-1 text-start hover:bg-opacity-15 hover:text-emerald-500 dark:bg-opacity-5 dark:hover:bg-opacity-10 dark:hover:text-emerald-400"
                  >
                    {data[selected][index].replace(/-/g, " ")}
                    <svg
                      className="group-hover:ml-0.5 group-hover:text-sky-500 dark:group-hover:text-sky-400"
                      fill="currentColor"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5,2 L7,2 C7.55228475,2 8,2.44771525 8,3 C8,3.51283584 7.61395981,3.93550716 7.11662113,3.99327227 L7,4 L5,4 C4.48716416,4 4.06449284,4.38604019 4.00672773,4.88337887 L4,5 L4,19 C4,19.5128358 4.38604019,19.9355072 4.88337887,19.9932723 L5,20 L19,20 C19.5128358,20 19.9355072,19.6139598 19.9932723,19.1166211 L20,19 L20,17 C20,16.4477153 20.4477153,16 21,16 C21.5128358,16 21.9355072,16.3860402 21.9932723,16.8833789 L22,17 L22,19 C22,20.5976809 20.75108,21.9036609 19.1762728,21.9949073 L19,22 L5,22 C3.40231912,22 2.09633912,20.75108 2.00509269,19.1762728 L2,19 L2,5 C2,3.40231912 3.24891996,2.09633912 4.82372721,2.00509269 L5,2 L7,2 L5,2 Z M21,2 L21.081,2.003 L21.2007258,2.02024007 L21.2007258,2.02024007 L21.3121425,2.04973809 L21.3121425,2.04973809 L21.4232215,2.09367336 L21.5207088,2.14599545 L21.5207088,2.14599545 L21.6167501,2.21278596 L21.7071068,2.29289322 L21.7071068,2.29289322 L21.8036654,2.40469339 L21.8036654,2.40469339 L21.8753288,2.5159379 L21.9063462,2.57690085 L21.9063462,2.57690085 L21.9401141,2.65834962 L21.9401141,2.65834962 L21.9641549,2.73400703 L21.9641549,2.73400703 L21.9930928,2.8819045 L21.9930928,2.8819045 L22,3 L22,3 L22,9 C22,9.55228475 21.5522847,10 21,10 C20.4477153,10 20,9.55228475 20,9 L20,5.414 L13.7071068,11.7071068 C13.3466228,12.0675907 12.7793918,12.0953203 12.3871006,11.7902954 L12.2928932,11.7071068 C11.9324093,11.3466228 11.9046797,10.7793918 12.2097046,10.3871006 L12.2928932,10.2928932 L18.584,4 L15,4 C14.4477153,4 14,3.55228475 14,3 C14,2.44771525 14.4477153,2 15,2 L21,2 Z" />
                    </svg>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileBody;
