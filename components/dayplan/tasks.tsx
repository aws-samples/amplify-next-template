import { FC, useEffect, useState } from "react";
import { IoCheckboxSharp, IoSquareOutline } from "react-icons/io5";
import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import {
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
  sortByDate,
} from "@/helpers/functional";
import { flow, get, map } from "lodash/fp";
import { useRouter } from "next/router";
import { projectTasksSelectionSet } from "@/helpers/selection-sets";

const client = generateClient<Schema>();

type NonProjectTask = {
  task: string;
  // done?: Nullable<boolean>;
  // context: string;
};

type TasksProps = {
  day: string;
  dayPlanId: string;
};

const Tasks: FC<TasksProps> = ({ day, dayPlanId }) => {
  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [errorsTaskCreation, setErrorTaskCreation] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { context } = useAppContext();
  const router = useRouter();

  const switchDone =
    (id: string, projects: Project, done?: Nullable<boolean>) => async () => {
      if (!projects) {
        return;
      }
      // @ts-expect-error
      const { data, errors } = await client.models.DayProjectTask.update({
        id,
        done: !done,
      });

      return;
    };

  const mapTaskItems = () =>
    projectTasks
      .filter(({ projects }) => projects.context === context)
      .sort((a, b) => flow(map(get("createdAt")), sortByDate())([a, b]))
      .map(({ id, task, done, projects, createdAt }) => ({
        id,
        title: task,
        description: makeProjectName(projects),
        detailOnClick: () => router.push(`/tasks/${id}`),
        iconOnClick: switchDone(id, projects, done),
        Icon: !done ? <IoSquareOutline /> : <IoCheckboxSharp />,
      }));

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
        ...projectTasks,
        {
          id: crypto.randomUUID(),
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

    // @ts-expect-error
    const subProjectTasks = client.models.DayProjectTask.observeQuery(
      // @ts-ignore
      projectTasksQuery
    ).subscribe({
      next: ({ items, isSynced }: SubNextFunctionParam<ProjectTask>) => {
        setProjectTasks([...items]);
      },
    });
    return () => {
      subProjectTasks.unsubscribe();
    };
  }, [dayPlanId]);

  return (
    <div>
      {projectTasks && <ListView listItems={mapTaskItems()} />}
      {isTodayOrFuture(day) && showAddTaskForm && (
        <div>
          <TaskForm onSubmit={createTask} />
          {errorsTaskCreation &&
            errorsTaskCreation.map((msg, idx) => <div key={idx}>{msg}</div>)}
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
