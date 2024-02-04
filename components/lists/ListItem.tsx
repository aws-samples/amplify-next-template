import { ReactElement } from "react";
import styles from "./ListItem.module.css";
import { IoInformationCircleOutline } from "react-icons/io5";

export type ListItemProps = {
  id: string;
  title: string;
  Icon?: ReactElement;
  detailOnClick: () => void;
  iconOnClick?: () => void;
  description: string;
};

export default function ListItem(props: ListItemProps) {
  const Icon = !!props.Icon ? props.Icon : <IoInformationCircleOutline />;
  return (
    <article className={styles.listItem}>
      <div className={styles.postLine}>
        <a
          className={styles.postCheckbox}
          onClick={() => (props.iconOnClick ? props.iconOnClick() : null)}
        >
          {Icon}
        </a>
        <a className={styles.postBody} onClick={props.detailOnClick}>
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
