import PageWrapper from "@/components/PageWrapper";
import Header from "../header/Header";
import { ReactNode, useEffect, useRef, useState } from "react";
import CategoryTitle, { CategoryTitleProps } from "../CategoryTitle";
import styles from "./Layout.module.css";
import NavigationMenu from "../navigation-menu/NavigationMenu";
import { Context } from "../navigation-menu/ContextSwitcher";

type LayoutProps = CategoryTitleProps & {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [currentContext, setContext] = useState<Context>("family");

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
          }[currentContext]
        }
      >
        <Header
          toggleMenu={toggleMenuVisibility}
          menuIsOpen={isMenuVisible}
          context={currentContext}
        />
        <NavigationMenu
          ref={menuRef}
          isOpen={isMenuVisible}
          switchContext={(context: Context) => setContext(context)}
          activeContext={currentContext}
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
                <CategoryTitle
                  title={props.title}
                  addButton={props.addButton}
                />
                <div className={styles.categoryContent}>{props.children}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}
