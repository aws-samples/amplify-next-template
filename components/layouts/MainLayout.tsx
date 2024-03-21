import Head from "next/head";
import { FC, ReactNode, useEffect, useRef } from "react";
import contextStyles from "./ContextColors.module.css";
import styles from "./MainLayout.module.css";
import {
  ContextContextProvider,
  Context,
  useContextContext,
} from "../../contexts/ContextContext";
import CategoryTitle from "../NewCategoryTitle";
import Header from "../header/Header";
import { useRouter } from "next/router";
import { contextLocalStorage } from "@/stories/components/navigation-menu/helpers";
import { addKeyDownListener } from "@/helpers/keyboard-events/main-layout";
import NavigationMenu from "../navigation-menu/NavigationMenu";
import {
  NavMenuContextProvider,
  useNavMenuContext,
} from "@/contexts/NavMenuContext";
import { addOutsideMenuClickListener } from "@/helpers/mouse-events/navigation";

type MainLayoutProps = {
  title?: string; // WIP
  addButton?: any; // WIP
  context?: Context;
  recordName?: string;
  sectionName: string;
  children: ReactNode;
};

export const MainLayoutInner: FC<MainLayoutProps> = ({
  children,
  recordName,
  sectionName,
  ...props
}) => {
  const { menuIsOpen, toggleMenu } = useNavMenuContext();
  const { context: storedContext } = useContextContext();
  const context = props.context || storedContext || "family";
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => addKeyDownListener(router), [router]);
  useEffect(
    () => addOutsideMenuClickListener(menuRef, menuIsOpen, toggleMenu),
    [menuIsOpen, toggleMenu]
  );

  return (
    <div>
      <Head>
        <title>{`Impulso ${
          recordName ? `- ${recordName}` : ""
        } · ${sectionName}`}</title>
      </Head>
      <div
        className={`${context ? contextStyles[`${context}ColorScheme`] : ""}`}
      >
        <Header context={context} />
        <div className={styles.navMenu}>
          <NavigationMenu context={context} ref={menuRef} />
        </div>
        <main className={`${styles.page} ${menuIsOpen ? styles.menuOpen : ""}`}>
          <div className={styles.pageContent}>
            <div
              className={`${styles.sheet} ${styles.sheetVh} ${styles.sheetContent}`}
            >
              <div className={styles.categoryWrapper}>
                <CategoryTitle />
                <div className={styles.categoryContent}>{children}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const MainLayout: FC<MainLayoutProps> = (props) => (
  <NavMenuContextProvider>
    <ContextContextProvider useContextHook={() => contextLocalStorage}>
      <MainLayoutInner {...props} />
    </ContextContextProvider>
  </NavMenuContextProvider>
);

export default MainLayout;
