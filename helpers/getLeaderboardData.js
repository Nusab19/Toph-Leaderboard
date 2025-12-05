import safeFetch from "@/helpers/safeFetch";

export default async function getLeaderboardData() {
  const res = await safeFetch("https://toph-backend.netlify.app/api/leaderboard");
  const data = res.data;
  return data;
}
