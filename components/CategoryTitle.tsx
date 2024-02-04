import styles from "./Category.module.css";

type AddButtonProps = {
  label: string;
  onClick: () => void;
};

export type CategoryTitleProps = {
  title: string;
  addButton?: AddButtonProps;
};

export default function CategoryTitle(props: CategoryTitleProps) {
  return (
    <header className={styles.content}>
      <h1 className={`${styles.alignCenterOnMedium} ${styles.flush}`}>
        {props.title}
      </h1>
      {props.addButton && (
        <div className={styles.action}>
          <a className={styles.actionBtn} onClick={props.addButton.onClick}>
            {props.addButton.label}
          </a>
        </div>
      )}
    </header>
  );
}
