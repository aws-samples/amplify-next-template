import { FC } from "react";
import { Context } from "../navigation-menu/AppContext";
import contextStyles from "../layouts/ContextColors.module.css";
import styles from "./Logo.module.css";

type LogoProps = {
  context?: Context;
};

const Logo: FC<LogoProps> = ({ context }) => {
  return (
    <div
      className={`${context ? contextStyles[`${context}ColorScheme`] : ""} ${
        styles.logoNameWrapper
      }`}
    >
      <div className={styles.logoIcon} />
      <div className={styles.appName}>{context || "Impulso"}</div>
    </div>
  );
};

export default Logo;
