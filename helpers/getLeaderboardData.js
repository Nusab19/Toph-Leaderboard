import safeFetch from "@/helpers/safeFetch";

const CacheKey = "LeaderboardData";
const CacheTimestampKey = "LeaderboardDataTimestamp";
const CacheDurationMs = 60 * 60 * 1000; // 1 hour

export default async function getLeaderboardData(onUpdate) {
  const CachedData = localStorage.getItem(CacheKey);
  const CachedTimestamp = localStorage.getItem(CacheTimestampKey);
  const Now = Date.now();

  const isExpired = !CachedTimestamp || Now - Number(CachedTimestamp) > CacheDurationMs;

  const fetchAndSave = async () => {
    try {
      const Res = await safeFetch("https://toph-backend.netlify.app/api/leaderboard");
      const FreshData = Res.data;

      localStorage.setItem(CacheKey, JSON.stringify(FreshData));
      localStorage.setItem(CacheTimestampKey, String(Date.now()));

      if (onUpdate) onUpdate(FreshData);
      return FreshData;
    } catch (error) {
      console.error("Fetch failed:", error);
      return null;
    }
  };

  if (CachedData !== null) {
    try {
      const parsedData = JSON.parse(CachedData);
      if (isExpired) {
        // Trigger background fetch, do not await it
        fetchAndSave();
      }
      return parsedData;
    } catch (e) {
      console.warn("Cache corrupted, fetching fresh.");
    }
  }

  return await fetchAndSave();
}
