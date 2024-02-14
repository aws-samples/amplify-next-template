import { FC, useEffect, useMemo, useState } from "react";
import { IoCheckboxSharp, IoSquareOutline } from "react-icons/io5";
import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import {
  NonProjectTask,
  Nullable,
  Project,
  ProjectTask,
  SubNextFunctionParam,
} from "@/helpers/types";
import { useAppContext } from "../navigation-menu/AppContext";
import TaskForm from "../forms/task";
import ListView from "../lists/ListView";
import {
  ApiErrorType,
  handleApiErrors,
  isTodayOrFuture,
  makeProjectName,
} from "@/helpers/functional";
import { useRouter } from "next/router";
import {
  otherTasksSelectionSet,
  projectTasksSelectionSet,
} from "@/helpers/selection-sets";

const client = generateClient<Schema>();

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
    async () => {
      if (!projects) {
        // @ts-expect-error
        const { data, errors } = await client.models.NonProjectTask.update({
          id,
          done: !done,
        });
        return;
      }
      // @ts-expect-error
      const { data, errors } = await client.models.DayProjectTask.update({
        id,
        done: !done,
      });

      return;
    };

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

  const handleResult = (errors: ApiErrorType[] | undefined) => {
    if (errors) {
      handleApiErrors(errors, "Error creating task");
      return;
    }
    setSuccessMessage("Task created");
    setShowAddTaskForm(false);
  };

  const createNonProjectTask = async (task: string) => {
    const { data, errors } = await client.models.NonProjectTask.create({
      task,
      context,
      dayPlanTasksId: dayPlanId,
    });
    handleResult(errors);
  };

  const createProjectTask = async (task: string, project: Project) => {
    const { data, errors } = await client.models.DayProjectTask.create({
      task,
      dayPlanProjectTasksId: dayPlanId,
      projectsDayTasksId: project.id,
    });
    handleResult(errors);
    if (data) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProjectTasks([
        ...(projectTasks || []),
        {
          id: data.id,
          task,
          projects: project,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const createTask = async (task: string, selectedProject: Project | null) => {
    if (selectedProject === null) {
      createNonProjectTask(task);
      return;
    }
    createProjectTask(task, selectedProject);
  };

  useEffect(() => {
    const projectTasksQuery = {
      filter: { dayPlanProjectTasksId: { eq: dayPlanId } },
      selectionSet: projectTasksSelectionSet,
    };
    const observeDayProjectTask = client.models.DayProjectTask.observeQuery;
    // @ts-expect-error
    const subProjectTasks = observeDayProjectTask(projectTasksQuery).subscribe({
      next: ({ items, isSynced }: SubNextFunctionParam<ProjectTask>) => {
        setProjectTasks([...(items || [])]);
      },
    });

    const otherTasksQuery = {
      filter: { dayPlanTasksId: { eq: dayPlanId }, context: { eq: context } },
      selectionSet: otherTasksSelectionSet,
    };
    const observeOtherTask = client.models.NonProjectTask.observeQuery;
    // @ts-expect-error
    const subOtherTasks = observeOtherTask(otherTasksQuery).subscribe({
      next: ({ items, isSynced }: SubNextFunctionParam<NonProjectTask>) => {
        setNonProjectTasks([...(items || [])]);
      },
    });

    return () => {
      subProjectTasks.unsubscribe();
      subOtherTasks.unsubscribe();
    };
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
