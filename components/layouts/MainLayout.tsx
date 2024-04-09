import Head from "next/head";
import { FC, ReactNode, useEffect, useRef } from "react";
import contextStyles from "./ContextColors.module.css";
import styles from "./MainLayout.module.css";
import { Context, useContextContext } from "@/contexts/ContextContext";
import CategoryTitle, { CategoryTitleProps } from "@/components/CategoryTitle";
import Header from "@/components/header/Header";
import { useRouter } from "next/router";
import { addKeyDownListener } from "@/helpers/keyboard-events/main-layout";
import NavigationMenu from "@/components/navigation-menu/NavigationMenu";
import {
  NavMenuContextProvider,
  useNavMenuContext,
} from "@/contexts/NavMenuContext";
import { addOutsideMenuClickListener } from "@/helpers/mouse-events/navigation";

type MainLayoutProps = CategoryTitleProps & {
  context?: Context;
  recordName?: string;
  sectionName: string;
  children: ReactNode;
};

export const MainLayoutInner: FC<MainLayoutProps> = ({
  children,
  recordName,
  sectionName,
  context: propsContext,
  ...categoryTitleProps
}) => {
  const { menuIsOpen, toggleMenu } = useNavMenuContext();
  const { context: storedContext, setContext } = useContextContext();
  const context = propsContext || storedContext || "family";
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => addKeyDownListener(router, setContext), [router, setContext]);
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
      <div className={context ? contextStyles[`${context}ColorScheme`] : ""}>
        <Header context={context} />
        <div
          className={`${styles.navMenu} ${menuIsOpen ? styles.menuIsOpen : ""}`}
        >
          <NavigationMenu context={context} ref={menuRef} />
        </div>
        <main
          className={`${styles.page} ${menuIsOpen ? styles.blurContent : ""}`}
        >
          <div className={styles.pageContent}>
            <div className={styles.sheet}>
              <div className={styles.categoryWrapper}>
                <CategoryTitle {...(categoryTitleProps || {})} />
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
    <MainLayoutInner {...props} />
  </NavMenuContextProvider>
);

export default MainLayout;
