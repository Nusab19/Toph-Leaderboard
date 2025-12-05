import safeFetch from "@/helpers/safeFetch";

const CacheKey = "LeaderboardData";
const CacheTimestampKey = "LeaderboardDataTimestamp";
const CacheDurationMs = 5 * 60 * 1000; // 5 minutes

/**
 * Retrieves leaderboard data with 5-minute client-side caching.
 * Returns cached data if it exists and is not older than 5 minutes.
 * Otherwise performs a fresh request and updates the cache.
 */
export default async function getLeaderboardData() {
  // Try to get cached data and its timestamp
  const CachedData = localStorage.getItem(CacheKey);
  const CachedTimestamp = localStorage.getItem(CacheTimestampKey);

  const Now = Date.now();

  // If we have valid cache and it's still fresh → return it immediately
  if (
    CachedData !== null &&
    CachedTimestamp !== null &&
    Now - Number(CachedTimestamp) < CacheDurationMs
  ) {
    try {
      return JSON.parse(CachedData);
    } catch (e) {
      // If parsing fails, fall through to fresh fetch
      console.warn("Failed to parse cached leaderboard data, fetching fresh copy.");
    }
  }

  // Cache is missing or expired → fetch fresh data
  try {
    const Res = await safeFetch("https://toph-backend.netlify.app/api/leaderboard");
    const FreshData = Res.data;

    // Store both data and timestamp
    localStorage.setItem(CacheKey, JSON.stringify(FreshData));
    localStorage.setItem(CacheTimestampKey, String(Now));

    return FreshData;
  } catch (Error) {
    // On fetch failure, attempt to return stale cache as fallback (if any)
    if (CachedData !== null) {
      console.warn("Fetch failed, returning stale cached leaderboard data.", Error);
      try {
        return JSON.parse(CachedData);
      } catch (ParseError) {
        // Nothing we can do here
      }
    }
    throw Error; // re-throw if no fallback available
  }
}
