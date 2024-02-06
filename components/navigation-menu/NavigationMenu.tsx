import React, { forwardRef } from "react";
import styles from "./NavigationMenu.module.css";
import ContextSwitcher, { Context } from "./ContextSwitcher";
import MainNavigationSection from "./MainNavigationSection";
// import SearchBar from "./SearchBar";

type NavigationMenuProps = {
  isOpen: boolean;
  closeMenu: () => void;
  switchContext: (context: Context) => void;
  activeContext: Context;
};

const NavigationMenu = forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ isOpen, switchContext, activeContext, closeMenu }, ref) => (
    <div className={`${styles.menu} ${isOpen ? styles.isOpen : ""}`} ref={ref}>
      {/* <div className={styles.searchSection}>
        <SearchBar />
      </div> */}
      <div className={styles.contextSection}>
        <ContextSwitcher
          switchContext={switchContext}
          activeContext={activeContext}
        />
      </div>
      <div className={styles.navigationSection}>
        <MainNavigationSection closeMenu={closeMenu} />
      </div>
      {/* <div className={styles.linksSection}>Additional Navigation Items</div> */}
    </div>
  )
);

NavigationMenu.displayName = "NavigationMenu";
export default NavigationMenu;
