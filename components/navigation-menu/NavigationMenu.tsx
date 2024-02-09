import React, { forwardRef } from "react";
import styles from "./NavigationMenu.module.css";
import ContextSwitcher from "./ContextSwitcher";
import MainNavigationSection from "./MainNavigationSection";
type NavigationMenuProps = {
  isOpen: boolean;
  closeMenu: () => void;
};

const NavigationMenu = forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ isOpen, closeMenu }, ref) => {
    return (
      <div
        className={`${styles.menu} ${isOpen ? styles.isOpen : ""}`}
        ref={ref}
      >
        {/* <div className={styles.searchSection}>
        <SearchBar />
      </div> */}
        <div className={styles.contextSection}>
          <ContextSwitcher />
        </div>
        <div className={styles.navigationSection}>
          <MainNavigationSection closeMenu={closeMenu} />
        </div>
        {/* <div className={styles.linksSection}>Additional Navigation Items</div> */}
      </div>
    );
  }
);

NavigationMenu.displayName = "NavigationMenu";
export default NavigationMenu;
