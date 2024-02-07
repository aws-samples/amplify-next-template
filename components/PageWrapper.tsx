import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

type PageWrapperProps = {
  children: ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
  const router = useRouter();

  useEffect(() => {
    window.localStorage.setItem("lastVisitedPage", router.pathname);
  }, [router]);

  return children;
}
