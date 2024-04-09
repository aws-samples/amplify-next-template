import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import useSWR from "swr";

const client = generateClient<Schema>();

const fetchProjectTask = (taskId: string) => () =>
  client.models.DayProjectTask.get({ id: taskId }).then(
    ({ data: { id, task, done, projectsDayTasksId } }) => ({
      id,
      task,
      done,
      projectId: projectsDayTasksId,
    })
  );

const fetchNonProjectTask = (taskId: string) => () =>
  client.models.NonProjectTask.get({ id: taskId }).then(
    ({ data: { id, task, done } }) => ({
      id,
      task,
      done,
    })
  );

const useTask = (taskId: string) => {
  const {
    data: projectTask,
    error: errorProjectTask,
    isLoading: loadingProjectTask,
    mutate: mutateProjectTask,
  } = useSWR(`/api/projectTask/${taskId}`, fetchProjectTask(taskId));
  const {
    data: nonProjectTask,
    error: errorNonProjectTask,
    isLoading: loadingNonProjectTask,
    mutate: mutateNonProjectTask,
  } = useSWR(`/api/nonProjectTask/${taskId}`, fetchNonProjectTask(taskId));

  return {
    task: projectTask || nonProjectTask,
    errorTask: errorProjectTask || errorNonProjectTask,
    loadingTask: loadingProjectTask || loadingNonProjectTask,
  };
};

export default useTask;
