import { use } from "react";

import ProfilePage from "@components/ProfilePage";

const Page = (req) => {
  const { userName } = req.params;
  const rootURL = process.env.ROOT_URL || "http://localhost:3000";
  const userData = use(
    fetch(`${rootURL}/api/getUser`, {
      method: "POST",
      body: JSON.stringify({ userName }),
    }),
  );
  const [fastest, lightest, shortest] = use(userData.json()).content;
  const data = { fastest, lightest, shortest };

  let selected;

  if (fastest.length > 0) {
    selected = "fastest";
  } else if (lightest.length > 0) {
    selected = "lightest";
  } else if (shortest.length > 0) {
    selected = "shortest";
  }

  return (
    <main>
      <ProfilePage props={{ data, userName, selected, PHOTO_URL:process.env.PHOTO_URL }} />
    </main>
  );
};

export default Page;


export const metadata = {
  title:"User's Profile",
}