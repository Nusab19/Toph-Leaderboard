import ProfilePage from "@/components/ProfilePage";

export const revalidate = 60;

const Page = async (req) => {
  const { userName } = req.params;
  const rootURL = process.env.LOCAL
    ? "http://localhost:3000"
    : process.env.ROOT_URL;

  try {
    const userData = await fetch(`${rootURL}/api/getUser`, {
      method: "POST",
      body: JSON.stringify({ userName: userName }),
      next: {
        revalidate: 120,
      },
    });

    // Check if the HTTP request itself failed
    if (!userData.ok) {
      console.error("Fetch failed with status:", userData.status);
      return <div className="mt-20">Could not fetch the data - server error</div>;
    }

    // Try to parse JSON, handle if response is not JSON
    let jsonRes;
    try {
      jsonRes = await userData.json();
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      return <div className="mt-20">Could not fetch the data - invalid response format</div>;
    }

    // Check if the API returned an error in the response body
    if (!jsonRes.ok) {
      console.error("API returned error:", jsonRes);
      return <div className="mt-20">Could not fetch the data</div>;
    }

    // Extract the data from the response
    const [fastest, lightest, shortest] = jsonRes.content;
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
    // Catch any unexpected errors (network issues, etc.)
    console.error("Unexpected error fetching user data:", error);
    return <div className="mt-20">Could not fetch the data - unexpected error</div>;
  }
};

export default Page;

export const metadata = {
  title: "User's Profile",
};
