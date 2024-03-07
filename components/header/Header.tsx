import SearchBar from "./SearchBar";
import Logo from "./Logo";
import ProfilePicture from "./ProfilePicture";
import styles from "./Header.module.css";
import { useAppContext } from "../../contexts/AppContext";
import { RefObject } from "react";

type HeaderProps = {
  toggleMenu: () => void;
  menuIsOpen: boolean;
  searchBarRef: RefObject<HTMLInputElement>;
};

export default function Header({
  menuIsOpen,
  toggleMenu,
  searchBarRef,
}: HeaderProps) {
  const { context } = useAppContext();
  return (
    <nav className={`${styles.header} ${menuIsOpen ? styles.menuIsOpen : ""}`}>
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          <SearchBar ref={searchBarRef} />
        </div>
        <div className={styles.headerMiddle} onClick={toggleMenu}>
          <Logo context={context} />
        </div>
        <div className={styles.headerRight}>
          <ProfilePicture />
        </div>
      </div>
    </nav>
  );
}
