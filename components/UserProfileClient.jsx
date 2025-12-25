"use client";

import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import ProfilePage from "@/components/ProfilePage";
import getUser from "@/helpers/getUser";
import getPhotos from "@/helpers/getPhotos";

export default function UserProfileClient({ userName }) {
  const [data, setData] = useState(null);
  const [photos, setPhotos] = useState({});
  const [selected, setSelected] = useState("shortest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query] = useQueryState("q");

  useEffect(() => {
    if (query && data) {
      setSelected(query);
    }
  }, [query, data]);

  useEffect(() => {
    const processUserData = (userData) => {
      if (!userData || !userData.ok) return null;
      const [fastest, lightest, shortest] = userData.content;
      return { fastest, lightest, shortest };
    };

    const fetchUserData = async () => {
      try {
        setLoading(true);

        // 1. Get User Data (SWR)
        const initialUserData = await getUser(userName, (freshRaw) => {
          const freshProcessed = processUserData(freshRaw);
          if (freshProcessed) setData(freshProcessed);
        });

        const initialProcessed = processUserData(initialUserData);
        if (!initialProcessed) {
          setError("Could not fetch the user data");
          return;
        }
        setData(initialProcessed);

        // Selection Logic
        if (!query) {
          if (initialProcessed.fastest.length > 0) setSelected("fastest");
          else if (initialProcessed.lightest.length > 0)
            setSelected("lightest");
          else setSelected("shortest");
        } else {
          setSelected(query);
        }

        // 2. Get Photos (SWR)
        // No longer passing 'userName' as the helper fetches the full list
        const initialPhotos = await getPhotos((freshPhotos) => {
          if (freshPhotos.ok) setPhotos(freshPhotos);
        });

        if (initialPhotos.ok) setPhotos(initialPhotos);
      } catch (err) {
        setError(`Could not fetch the data: ${String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    if (userName) fetchUserData();
  }, [userName]);

  if (loading && !data) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-5 text-4xl font-semibold tracking-wider md:text-6xl">
        <span className="loader h-9 w-9 border-[5px] border-blue-500/80 md:h-12 md:w-12"></span>
        <span className="opacity-95">Loading...</span>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-5 text-sm font-semibold tracking-wider md:text-xl">
        <pre className="font-mono">{error}</pre>
      </div>
    );
  }

  return (
    <ProfilePage
      props={{
        data,
        userName,
        selected,
        PHOTO_URL: photos?.data?.[userName] || null,
      }}
    />
  );
}
