import { MouseEventHandler, ReactElement } from "react";
import styles from "./ListItem.module.css";
import { IoInformationCircleOutline } from "react-icons/io5";

type DetailOnClick = {
  detailOnClick: () => void;
  href?: never;
};

type DetailUrl = {
  detailOnClick?: never;
  href: string;
};

export type ListItemProps = (DetailOnClick | DetailUrl) & {
  id: string;
  title: string;
  Icon?: ReactElement;
  iconOnClick?: () => void;
  description: string;
};

export default function ListItem(props: ListItemProps) {
  const Icon = !!props.Icon ? props.Icon : <IoInformationCircleOutline />;

  const handleOnClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (!props.detailOnClick) return;
    event.preventDefault();
    props.detailOnClick();
  };

  return (
    <article className={styles.listItem}>
      <div className={styles.postLine}>
        <a
          className={styles.postCheckbox}
          onClick={() => (props.iconOnClick ? props.iconOnClick() : null)}
        >
          {Icon}
        </a>
        <a
          className={styles.postBody}
          href={props.href}
          onClick={handleOnClick}
        >
          <div className={styles.content}>
            <h3>
              <span>{props.title}</span>
            </h3>
            <p>{props.description}</p>
          </div>
        </a>
      </div>
    </article>
  );
}
