"use client";

"use client";

import { useEffect, useState } from "react";
import ProfilePage from "@/components/ProfilePage";
import getUser from "@/helpers/getUser";
import getPhotos from "@/helpers/getPhotos"; // Import is already present

export default function UserProfileClient({ userName }) {
  const [data, setData] = useState(null);
  const [photos, setPhotos] = useState({}); // New state for photo data
  const [selected, setSelected] = useState("shortest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // --- 1. Fetch User Data ---
        const userData = await getUser(userName);

        if (!userData.ok) {
          console.error("API returned error:", userData);
          setError("Could not fetch the user data");
          setLoading(false);
          return;
        }

        // Extract the data from the response
        const [fastest, lightest, shortest] = userData.content;
        const fetchedData = { fastest, lightest, shortest };

        // --- 2. Fetch Photo Data ---
        const photosData = await getPhotos(userName);

        if (!photosData.ok) {
          // Log an error but don't halt execution, we still have the main data.
          // You may choose to set an error if photos are strictly required.
          console.error("Photos API returned error:", photosData);
          // Optionally set an error here: setError("Could not fetch user photos"); return;
        } else {
          // photosData.content is the object { username: url, ... }
          setPhotos(photosData || {});
        }

        // Update main data state
        setData(fetchedData);

        // --- 3. Determine Selected Category (Original Logic) ---
        let selectedCategory = "shortest";

        if (fastest.length > 0) {
          selectedCategory = "fastest";
        } else if (lightest.length > 0) {
          selectedCategory = "lightest";
        } else if (shortest.length > 0) {
          selectedCategory = "shortest";
        }

        setSelected(selectedCategory);
        setLoading(false);
      } catch (err) {
        // console.error("Unexpected error fetching data:", err);
        setError(`Could not fetch the data - unexpected error: ${String(err)}`);
        setLoading(false);
      }
    };

    if (userName) {
      fetchUserData();
    }
  }, [userName]);
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-5 text-4xl font-semibold tracking-wider md:text-6xl">
        <span className="loader h-9 w-9 border-[5px] border-blue-500/80 md:h-12 md:w-12"></span>
        <span className="opacity-95">Loading...</span>
      </div>
    );
  }

  if (error) {
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
        PHOTO_URL: photos.data[userName],
      }}
    />
  );
}
