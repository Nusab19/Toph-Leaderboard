import safeFetch from "@/helpers/safeFetch";

const CacheDurationMs = 5 * 60 * 1000; // 5 minutes

/**
 * Generates unique cache keys for each user
 */
function getCacheKey(UserName) {
  return `UserData_${UserName}`;
}

function getTimestampKey(UserName) {
  return `UserDataTimestamp_${UserName}`;
}

/**
 * Retrieves user data with 5-minute per-user client-side caching.
 * Returns cached data if available and fresh, otherwise fetches and caches new data.
 */
export default async function getUser(UserName) {
  if (!UserName) {
    throw new Error("UserName is required");
  }

  const CacheKey = getCacheKey(UserName);
  const TimestampKey = getTimestampKey(UserName);

  const CachedData = localStorage.getItem(CacheKey);
  const CachedTimestamp = localStorage.getItem(TimestampKey);
  const Now = Date.now();

  // Return fresh cached data if it exists and is not expired
  if (
    CachedData !== null &&
    CachedTimestamp !== null &&
    Now - Number(CachedTimestamp) < CacheDurationMs
  ) {
    try {
      return JSON.parse(CachedData);
    } catch (e) {
      console.warn(`Failed to parse cached data for user ${UserName}, fetching fresh copy.`);
      // Continue to fresh fetch on parse error
    }
  }

  // Need fresh data
  try {
    const Res = await safeFetch(
      `https://toph-backend.netlify.app/api/getUser?userName=${UserName}`
    );
    const FreshData = Res.data;

    // Update cache
    localStorage.setItem(CacheKey, JSON.stringify(FreshData));
    localStorage.setItem(TimestampKey, String(Now));

    return FreshData;
  } catch (Error) {
    // On failure, fall back to stale cache if we have any
    if (CachedData !== null) {
      console.warn(`Failed to fetch user ${UserName}, returning stale cached data.`, Error);
      try {
        return JSON.parse(CachedData);
      } catch (ParseError) {
        // Nothing left to return
      }
    }
    throw Error; // re-throw if no fallback
  }
}
