import SearchBar from "./SearchBar";
import Logo from "./Logo";
import ProfilePicture from "./ProfilePicture";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <nav className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          <SearchBar />
        </div>
        <div className={styles.headerMiddle}>
          <Logo />
        </div>
        <div className={styles.headerRight}>
          <ProfilePicture />
        </div>
      </div>
    </nav>
  );
}
