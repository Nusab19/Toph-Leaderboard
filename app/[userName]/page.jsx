import UserProfileClient from "@/components/UserProfileClient";
import safeFetch from "@/helpers/safeFetch";

/**
 * This version is used ONLY at build time (during generateStaticParams)
 *
 * It skips localStorage entirely and always hits the API.
 */
async function getLeaderboardDataForBuild() {
  const Res = await safeFetch("https://toph-backend.netlify.app/api/leaderboard");
  return Res.data;
}

export async function generateStaticParams() {
  try {
    // During next build, localStorage doesn't exist and cache would be empty anyway
    // → force a real fetch instead of using the cached helper
    const Data = await getLeaderboardDataForBuild();

    const UserNames = new Set();

    if (Data.fastest) {
      Object.keys(Data.fastest).forEach((Name) => UserNames.add(Name));
    }
    if (Data.lightest) {
      Object.keys(Data.lightest).forEach((Name) => UserNames.add(Name));
    }
    if (Data.shortest) {
      Object.keys(Data.shortest).forEach((Name) => UserNames.add(Name));
    }


    return Array.from(UserNames).map((UserName) => ({
      userName: UserName,
    }));

  } catch (Error) {
    console.error("Failed to generate static params for user profiles:", Error);
    return []; // build will succeed but those pages will 404 until next build
  }
}

// Keep normal revalidation for ISR when not doing static export
export const revalidate = 60;

// Optional: keep it dynamic in dev / when not exporting
// export const dynamic = "force-dynamic"; // uncomment if you never use output: export

const UserProfilePage = async ({ params }) => {
  const { userName } = params;

  return (
    <main>
      <UserProfileClient userName={userName} />
    </main>
  );
};

export default UserProfilePage;
