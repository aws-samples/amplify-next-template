import { IconType } from "react-icons";
import styles from "./MainNavigationSection.module.css";
import { BiConversation } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import { PiHandFist } from "react-icons/pi";
import { useRouter } from "next/router";

type MainNavigationSectionProps = {
  closeMenu: () => void;
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

function MainNavigationSection({ closeMenu }: MainNavigationSectionProps) {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      {menuItems.map(({ name, link, Icon }, idx) => (
        <button
          key={idx}
          className={styles.menuItem}
          onClick={() => {
            closeMenu();
            router.push(link);
          }}
        >
          <div className={styles.menuIcon}>
            <Icon />
          </div>
          <div className={styles.menuLabel}>{name}</div>
        </button>
      ))}
    </div>
  );
}
export default MainNavigationSection;
