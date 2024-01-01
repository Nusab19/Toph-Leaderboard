export default async function getLeaderboardData() {
  const rootURL = process.env.ROOT_URL || "http://localhost:3000";
  const res = await fetch(`${rootURL}/api/leaderboard`, {
    next: { revalidate: 60 * 10 }, // 10 minutes
  });
  const data = await res.json();
  return data;
}
