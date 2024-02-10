import Layout from "@/components/layouts/Layout";
import ListView from "@/components/lists/ListView";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import styles from "./Today.module.css";
import { tasks } from "../../components/demo-data/today";
import { useRouter } from "next/router";
import { useAppContext } from "@/components/navigation-menu/AppContext";
import { useEffect, useState } from "react";
import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();
type DayPlan = Schema["DayPlan"];

export type Tasks = {
  id: number;
  title: string;
  project: string;
  due: Date;
  done: boolean;
};

export default function TodayPage() {
  const [todos, setTodos] = useState<DayPlan[]>([])
  //const [errorMsg, setErrorMsg] = useState("")
  const { context } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    const sub = client.models.DayPlan.observeQuery()
      .subscribe({
        next: ({ items, isSynced }) => {
          setTodos([...items])
        }
      })
    return () => sub.unsubscribe()
  }, [])

  return (
    <Layout
      title="Today's Tasks v2"
      addButton={{
        label: "New",
        onClick: () => router.push("/tasks/new"),
      }}
    >
      <div>{JSON.stringify(todos)}</div>
      <ListView
        listItems={tasks.map(({ id, title, project, due, done }) => ({
          id: `${id}`,
          title,
          description: `${project}; Due: ${due.toLocaleDateString()}`,
          detailOnClick: () => router.push(`/tasks/${id}`),
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
