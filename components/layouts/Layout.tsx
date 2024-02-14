import PageWrapper from "@/components/PageWrapper";
import Header from "../header/Header";
import { ReactNode, useEffect, useRef, useState } from "react";
import CategoryTitle, { CategoryTitleProps } from "../CategoryTitle";
import styles from "./Layout.module.css";
import NavigationMenu from "../navigation-menu/NavigationMenu";
import { useAppContext } from "../navigation-menu/AppContext";

type LayoutProps = CategoryTitleProps & {
  children: ReactNode;
};

export default function Layout({
  children,
  ...categoryTitleProps
}: LayoutProps) {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const { context } = useAppContext();

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenuVisibility = () => {
    setMenuVisibility(!isMenuVisible);
  };

  const handleClickOutsideMenu = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuVisibility(false);
      event.stopPropagation();
    }
  };

  useEffect(() => {
    if (isMenuVisible) {
      document.addEventListener("mousedown", handleClickOutsideMenu);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [isMenuVisible]);

  return (
    <PageWrapper>
      <div
        className={
          {
            family: styles.familyColorScheme,
            hobby: styles.hobbyColorScheme,
            work: styles.workColorScheme,
          }[context]
        }
      >
        <Header toggleMenu={toggleMenuVisibility} menuIsOpen={isMenuVisible} />
        <NavigationMenu
          ref={menuRef}
          isOpen={isMenuVisible}
          closeMenu={() => setMenuVisibility(false)}
        />
        <main
          className={`${styles.page} ${isMenuVisible ? styles.menuOpen : ""}`}
        >
          <div className={styles.pageContent}>
            <div
              className={`${styles.sheet} ${styles.sheetVh} ${styles.sheetContent}`}
            >
              <div className={styles.categoryWrapper}>
                <CategoryTitle {...(categoryTitleProps || {})} />
                <div className={styles.categoryContent}>{children}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}
