import { FC } from "react";
import ContextSwitcher from "./ContextSwitcher";
import MainNavigationSection from "./MainNavigationSection";
import styles from "./NavigationMenu.module.css";
import { useAppContext } from "@/contexts/AppContext";

type NavigationMenuProps = {};

const NavigationMenu: FC<NavigationMenuProps> = () => {
  const { context } = useAppContext();

  return (
    <div className={styles.menu}>
      <div className={styles.contextSection}>
        <ContextSwitcher />
      </div>
      <div className={styles.navigationSection}>
        <MainNavigationSection context={context} />
      </div>
    </div>
  );
};

export default NavigationMenu;
