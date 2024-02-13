import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { ProjectTask } from "@/helpers/types";
import { projectTasksSelectionSet } from "@/helpers/selection-sets";

const client = generateClient<Schema>();

export default function TaskDetailPage() {
  const [projectTask, setProjectTask] = useState<ProjectTask | null>(null);
  const [nonProjectTask, setNonProjectTask] = useState<
    Schema["NonProjectTask"] | null
  >(null);

  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    const loadProjectTask = async () => {
      // @ts-expect-error
      const { data, errors } = await client.models.DayProjectTask.get(
        { id },
        // @ts-expect-error
        { selectionSet: projectTasksSelectionSet }
      );
      if (data) setProjectTask(data);
    };
    loadProjectTask();
  }, [id]);

  return (
    <Layout drawBackBtn>
      <h2>{projectTask?.task}</h2>
      {JSON.stringify(projectTask)}
    </Layout>
  );
}
