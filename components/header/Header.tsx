import SearchBar from "./SearchBar";
import Logo from "./Logo";
import ProfilePicture from "./ProfilePicture";
import styles from "./Header.module.css";
import { Context } from "../navigation-menu/ContextSwitcher";

type HeaderProps = {
  context: Context;
  toggleMenu: () => void;
  menuIsOpen: boolean;
};

export default function Header({
  menuIsOpen,
  toggleMenu,
  context,
}: HeaderProps) {
  return (
    <nav className={`${styles.header} ${menuIsOpen ? styles.menuIsOpen : ""}`}>
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          <SearchBar />
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
