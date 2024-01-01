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

  let show = "fastest";
  if (lightest.length > 0) {
    show = "lightest";
  } else if (shortest.length > 0) {
    show = "shortest";
  }


  return (
    <main>
      <ProfilePage props={{ data, userName, show }} />
    </main>
  );
};

export default Page;
