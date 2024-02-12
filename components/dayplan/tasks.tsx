import { FC, useEffect, useState } from "react";
import { IoCheckboxSharp, IoSquareOutline } from "react-icons/io5";
import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Nullable, Project, SubNextFunctionParam } from "@/helpers/types";
import { useAppContext } from "../navigation-menu/AppContext";
import TaskForm from "../forms/task";
import ListView from "../lists/ListView";
import {
  isTodayOrFuture,
  sortByDate,
  validBatches,
} from "@/helpers/functional";
import { filter, flow, get, join, map } from "lodash/fp";

const client = generateClient<Schema>();

export type Tasks = {
  id: number;
  title: string;
  project: string;
  due: Date;
  done: boolean;
};

type ProjectTask = {
  id: string;
  task: string;
  done?: Nullable<boolean>;
  projects: Project;
  createdAt: string;
  timeInvested?: Nullable<number>;
};

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

  const makeProjectName = (project: Project) =>
    `${project.accounts.map(({ account: { name } }) => name).join(", ")}: ${
      project.project
    }`;

  const makeProjectDescription = (project: Project) => {
    const batch = flow(
      filter(validBatches),
      map(get("sixWeekBatch.idea")),
      join(", ")
    )(project.batches);
    if (!batch) return makeProjectName(project);
    return `${makeProjectName(project)}, Batch: ${batch}`;
  };

  const switchDone =
    (id: string, projects: Project, done?: Nullable<boolean>) => async () => {
      if (!projects) {
        return;
      }
      const { data, errors } = await client.models.DayProjectTask.update({
        id,
        done: !done ? true : false,
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
        description: makeProjectDescription(projects),
        detailOnClick: () => alert(task),
        iconOnClick: switchDone(id, projects, done),
        Icon: !done ? <IoSquareOutline /> : <IoCheckboxSharp />,
      }));

  const handleResult = (
    errors: { errorType: string; message: string }[] | undefined
  ) => {
    if (errors) {
      setErrorTaskCreation(
        errors.map(({ errorType, message }) => `${errorType}: ${message}`)
      );
      return;
    }
    setErrorTaskCreation([]);
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
    const id = crypto.randomUUID();
    const { data, errors } = await client.models.DayProjectTask.create({
      id,
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
          id,
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
      selectionSet: [
        "id",
        "task",
        "done",
        "timeInvested",
        "createdAt",
        "projects.id",
        "projects.project",
        "projects.context",
        "projects.accounts.account.name",
        "projects.batches.sixWeekBatch.idea",
        "projects.batches.sixWeekBatch.context",
        "projects.batches.sixWeekBatch.sixWeekCycle.name",
        "projects.batches.sixWeekBatch.sixWeekCycle.startDate",
      ],
    };
    // @ts-expect-error
    const subProjectTasks = client.models.DayProjectTask.observeQuery(
      // @ts-expect-error
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
