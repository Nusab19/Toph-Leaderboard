import safeFetch from "@/helpers/safeFetch";

const CacheKey = "ProfilePhotos";
const CacheTimestampKey = "ProfilePhotosTimestamp";
const CacheDurationMs = 19 * 60 * 60 * 1000; // 19 hour

export default async function getPhotos() {
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
      return { ok: true, data: JSON.parse(CachedData) };
    } catch (e) {
      // If parsing fails, fall through to fresh fetch
      console.warn("Failed to parse cached photo data, fetching fresh copy.");
    }
  }

  // Cache is missing or expired → fetch fresh data
  try {
    const Res = await safeFetch("https://toph-backend.netlify.app/api/photos");
    const FreshData = Res.data;

    // Store both data and timestamp
    localStorage.setItem(CacheKey, JSON.stringify(FreshData));
    localStorage.setItem(CacheTimestampKey, String(Now));
    return { ok: true, data: FreshData };
  } catch (Error) {
    // On fetch failure, attempt to return stale cache as fallback (if any)
    if (CachedData !== null) {
      console.warn("Fetch failed, returning stale cached photos data.", Error);
      try {
        return { ok: true, data: JSON.parse(CachedData) };
      } catch (ParseError) {
        return { ok: false, data: {}, message: "All failed" };
      }
    }
    throw Error; // re-throw if no fallback available
  }
}
