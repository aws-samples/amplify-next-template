import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.logoNameWrapper}>
      <div className={styles.logoIcon}></div>
      <div className={styles.appNameWrapper}>
        <div className={styles.appName}>Impulso</div>
      </div>
    </div>
  );
}
