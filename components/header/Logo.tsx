import { FC } from "react";
import { Context } from "@/contexts/ContextContext";
import contextStyles from "@/components/layouts/ContextColors.module.css";
import styles from "./Logo.module.css";

type LogoProps = {
  context?: Context;
  logoOnly?: boolean;
};

const Logo: FC<LogoProps> = ({ context, logoOnly }) => {
  return (
    <div
      className={`${context ? contextStyles[`${context}ColorScheme`] : ""} ${
        styles.logoNameWrapper
      }`}
    >
      <div className={styles.logoIcon} />
      {!logoOnly && (
        <div className={styles.appName}>{context || "Impulso"}</div>
      )}
    </div>
  );
};

export default Logo;
