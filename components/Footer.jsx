import Link from "next/link";

const Footer = () => {
  return (
    <footer className="m-4 rounded-lg bg-white shadow dark:bg-gray-800">
      <div className="md:max-10 w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            className="self-center whitespace-nowrap text-xl font-semibold md:text-2xl dark:text-white"
            href="/"
          >
            Toph Leaderboard
          </Link>
        </div>
        <hr className="my-6 border-gray-200 lg:my-8 dark:border-gray-700" />

        <span className="block text-sm text-gray-500 dark:text-gray-400">
          © 2022 - {new Date().getFullYear()}
          <a
            href="https://nusab19.pages.dev/"
            target="_blank"
            className="mx-2 font-bold hover:underline"
          >
            Nusab Taha.
          </a>
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
