const Footer = () => {
  return (
    <footer className="m-4 rounded-lg bg-white shadow dark:bg-gray-800">
      <div className="md:max-10 w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            className="flex items-center justify-start gap-4 text-xl font-semibold md:text-2xl dark:text-white"
            href="https://github.com/Nusab19/Toph-Leaderboard"
            target="_blank"
            title="Github Repository"
          >
            <svg
              className="h-8 w-8 text-[##181717] md:h-10 md:w-10 dark:text-[#e6edf3]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Toph Leaderboard
          </a>
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
