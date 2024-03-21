import { FC } from "react";
import { IconType } from "react-icons";
import styles from "./MainNavigationSection.module.css";
import contextStyles from "@/components/layouts/ContextColors.module.css";
import { BiConversation } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import { PiHandFist } from "react-icons/pi";
import Link from "next/link";
import { Context } from "@/contexts/ContextContext";

type MainNavigationSectionProps = {
  context?: Context;
};

type MenuItem = {
  name: string;
  link: string;
  Icon: IconType;
};

const menuItems: MenuItem[] = [
  { name: "Today's Tasks", link: "/today", Icon: GoTasklist },
  { name: "Meetings", link: "/meetings", Icon: BiConversation },
  { name: "Commitments", link: "/commitments", Icon: PiHandFist },
];

const MainNavigationSection: FC<MainNavigationSectionProps> = ({ context }) => {
  return (
    <div
      className={`${
        context ? contextStyles[`${context}ColorScheme`] : styles.noColorScheme
      } ${styles.wrapper}`}
    >
      {menuItems.map(({ name, link, Icon }, idx) => (
        <Link className={styles.menuItem} key={idx} href={link}>
          <div className={styles.menuIcon}>
            <Icon />
          </div>
          <div className={styles.menuLabel}>{name}</div>
        </Link>
      ))}
    </div>
  );
};

export default MainNavigationSection;
