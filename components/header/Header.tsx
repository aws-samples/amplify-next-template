import { Context } from "@/contexts/AppContext";
import { FC } from "react";
import contextStyles from "../layouts/ContextColors.module.css";
import styles from "./Header.module.css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ProfilePicture from "./ProfilePicture";

type HeaderProps = {
  context?: Context;
  logoOnly?: boolean;
};

const Header: FC<HeaderProps> = ({ context, logoOnly }) => {
  const menuIsOpen = false;
  const toggleMenu = () => {};

  return logoOnly ? (
    <div
      className={`${context ? contextStyles[`${context}ColorScheme`] : ""} ${
        styles.logoOnlyWrapper
      } ${menuIsOpen ? styles.menuIsOpen : ""}`}
    >
      <Logo context={context} logoOnly={logoOnly} />
    </div>
  ) : (
    <nav
      className={`${context ? contextStyles[`${context}ColorScheme`] : ""} ${
        styles.header
      } ${menuIsOpen ? styles.menuIsOpen : ""}`}
    >
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          <SearchBar context={context} />
        </div>
        <div className={styles.headerMid} onClick={toggleMenu}>
          <Logo context={context} logoOnly={logoOnly} />
        </div>
        <div className={styles.headerRight}>
          <ProfilePicture />
        </div>
      </div>
    </nav>
  );
};

export default Header;
