import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Project } from "../types/data";
import { Context } from "@/components/navigation-menu/AppContext";
import { handleApiErrors } from "./globals";
import { transformNotesToMd } from "@/components/ui-elements/notes-writer/helpers";
import { Descendant } from "slate";

const client = generateClient<Schema>();

export const createActivity = async (
  finishedOn: Date | string,
  notes: Descendant[],
  projectsId: string,
  meetingId?: string
) => {
  const createActivityApi = client.models.Activity.create;
  const { data: newActivity, errors } = await createActivityApi({
    finishedOn:
      typeof finishedOn === "string" ? finishedOn : finishedOn.toISOString(),
    notes: transformNotesToMd(notes),
    meetingActivitiesId: meetingId,
  });

  if (errors) {
    handleApiErrors(errors, "Error creating task");
    return;
  }
  const activityId = newActivity.id;
  const createProjectActivityApi = client.models.ProjectActivity.create;
  const { data: newLink, errors: linkErrors } = await createProjectActivityApi({
    activityId,
    projectsId,
  });
  if (linkErrors) {
    handleApiErrors(linkErrors, "Error linking activity to project");
    return;
  }
  return {
    activityData: newActivity,
    linkToProject: newLink,
  };
};

const createNonProjectTask = (dayPlanId: string, task: string) =>
  client.models.NonProjectTask.create({
    task,
    dayPlanTasksId: dayPlanId,
  });

const createProjectTask = (dayPlanId: string, task: string, project: Project) =>
  client.models.DayProjectTask.create({
    task,
    dayPlanProjectTasksId: dayPlanId,
    projectsDayTasksId: project.id,
  });

export const createTask = async (
  dayPlanId: string,
  task: string,
  project: Project | null
) => {
  const { data, errors } = await (!project
    ? createNonProjectTask(dayPlanId, task)
    : createProjectTask(dayPlanId, task, project));
  if (errors) {
    handleApiErrors(errors, "Error creating task");
    return;
  }
  return data;
};

export const createMeetingParticipant = async (
  meetingId: string,
  personId: string
) => {
  const { data, errors } = await client.models.MeetingParticipant.create({
    meetingId,
    personId,
  });
  if (errors) {
    handleApiErrors(errors, "Error adding meeting participant");
    return;
  }
  return data;
};

export const createProjectActivity = async (
  activityId: string,
  projectsId: string
) => {
  const createApi = client.models.ProjectActivity.create;
  const param = {
    activityId,
    projectsId,
  };
  const { data, errors } = await createApi(param);
  if (errors) {
    handleApiErrors(errors, "Error adding meeting participant");
    return;
  }
  return data;
};

export const createPerson = async (name: string) => {
  const createPersonApi = client.models.Person.create;
  const param = { name };
  const { data, errors } = await createPersonApi(param);
  if (errors) {
    handleApiErrors(errors, "Error creating person");
    return;
  }
  return data;
};

export const createProject = async (name: string, context: Context) => {
  const createApi = client.models.Projects.create;
  const param = {
    project: name,
    context,
  };
  const { data, errors } = await createApi(param);
  if (errors) {
    handleApiErrors(errors, "Error creating person");
    return;
  }
  return data;
};

export const createCurrentContext: (
  context: Context
) => Promise<Context> = async (context) => {
  const createApi = client.models.CurrentContext.create;
  const param = {
    context,
  };
  const { data, errors } = await createApi(param);
  if (errors) return context;
  return data.context;
};

export const createMeeting = async () => {
  const createMeetingApi = client.models.Meeting.create;
  const { data, errors } = await createMeetingApi({ topic: "Meeting Topic" });
  if (errors) {
    handleApiErrors(errors, "Error creating meeting");
    return;
  }
  return data;
};

export const createDayPlan = async (
  day: string,
  dayGoal: string,
  context: Context
) => {
  const createDayPlanApi = client.models.DayPlan.create;
  const param = { day, dayGoal, context };
  const { data, errors } = await createDayPlanApi(param);
  if (errors) {
    handleApiErrors(errors, "Error creating day plan");
    return;
  }
  return data;
};
