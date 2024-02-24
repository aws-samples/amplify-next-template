import Link from "next/link";
import styles from "./SearchBar.module.css";
import { IoSearchSharp } from "react-icons/io5";
import { useAppContext } from "../navigation-menu/AppContext";
import { forwardRef } from "react";

type SearchBarProps = {};

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>((props, ref) => {
  const { searchText, setSearchText } = useAppContext();
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
              ref={ref}
              className={styles.searchInputField}
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
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
});

SearchBar.displayName = "SearchBar";
export default SearchBar;
