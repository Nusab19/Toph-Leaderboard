import Home from "@components/Home";

import getLeaderboardData from "@helpers/getLeaderboardData";

export default async function Page() {
  const data = await getLeaderboardData();
  return (
    <main>
      <Home props={{ data }} />
    </main>
  );
}
