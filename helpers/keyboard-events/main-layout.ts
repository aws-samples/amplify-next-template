import { NextRouter } from "next/router";

export const addKeyDownListener = (router: NextRouter) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey) {
      const func = {
        t: () => router.push("/today"),
        m: () => router.push("/meetings"),
        c: () => router.push("/commitments"),
        k: () => console.log("Focus search bar"),
      }[event.key.toLowerCase()];
      if (func) {
        func();
      }
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
};
