import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { logger } from "@/helpers/functional";
import { compact } from "lodash/fp";
const client = generateClient<Schema>();

type ImportDayPlanData = {
  notionId: number;
  day: string;
  dayGoal: string;
  done?: boolean;
};

type ImportNonProjectTaskData = {
  notionId: number;
  task: string;
  dayPlan: number;
  context: "family" | "hobby" | "work";
  done?: boolean;
};

type ImportProjectTaskData = {
  notionId: number;
  task: string;
  project: number;
  dayPlan: number;
  done?: boolean;
  timeInvested?: number;
};

/** ============================== */
/**        CREATE DAY PLANS        */
/** ============================== */
export const createDayPlans = async (
  dayPlanDataJson: string,
  nonProjectTaskDataJson: string,
  projectTaskDataJson: string
) => {
  logger()("DAYPLAN CREATION STARTED...");
  const dayPlanData = JSON.parse(dayPlanDataJson) as ImportDayPlanData[];
  const nonProjectTaskData = JSON.parse(
    nonProjectTaskDataJson
  ) as ImportNonProjectTaskData[];
  const projectTaskData = JSON.parse(
    projectTaskDataJson
  ) as ImportProjectTaskData[];

  logger()("Loading DayPlan[] data...");
  const dayPlans = await (await client.models.DayPlan.list()).data;
  logger()("Items loaded", dayPlans.length);

  logger()("Loading NonProjectTaskData[] data...");
  const nonProjectTasks = await (
    await client.models.NonProjectTask.list()
  ).data;
  logger()("Items loaded", nonProjectTasks.length);

  logger()("Loading ProjectTaskData[] data...");
  const projectTasks = await (
    await client.models.DayProjectTask.list({ limit: 200 })
  ).data;
  logger()("Items loaded", projectTasks.length);

  logger()("Loading Projects[] data...");
  const projects = await (
    await client.models.Projects.list({ limit: 1000 })
  ).data;
  logger()("Items loaded", projects.length);

  const newDayPlans = await Promise.all(
    dayPlanData.map(createDayPlan(dayPlans))
  );

  nonProjectTaskData.map(
    createNonProjectTask(compact(newDayPlans), nonProjectTasks)
  );

  projectTaskData.map(
    createDayProjectTask(compact(newDayPlans), projects, projectTasks)
  );
};

/** ============================= */
/**        CREATE DAY PLAN        */
/** ============================= */
const createDayPlan: CreateDayPlanFn =
  (dayPlans) =>
  async ({ ...rest }) => {
    const idLogger = logger(rest.notionId);
    idLogger("Processing DayPlan...");
    const exists = dayPlans.find(({ notionId }) => notionId === rest.notionId);
    if (exists) {
      idLogger("DayPlan exists already. Skip creation");
      return exists;
    }

    idLogger("Create DayPlan");
    const { data: newDayPlan, errors } = await client.models.DayPlan.create({
      ...rest,
    });
    if (errors) {
      idLogger("Error", errors);
      return;
    }
    idLogger("DayPlan created", newDayPlan.id);
    return newDayPlan;
  };

/** ===================================== */
/**        CREATE NON PROJECT TASK        */
/** ===================================== */
const createNonProjectTask: CreateNonProjectTaskFn =
  (dayPlans, nonProjectTasks) =>
  async ({ dayPlan, ...rest }) => {
    const idLogger = logger(rest.notionId);
    idLogger("Processing NonProjectTask...");
    const exists = nonProjectTasks.find(
      ({ notionId }) => notionId === rest.notionId
    );
    if (exists) {
      idLogger("NonProjectTask exists already. Skip creation");
      return;
    }

    idLogger("Query DayPlan");
    const dayPlanData = dayPlans.find(({ notionId }) => notionId === dayPlan);
    if (!dayPlanData) {
      idLogger("Couldn't finde DayPlan. Skip creation", dayPlan);
      return;
    }
    idLogger("Create NonProjectTask");
    const { data, errors } = await client.models.NonProjectTask.create({
      dayPlan: dayPlanData,
      ...rest,
    });
    if (errors) {
      idLogger("Error", errors);
      return;
    }
    idLogger("NonProjectTask created", data.id);
    return;
  };

/** ===================================== */
/**        CREATE DAY PROJECT TASK        */
/** ===================================== */
const createDayProjectTask: CreateDayProjectTaskFn =
  (dayPlans, projects, dayProjectTasks) =>
  async ({ project, notionId, dayPlan, ...rest }) => {
    const idLogger = logger(notionId);
    idLogger("Processing DayProjectTask...");
    const projectData = projects.find(({ notionId }) => notionId === project);
    const dayPlanData = dayPlans.find(({ notionId }) => notionId === dayPlan);
    if (!projectData || !dayPlanData) {
      idLogger(
        "Couldn't find Project or DayPlan. Skip creation.",
        project,
        dayPlan
      );
      return;
    }
    const exists = dayProjectTasks.find(
      ({ projectsDayTasksId, dayPlanProjectTasksId }) =>
        projectsDayTasksId === projectData.id &&
        dayPlanProjectTasksId === dayPlanData.id
    );
    if (exists) {
      idLogger("DayProjectTask exists already. Skip creation");
      return;
    }
    idLogger("Create DayProjectTask");

    const { data, errors } = await client.models.DayProjectTask.create({
      dayPlan: dayPlanData,
      projects: projectData,
      ...rest,
    });
    if (errors) {
      idLogger("Error", errors);
      return;
    }
    idLogger("DayProjectTask created", data.id);
    return;
  };

type CreateDayPlanFn = (
  dayPlans: Schema["DayPlan"][]
) => (dayplan: ImportDayPlanData) => Promise<Schema["DayPlan"] | undefined>;

type CreateNonProjectTaskFn = (
  dayPlans: Schema["DayPlan"][],
  nonProjectTasks: Schema["NonProjectTask"][]
) => (nonProjectTaskData: ImportNonProjectTaskData) => void;

type CreateDayProjectTaskFn = (
  dayPlans: Schema["DayPlan"][],
  projects: Schema["Projects"][],
  dayProjectTasks: Schema["DayProjectTask"][]
) => (projectTaskData: ImportProjectTaskData) => void;
