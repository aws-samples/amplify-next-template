import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const lastVisitedPage = window.localStorage.getItem("lastVisitedPage");

    if (lastVisitedPage) {
      router.push(lastVisitedPage);
    } else {
      router.push("/today");
    }
  }, [router]);

  return null;
}
