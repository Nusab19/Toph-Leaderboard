"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import UserProfileClient from "@/components/UserProfileClient";

function UserProfileLoader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userName = searchParams.get("id");
  const [inputValue, setInputValue] = useState("");

  const navigateToUser = (e) => {
    e.preventDefault();
    const input = inputValue.trim();
    if (!input) return;

    let extractedName = input;
    const tophRegex = /toph\.co\/u\/([^/?#\s]+)/;
    const match = input.match(tophRegex);

    if (match && match[1]) {
      extractedName = match[1];
    }

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("id", extractedName);

    router.push(`/user?${newParams.toString()}`);
  };

  if (!userName) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="mb-4 text-2xl font-bold tracking-tight dark:text-white">
            View Profile
          </h1>

          <form onSubmit={navigateToUser} className="flex flex-col gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Username or Toph URL"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              autoFocus
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
              Go
            </button>
          </form>

          <div className="mt-4 text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
            <p className="font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">Accepted Formats:</p>
            <p>Username or profile link (e.g., <code>toph.co/u/username</code>)</p>
          </div>
        </div>
      </div>
    );
  }

  return <UserProfileClient userName={userName} />;
}

const UserProfilePage = () => {
  return (
    <main>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center gap-5 text-4xl font-semibold tracking-wider md:text-6xl text-gray-800 dark:text-gray-200">
            <span className="loader h-9 w-9 border-[5px] border-blue-500/80 md:h-12 md:w-12"></span>
            <span className="opacity-95">Loading...</span>
          </div>
        }
      >
        <UserProfileLoader />
      </Suspense>
    </main>
  );
};

export default UserProfilePage;
