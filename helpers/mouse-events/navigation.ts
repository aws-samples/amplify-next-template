import { RefObject } from "react";

export const addOutsideMenuClickListener = (
  ref: RefObject<HTMLElement>,
  isVisible: boolean,
  toggleMenu: () => void
) => {
  const handleClickOutsideMenu = (event: MouseEvent) => {
    if (
      isVisible &&
      ref.current &&
      !ref.current.contains(event.target as Node)
    ) {
      toggleMenu();
      event.stopPropagation();
    }
  };
  if (isVisible) {
    document.addEventListener("mousedown", handleClickOutsideMenu);
  } else {
    document.removeEventListener("mousedown", handleClickOutsideMenu);
  }
  return () => {
    document.removeEventListener("mousedown", handleClickOutsideMenu);
  };
};
