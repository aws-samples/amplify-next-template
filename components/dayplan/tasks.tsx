import { FC, useEffect, useMemo, useState } from "react";
import { IoCheckboxSharp, IoSquareOutline } from "react-icons/io5";
import {
  NonProjectTask,
  Nullable,
  Project,
  ProjectTask,
} from "@/helpers/types/data";
import TaskForm from "./task-form";
import ListView from "../lists/ListView";
import { isTodayOrFuture, wait } from "@/helpers/functional";
import { tasksSubscription } from "@/helpers/api-operations/subscriptions";
import { createTask as createTaskApi } from "@/helpers/api-operations/create";
import { switchDoneTask } from "@/helpers/api-operations/update";
import { makeProjectName } from "../ui-elements/project-name";
import SubmitButton from "../ui-elements/submit-button";

type TasksProps = {
  day: string;
  dayPlanId: string;
};

const Tasks: FC<TasksProps> = ({ day, dayPlanId }) => {
  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>([]);
  const [nonProjectTasks, setNonProjectTasks] = useState<NonProjectTask[]>([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const switchDone =
    (id: string, projects: Project | undefined, done?: Nullable<boolean>) =>
    () =>
      switchDoneTask(id, !!projects, done);

  const mappedTaskItems = useMemo(
    () => [
      ...projectTasks
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        .map(({ id, task, done, projects }) => ({
          id,
          title: task,
          description: makeProjectName(projects),
          href: `/tasks/${id}`,
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
    [projectTasks, nonProjectTasks]
  );

  const createTask = async (task: string, selectedProject: Project | null) => {
    const data = await createTaskApi(dayPlanId, task, selectedProject);
    if (!data) return;
    setSuccessMessage("Task created");
    setShowAddTaskForm(false);
    await wait(500);
    if (!selectedProject)
      setNonProjectTasks([
        ...nonProjectTasks,
        {
          id: data.id,
          task: data.task,
          done: data.done,
          createdAt: data.createdAt,
        },
      ]);
    else
      setProjectTasks([
        ...projectTasks,
        {
          id: data.id,
          task: data.task,
          done: data.done,
          createdAt: data.createdAt,
          projects: selectedProject,
        },
      ]);
  };

  useEffect(() => {
    const subscriptions = tasksSubscription(
      dayPlanId,
      setProjectTasks,
      setNonProjectTasks
    );
    return () => subscriptions.unsubscribe();
  }, [dayPlanId]);

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
        <SubmitButton onClick={() => setShowAddTaskForm(true)}>
          Add task
        </SubmitButton>
      )}
    </div>
  );
};

export default Tasks;
