import { Suspense } from "react";
import UserProfileClient from "@/components/UserProfileClient";
import safeFetch from "@/helpers/safeFetch";

export async function generateStaticParams() {
  try {
    const Res = await safeFetch("https://toph-backend.netlify.app/api/leaderboard");
    const Data = Res.data;
    const UserNames = new Set();

    ["fastest", "lightest", "shortest"].forEach((key) => {
      if (Data[key]) {
        Object.keys(Data[key]).forEach((name) => UserNames.add(name));
      }
    });

    UserNames.delete("Nusab19");

    return Array.from(UserNames).map((userName) => ({ userName }));
  } catch (error) {
    console.error("Static params failed:", error);
    return [];
  }
}

const UserProfilePage = async ({ params }) => {
  const { userName } = await params;

  return (
    <main>
      <Suspense fallback={
        <div className="flex min-h-screen items-center justify-center gap-5 text-4xl font-semibold tracking-wider md:text-6xl">
          <span className="loader h-9 w-9 border-[5px] border-blue-500/80 md:h-12 md:w-12"></span>
          <span className="opacity-95">Loading...</span>
        </div>
      }>
        <UserProfileClient userName={userName} />
      </Suspense>
    </main>
  );
};

export default UserProfilePage;
