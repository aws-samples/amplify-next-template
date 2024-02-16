import { FC, useEffect, useMemo, useState } from "react";
import { IoCheckboxSharp, IoSquareOutline } from "react-icons/io5";
import {
  NonProjectTask,
  Nullable,
  Project,
  ProjectTask,
} from "@/helpers/types/data";
import { useAppContext } from "../navigation-menu/AppContext";
import TaskForm from "./task-form";
import ListView from "../lists/ListView";
import { isTodayOrFuture } from "@/helpers/functional";
import { useRouter } from "next/router";
import { tasksSubscription } from "@/helpers/api-operations/subscriptions";
import { createTask as createTaskApi } from "@/helpers/api-operations/create";
import { switchDoneTask } from "@/helpers/api-operations/update";
import { makeProjectName } from "../ui-elements/project-name";

type TasksProps = {
  day: string;
  dayPlanId: string;
};

const Tasks: FC<TasksProps> = ({ day, dayPlanId }) => {
  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>([]);
  const [nonProjectTasks, setNonProjectTasks] = useState<NonProjectTask[]>([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { context } = useAppContext();
  const router = useRouter();

  const switchDone =
    (id: string, projects: Project | undefined, done?: Nullable<boolean>) =>
    async () =>
      await switchDoneTask(id, !!projects, done);

  const mappedTaskItems = useMemo(
    () => [
      ...projectTasks
        .filter(({ projects }) => projects.context === context)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        .map(({ id, task, done, projects }) => ({
          id,
          title: task,
          description: makeProjectName(projects),
          detailOnClick: () => router.push(`/tasks/${id}`),
          iconOnClick: switchDone(id, projects, done),
          Icon: !done ? <IoSquareOutline /> : <IoCheckboxSharp />,
        })),
      ...nonProjectTasks
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        .map(({ id, task, done }) => ({
          id,
          title: task,
          description: "",
          detailOnClick: () => {},
          iconOnClick: switchDone(id, undefined, done),
          Icon: !done ? <IoSquareOutline /> : <IoCheckboxSharp />,
        })),
    ],
    [projectTasks, nonProjectTasks, context, router]
  );

  const createTask = async (task: string, selectedProject: Project | null) => {
    const data = await createTaskApi(context, dayPlanId, task, selectedProject);
    if (!data) return;
    setSuccessMessage("Task created");
    setShowAddTaskForm(false);
  };

  useEffect(() => {
    const subscriptions = tasksSubscription(
      dayPlanId,
      context,
      setProjectTasks,
      setNonProjectTasks
    );
    return () => subscriptions.unsubscribe();
  }, [dayPlanId, context]);

  return (
    <div>
      <ListView listItems={mappedTaskItems} />

      {isTodayOrFuture(day) && showAddTaskForm && (
        <div>
          <TaskForm onSubmit={createTask} />
        </div>
      )}
      {successMessage && <div>{successMessage}</div>}
      {isTodayOrFuture(day) && !showAddTaskForm && (
        <div>
          <button onClick={() => setShowAddTaskForm(true)}>Add task</button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
