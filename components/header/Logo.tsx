import { Context } from "../navigation-menu/AppContext";
import styles from "./Logo.module.css";
type LogoProps = {
  context: Context;
};
export default function Logo({ context }: LogoProps) {
  return (
    <div className={styles.logoNameWrapper}>
      <div className={styles.logoIcon}></div>
      <div className={styles.appNameWrapper}>
        <div className={styles.appName}>{context || "Impulso"}</div>
      </div>
    </div>
  );
}
