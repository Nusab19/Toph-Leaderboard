import safeFetch from "@/helpers/safeFetch";

const CacheDurationMs =  60 * 1000; // 1 minute

function getCacheKey(UserName) { return `UserData_${UserName}`; }
function getTimestampKey(UserName) { return `UserDataTimestamp_${UserName}`; }

export default async function getUser(UserName, onUpdate) {
  if (!UserName) throw new Error("UserName is required");

  const CacheKey = getCacheKey(UserName);
  const TimestampKey = getTimestampKey(UserName);
  const CachedData = localStorage.getItem(CacheKey);
  const CachedTimestamp = localStorage.getItem(TimestampKey);
  const Now = Date.now();

  const isExpired = !CachedTimestamp || Now - Number(CachedTimestamp) > CacheDurationMs;

  const fetchAndSave = async () => {
    try {
      const Res = await safeFetch(`https://toph-backend.netlify.app/api/getUser?userName=${UserName}`);
      const FreshData = Res.data;

      localStorage.setItem(CacheKey, JSON.stringify(FreshData));
      localStorage.setItem(TimestampKey, String(Date.now()));

      if (onUpdate) onUpdate(FreshData);
      return FreshData;
    } catch (error) {
      console.error(`Fetch failed for ${UserName}:`, error);
      return null;
    }
  };

  if (CachedData !== null) {
    try {
      const parsedData = JSON.parse(CachedData);
      if (isExpired) {
        fetchAndSave(); // Background refresh
      }
      return parsedData;
    } catch (e) {
      console.warn(`Cache corrupted for ${UserName}`);
    }
  }

  return await fetchAndSave();
}
