import { FC, forwardRef } from "react";
import ContextSwitcher from "./ContextSwitcher";
import MainNavigationSection from "./MainNavigationSection";
import styles from "./NavigationMenu.module.css";
import { Context } from "@/contexts/ContextContext";

type NavigationMenuProps = {
  context?: Context;
};

const NavigationMenu = forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ context }, ref) => {
    return (
      <div className={styles.menu} ref={ref}>
        <div className={styles.contextSection}>
          <ContextSwitcher context={context} />
        </div>
        <div className={styles.navigationSection}>
          <MainNavigationSection context={context} />
        </div>
      </div>
    );
  }
);

NavigationMenu.displayName = "NavigationMenu";
export default NavigationMenu;
