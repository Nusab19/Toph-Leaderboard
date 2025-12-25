"use client"
import React, { useEffect, useRef } from 'react';
import getPhotos from "@/helpers/getPhotos";
import getLeaderboardData from "@/helpers/getLeaderboardData";
import getUser from "@/helpers/getUser";

const PrefetchData = () => {
  const hasRun = useRef(false);

  useEffect(() => {
    // Prevent double execution in React Strict Mode
    if (hasRun.current) return;
    hasRun.current = true;

    const now = Date.now();
    const ONE_HOUR = 1 * 60 * 60 * 1000;
    const FIVE_HOURS = 5 * 60 * 60 * 1000;

    // Styles
    const styleHeader = 'color: #ffffff; background: #6366f1; font-weight: bold; padding: 2px 5px; border-radius: 3px;';
    const styleInfo = 'color: #0ea5e9; font-weight: bold;';
    const styleSuccess = 'color: #10b981; font-weight: bold;';
    const styleProgress = 'color: #a855f7; font-weight: bold;';
    const styleSkip = 'color: #94a3b8; font-style: italic;';

    const prefetchLeaderboardAndUsers = async () => {
      const STORAGE_KEY_LB = 'last_leaderboard_prefetch_time';
      const lastFetch = localStorage.getItem(STORAGE_KEY_LB);

      if (lastFetch && now - parseInt(lastFetch) < ONE_HOUR) {
        console.log(`%c[Skip]%c Leaderboard logic skipped (1h limit).`, styleSkip, '');
        return;
      }

      try {
        console.log("%c[Leaderboard]%c Fetching data...", styleHeader, '');
        const data = await getLeaderboardData();

        // Ensure data exists before processing
        const usernames = new Set([
          ...Object.keys(data?.fastest || {}),
          ...Object.keys(data?.lightest || {}),
          ...Object.keys(data?.shortest || {}),
        ]);

        if (usernames.size === 0) {
          console.log("%c[Leaderboard]%c No usernames found.", styleHeader, styleSkip);
          return;
        }

        console.log(`%c[Leaderboard]%c Syncing %c${usernames.size}%c unique user profiles...`, styleHeader, '', styleInfo, '');

        const userPromises = Array.from(usernames).map(username => getUser(username));
        await Promise.all(userPromises);

        localStorage.setItem(STORAGE_KEY_LB, Date.now().toString());
        console.log("%c[Leaderboard]%c Profile sync complete.", styleHeader, styleSuccess);
      } catch (error) {
        console.error("%c[Leaderboard Error]", "color: #ef4444; font-weight: bold;", error);
      }
    };

    const prefetchPhotos = async () => {
      const STORAGE_KEY_PHOTO = 'last_photo_prefetch_time';
      const lastFetch = localStorage.getItem(STORAGE_KEY_PHOTO);

      if (lastFetch && now - parseInt(lastFetch) < FIVE_HOURS) {
        const remainingMinutes = Math.round((FIVE_HOURS - (now - parseInt(lastFetch))) / 60000);
        console.log(`%c[Skip]%c Photo prefetch skipped. Next window in ${remainingMinutes}m.`, styleSkip, '');
        return;
      }

      try {
        console.log("%c[Photos]%c Requesting photo map...", styleHeader, '');
        const res = await getPhotos();
        const photosMap = res.data; // Fixed: accessing .data

        // Filter to ensure we only get valid URL strings
        const urls = Object.values(photosMap || {}).filter(url => typeof url === 'string' && url.startsWith('http'));
        const total = urls.length;

        if (total === 0) {
          console.log("%c[Photos]%c No valid image URLs found.", styleHeader, styleSkip);
          return;
        }

        let loadedCount = 0;
        console.log(`%c[Photos]%c Prefetching %c${total}%c images...`, styleHeader, '', styleInfo, '');

        const photoPromises = urls.map((url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = url;

            img.onload = () => {
              loadedCount++;
              const percent = Math.round((loadedCount / total) * 100);
              console.log(`%c[Progress]%c ${percent}% %c(${loadedCount}/${total})`, styleProgress, '', 'color: #94a3b8');
              resolve(url);
            };

            img.onerror = () => {
              loadedCount++;
              console.warn(`%c[Photos]%c Failed: ${url}`, 'color: #ef4444', '');
              resolve(url);
            };
          });
        });

        await Promise.all(photoPromises);

        localStorage.setItem(STORAGE_KEY_PHOTO, Date.now().toString());
        console.log("%c[Photos]%c All images cached successfully.", styleHeader, styleSuccess);
      } catch (error) {
        console.error("%c[Photos Error]", "color: #ef4444; font-weight: bold;", error);
      }
    };

    prefetchLeaderboardAndUsers();
    prefetchPhotos();
  }, []);

  return null;
};

export default PrefetchData;
