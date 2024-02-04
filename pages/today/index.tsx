import Layout from "@/components/layouts/Layout";
import ListView from "@/components/lists/ListView";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import styles from "./Today.module.css";
import { tasks } from "./_demoData";

export type Tasks = {
  id: number;
  title: string;
  project: string;
  due: Date;
  done: boolean;
};

export default function TodayPage() {
  return (
    <Layout
      title="Today's Tasks"
      addButton={{
        label: "New",
        onClick: () => alert("Test"),
      }}
    >
      <ListView
        listItems={tasks.map(({ id, title, project, due, done }) => ({
          id: `${id}`,
          title,
          description: `${project}; Due: ${due.toLocaleDateString()}`,
          detailOnClick: () => alert(`/tasks/${id}`),
          iconOnClick: () => alert(done ? "open again" : "is done now"),
          Icon: done ? (
            <IoCheckboxSharp className={styles.isDone} />
          ) : (
            <IoSquareOutline className={styles.isOpen} />
          ),
        }))}
      />
    </Layout>
  );
}
