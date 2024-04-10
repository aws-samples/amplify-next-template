import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import useSWR from "swr";

const client = generateClient<Schema>();

export type Task = {
  id: string;
  task: string;
  done: boolean;
  projectId?: string;
};

export const mapProjectTask: (data: Schema["DayProjectTask"]) => Task = ({
  id,
  task,
  done,
  projectsDayTasksId,
}) => ({ id, task, done: !!done, projectId: projectsDayTasksId });

export const mapNonProjectTask: (data: Schema["NonProjectTask"]) => Task = ({
  id,
  task,
  done,
}) => ({ id, task, done: !!done });

const fetchProjectTask = (taskId: string) => async () => {
  const { data, errors } = await client.models.DayProjectTask.get({
    id: taskId,
  });
  if (errors) throw errors;
  return mapProjectTask(data);
};

const fetchNonProjectTask = (taskId: string) => async () => {
  const { data, errors } = await client.models.NonProjectTask.get({
    id: taskId,
  });
  if (errors) throw errors;
  return mapNonProjectTask(data);
};

const useTask = (taskId: string) => {
  const {
    data: projectTask,
    error: errorProjectTask,
    isLoading: loadingProjectTask,
  } = useSWR(`/api/projectTask/${taskId}`, fetchProjectTask(taskId));
  const {
    data: nonProjectTask,
    error: errorNonProjectTask,
    isLoading: loadingNonProjectTask,
  } = useSWR(`/api/nonProjectTask/${taskId}`, fetchNonProjectTask(taskId));

  return {
    task: projectTask || nonProjectTask,
    errorTask: errorProjectTask || errorNonProjectTask,
    loadingTask: loadingProjectTask || loadingNonProjectTask,
  };
};

export default useTask;
