import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { flow, get, split } from "lodash/fp";

type PageWrapperProps = {
  children: ReactNode;
};

const isMainPath = (p: string) =>
  ["meetings", "today", "commitments"].includes(p) ? p : "";

const storePath = (p: string) => {
  if (!p) return;
  window.localStorage.setItem("lastVisitedPage", `/${p}`);
};

export default function PageWrapper({ children }: PageWrapperProps) {
  const router = useRouter();

  useEffect(
    () => flow(split("/"), get(1), isMainPath, storePath)(router.pathname),
    [router]
  );

  return children;
}
