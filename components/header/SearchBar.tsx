import Link from "next/link";
import styles from "./SearchBar.module.css";
import contextStyles from "@/components/layouts/ContextColors.module.css";
import { IoSearchSharp } from "react-icons/io5";
import { forwardRef, useState } from "react";
import { Context } from "../../contexts/ContextContext";

type SearchBarProps = {
  context?: Context;
  alwaysBorder?: boolean;
};

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ context, alwaysBorder = false }, ref) => {
    const [searchText, setSearchText] = useState("");

    return (
      <>
        <div
          className={`${contextStyles[`${context}ColorScheme`]} ${
            alwaysBorder ? styles.alwaysBorder : ""
          } ${styles.searchSmall}`}
        >
          <Link href="/search" className={styles.searchLink}>
            <IoSearchSharp />
            <span className={styles.searchText}>Search</span>
          </Link>
        </div>
        <div
          className={`${contextStyles[`${context}ColorScheme`]} ${
            styles.search
          }`}
        >
          <div
            className={`${styles.searchInner} ${
              alwaysBorder ? styles.alwaysBorder : ""
            }`}
          >
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
  }
);

SearchBar.displayName = "SearchBar";
export default SearchBar;
