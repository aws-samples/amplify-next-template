import PageWrapper from "@/components/PageWrapper";
import Header from "../Header";
import { ReactNode } from "react";
import CategoryTitle, { CategoryTitleProps } from "../CategoryTitle";
import styles from "./Layout.module.css";

type LayoutProps = CategoryTitleProps & {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  return (
    <PageWrapper>
      <Header />
      <main className={styles.page}>
        <div className={styles.pageContent}>
          <div
            className={`${styles.sheet} ${styles.sheetVh} ${styles.sheetContent}`}
          >
            <div className={styles.categoryWrapper}>
              <CategoryTitle title={props.title} addButton={props.addButton} />
              <div className={styles.categoryContent}>{props.children}</div>
            </div>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
