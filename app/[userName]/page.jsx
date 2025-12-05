import ProfilePage from "@/components/ProfilePage";
import getUser from "@/helpers/getUser";
import getLeaderboardData from "@/helpers/getLeaderboardData";

export async function generateStaticParams() {
  try {
    const data = await getLeaderboardData();

    // Extract all unique usernames from all categories
    const usernames = new Set();

    // Add usernames from fastest
    if (data.fastest) {
      Object.keys(data.fastest).forEach((username) => usernames.add(username));
    }

    // Add usernames from lightest
    if (data.lightest) {
      Object.keys(data.lightest).forEach((username) => usernames.add(username));
    }

    // Add usernames from shortest
    if (data.shortest) {
      Object.keys(data.shortest).forEach((username) => usernames.add(username));
    }

    // Convert to array of objects with userName property
    return Array.from(usernames).map((username) => ({
      userName: username,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export const revalidate = 60;

const Page = async (req) => {
  const { userName } = req.params;
  try {
    const userData = await getUser(userName);

    if (!userData.ok) {
      console.error("API returned error:", userData);
      return <div className="mt-20">Could not fetch the data</div>;
    }

    // Extract the data from the response
    const [fastest, lightest, shortest] = userData.content;
    const data = { fastest, lightest, shortest };

    let selected = "shortest";

    if (fastest.length > 0) {
      selected = "fastest";
    } else if (lightest.length > 0) {
      selected = "lightest";
    } else if (shortest.length > 0) {
      selected = "shortest";
    }

    return (
      <main>
        <ProfilePage
          props={{ data, userName, selected, PHOTO_URL: process.env.PHOTO_URL }}
        />
      </main>
    );
  } catch (error) {
    // console.error("Unexpected error fetching user data:", error);
    return (
      <div className="mt-20">
        Could not fetch the data - unexpected error
        <br />
        { String(error)}
      </div>
    );
  }
};

export default Page;

export const metadata = {
  title: "User's Profile",
};
