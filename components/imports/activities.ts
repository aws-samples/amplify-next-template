import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { logger } from "@/helpers/functional";
import { compact } from "lodash/fp";
const client = generateClient<Schema>();

export type ImportActivityData = {
  notionId: number;
  notes: string;
  fromMeeting?: number;
  forProjects: number[];
  finishedOn: string;
};

/** =============================== */
/**        CREATE ACTIVITIES        */
/** =============================== */
export const createActivities = async (importData: string) => {
  logger()("ACTIVITY CREATION STARTED...");
  const newData = JSON.parse(importData) as ImportActivityData[];
  logger()("Loading Projects[] data...");
  const projects = await (
    await client.models.Projects.list({ limit: 1000 })
  ).data;
  logger()("Loading Meeting[] data...");
  const meetings = await (
    await client.models.Meeting.list({ limit: 1000 })
  ).data;
  logger()("Loading Activity[] data...");
  const activities = await (
    await client.models.Activity.list({ limit: 1000 })
  ).data;
  const newActivities = await Promise.all(
    newData.map(createActivity(activities, meetings))
  );
  createActivityProjects(compact(newActivities), projects, newData);
};

const createActivity: CreateActivityFn =
  (activities, meetings) =>
  async ({ fromMeeting, forProjects, ...rest }) => {
    const idLogger = logger(rest.notionId);
    idLogger("Processing Activity...");
    const exists = activities.find(
      ({ notionId }) => notionId === rest.notionId
    );
    if (exists) {
      idLogger("Activity exists already. Skip import");
      return exists;
    }
    if (fromMeeting) {
      idLogger("Activity is linked to meeting; querying meeting");
      const forMeeting = meetings.find(
        ({ notionId }) => notionId === fromMeeting
      );
      if (forMeeting) {
        idLogger("Create Activity");
        const { data: newActivity, errors } =
          await client.models.Activity.create({
            forMeeting,
            ...rest,
          });
        if (errors) {
          idLogger("Error", errors);
          return;
        }
        idLogger("Activity created", newActivity.id);
        return newActivity;
      }
      idLogger(
        "Couldn't find meeting; will create activitiy without link to meeting"
      );
    }
    idLogger("Create Activity");
    const { data: newActivity, errors } = await client.models.Activity.create({
      ...rest,
    });
    if (errors) {
      idLogger("Error", errors);
      return;
    }
    idLogger("Activity created", newActivity.id);
    return newActivity;
  };

/** ====================================== */
/**        CREATE ACTIVITY PROJECTS        */
/** ====================================== */
const createActivityProjects: CreateActivityProjectFn = (
  activities,
  projects,
  importData
) => {
  logger()("CREATE ACTIVITY PROJECTS...");
  activities.map(async (activity) => {
    const idLogger = logger(activity.notionId);
    idLogger("Query notes for project...");
    const projectIds = importData.find(
      ({ notionId }) => notionId === activity.notionId
    )?.forProjects;
    if (!projectIds) {
      idLogger("No related projects");
      return;
    }
    projectIds.map(async (projectId) => {
      idLogger("Link activity with project", projectId);
      const project = projects.find(({ notionId }) => notionId === projectId);
      if (!project) {
        idLogger("No project found", projectId);
        return;
      }
      const { data: exists } = await client.models.ProjectActivity.list({
        filter: {
          projectsId: { eq: project.id },
          activityId: { eq: activity.id },
        },
      });
      if (exists && exists.length > 0) {
        idLogger("Link between activity and project exist already");
        return;
      }
      idLogger("Link Activity with Project", project.project);
      const { data: newProject, errors } =
        await client.models.ProjectActivity.create({
          activity,
          projects: project,
        });
      if (errors) {
        idLogger("Error", errors);
        return;
      }
      idLogger("Link created", newProject.id);
    });
  });
  return;
};

type CreateActivityFn = (
  activities: Schema["Activity"][],
  meetings: Schema["Meeting"][]
) => (data: ImportActivityData) => Promise<Schema["Activity"] | undefined>;

type CreateActivityProjectFn = (
  activities: Schema["Activity"][],
  projects: Schema["Projects"][],
  data: ImportActivityData[]
) => void;
