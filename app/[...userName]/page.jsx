import { Suspense } from "react";
import UserProfileClient from "@/components/UserProfileClient";

// We provide a dummy param so Next.js builds the route structure.
// In production, your _redirects file will point all usernames to this file.
export async function generateStaticParams() {
  return [{ userName: ["_placeholder"] }];
}

const UserProfilePage = async ({ params }) => {
  const resolvedParams = await params;

  // Extract username. If it's our placeholder or missing, the client
  // component will handle the logic/fetching.
  const userName = Array.isArray(resolvedParams.userName)
    ? resolvedParams.userName[0]
    : resolvedParams.userName;

  return (
    <main>
      <Suspense fallback={
        <div className="flex min-h-screen items-center justify-center gap-5 text-4xl font-semibold tracking-wider md:text-6xl">
          <span className="loader h-9 w-9 border-[5px] border-blue-500/80 md:h-12 md:w-12"></span>
          <span className="opacity-95">Loading...</span>
        </div>
      }>
        <UserProfileClient userName={userName} />
      </Suspense>
    </main>
  );
};

export default UserProfilePage;
