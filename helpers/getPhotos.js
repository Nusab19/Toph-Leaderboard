import safeFetch from "@/helpers/safeFetch";

const CacheKey = "ProfilePhotos";
const CacheTimestampKey = "ProfilePhotosTimestamp";
const CacheDurationMs = 19 * 60 * 60 * 1000; // 19 hours

export default async function getPhotos(onUpdate) {
  const CachedData = localStorage.getItem(CacheKey);
  const CachedTimestamp = localStorage.getItem(CacheTimestampKey);
  const Now = Date.now();

  const isExpired = !CachedTimestamp || Now - Number(CachedTimestamp) > CacheDurationMs;

  const fetchAndSave = async () => {
    try {
      const Res = await safeFetch("https://toph-backend.netlify.app/api/photos");
      const FreshData = Res.data;

      localStorage.setItem(CacheKey, JSON.stringify(FreshData));
      localStorage.setItem(CacheTimestampKey, String(Date.now()));

      if (onUpdate) onUpdate({ ok: true, data: FreshData });
      return { ok: true, data: FreshData };
    } catch (error) {
      console.error("Fetch failed for photos:", error);
      return { ok: false, data: {} };
    }
  };

  if (CachedData !== null) {
    try {
      const parsedData = JSON.parse(CachedData);
      if (isExpired) {
        fetchAndSave(); // Background refresh
      }
      return { ok: true, data: parsedData };
    } catch (e) {
      console.warn("Photo cache corrupted");
    }
  }

  return await fetchAndSave();
}
