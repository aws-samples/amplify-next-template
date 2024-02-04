import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    window.localStorage.setItem("lastVisitedPage", router.pathname);
  }, [router]);

  return children;
}
