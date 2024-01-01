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
        <span className="flex items-center justify-start gap-2">
          <span>{iconList[selected]}</span>
          <span className="text-3xl md:text-4xl">
            {selected.titleCase()} Solves by {userName}
          </span>
        </span>

        <p className="my-1 text-base font-normal text-gray-500 dark:text-gray-200">
          The table below shows the {selected.capitalize()} submissions of{" "}
          {userName} on toph.co
          <br />
          <b>{userName}</b> has <b>{data[selected].length}</b>{" "}
          {selected.capitalize()} submissions on toph.co
        </p>
      </div>
      <div className="flex items-center justify-start bg-gray-100 font-bold uppercase dark:bg-gray-700 dark:bg-opacity-50 dark:text-gray-200">
        <div className="w-5 px-6 py-3">#</div>
        <div className="px-6 py-3 ">Problems</div>
      </div>

      {Object.keys(data[selected]).map((_, index) => {
        return (
          <a
            key={index}
            href={`https://toph.co/p/${data[selected][index]}`}
            target="_blank"
            className="flex items-center justify-start text-sm font-semibold transition duration-100 ease-in-out hover:bg-[#f1f9ff] dark:text-gray-300 dark:hover:bg-opacity-5"
          >
            <div className="w-5 px-6 py-4">{index + 1}</div>
            <div className="ml-5 rounded-md bg-[#d2cbcb] bg-opacity-15 px-3 py-1 text-start dark:bg-opacity-15">
              {data[selected][index]}
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default ProfileBody;
