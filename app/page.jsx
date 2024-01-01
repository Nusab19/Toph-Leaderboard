import { use } from "react";

import Home from "@components/Home";

import getLeaderboardData from "@helpers/getLeaderboardData";

export default function Page() {
  const data = use(getLeaderboardData());
  return (
    <main>
      <Home props={{ data }} />
    </main>
  );
}
