import ListItem, { ListItemProps } from "./ListItem";
import styles from "./ListView.module.css";

type ListViewProps = {
  listItems: ListItemProps[];
};

export default function ListView(props: ListViewProps) {
  return (
    <section className={styles.listView}>
      {props.listItems.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}
    </section>
  );
}
