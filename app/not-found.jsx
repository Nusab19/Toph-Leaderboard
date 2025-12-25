"use client"
import { useRouter } from "next/navigation";

const Styles = {
  button:
    "bg-[#3598dc] text-[#e7ecf1] dark:bg-[#2283c3] text-lg px-6 py-2 rounded-md transition duration-100 ease-in-out hover:opacity-90 w-full sm:w-auto",
  secondary:
    "hover:bg-[#e4f0f8] dark:hover:bg-gray-800/50 text-[#3598dc] dark:text-[#52a7e0] text-lg px-6 py-2 rounded-md transition duration-100 ease-in-out ring-2 ring-[#e4f0f8] dark:ring-gray-800/50 w-full sm:w-auto",
};

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold tracking-tight text-[#3598dc] min-[320px]:text-8xl md:text-9xl">
        404
      </h1>

      <h2 className="mt-2 text-xl font-semibold min-[320px]:text-2xl md:text-3xl dark:text-[#e7ecf1]">
        Page not found
      </h2>

      <p className="mx-auto mt-4 max-w-xs text-sm text-gray-600 sm:max-w-md sm:text-base dark:text-gray-400">
        The link might be broken or the page has been moved.
      </p>

      <div className="mt-10 flex w-full max-w-[280px] flex-col justify-center gap-4 sm:max-w-none sm:flex-row">
        <button className={Styles.button} onClick={() => router.push("/")}>
          Return to Leaderboard
        </button>
        <button className={Styles.secondary} onClick={() => router.back()}>
          Go Back
        </button>
      </div>

      <div className="mt-12 hidden md:block">
        <p className="rounded-md bg-blue-100 px-4 py-2 text-sm tracking-wide text-blue-900 dark:bg-blue-950 dark:text-blue-200">
          Tip: Press{" "}
          <kbd className="font-bold text-blue-900 underline dark:text-blue-100">
            H
          </kbd>{" "}
          to go home instantly.
        </p>
      </div>
    </div>
  );
}
