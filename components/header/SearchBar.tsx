import Link from "next/link";
import styles from "./SearchBar.module.css";
import { IoSearchSharp } from "react-icons/io5";

export default function SearchBar() {
  return (
    <>
      <Link className={styles.searchSmall} href="/search">
        <IoSearchSharp />
        <div className={styles.searchText}>Search</div>
      </Link>
      <div className={styles.search}>
        <div className={styles.searchInner}>
          <form className={styles.searchForm}>
            <IoSearchSharp className={styles.searchIcon} />
            <input
              className={styles.searchInputField}
              role="combobox"
              aria-controls="search"
              aria-expanded="false"
              placeholder="Search"
            ></input>
          </form>
        </div>
      </div>
    </>
  );
}
