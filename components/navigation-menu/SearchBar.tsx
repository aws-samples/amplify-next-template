import { IoSearchSharp } from "react-icons/io5";
import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
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
  );
}

export default SearchBar;
