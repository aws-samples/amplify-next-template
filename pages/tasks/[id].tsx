import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import { tasks } from "../../components/demo-data/today";

export default function TaskDetailPage() {
  const router = useRouter();
  const id = router.query.id;
  const task = tasks.find((t) => `${t.id}` == id);
  return (
    <Layout title={task?.title || "New Task"} drawBackBtn>
      {JSON.stringify(task)}
    </Layout>
  );
}
