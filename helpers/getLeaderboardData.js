export default async function getLeaderboardData() {
  const rootURL = process.env.ROOT_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${rootURL}/api/leaderboard`, {
      next: { revalidate: 60 * 10 }, // 10 minutes
    });
    const data = await res.json();
    return data;
    
  } catch (error) {
    console.log(`Error while fetching leaderboard data: ${error}`);
    const res = await fetch("https://toph-api.onrender.com/getData", {
      next: { revalidate: 60 * 10 }, // 10 minutes
    });
    const data = await res.json();
    return data;
  }
}
