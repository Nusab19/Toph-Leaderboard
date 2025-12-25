import Home from "@/components/Home";
import Notice from "@/components/Notice";
import PrefetchData from "@/components/PrefetchData";

export default async function Page() {
  return (
    <main>
      <Notice />
      <Home />
      <PrefetchData />
    </main>
  );
}
