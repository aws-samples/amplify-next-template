import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { compact } from "lodash/fp";
import { logger } from "@/helpers/functional";
const client = generateClient<Schema>();

export type ImportMeetingData = {
  notionId: number;
  topic: string;
  meetingOn: string;
  participants?: number[];
  projectsDiscussed?: number[];
  newProjects?: number[];
  timeInvested: number;
};

/** ============================= */
/**        CREATE MEETINGS        */
/** ============================= */
export const createMeetings = async (importData: string) => {
  logger()("MEETING CREATION STARTED...");
  const newData = JSON.parse(importData) as ImportMeetingData[];
  logger()("Loading Person[] data...");
  const people = await (await client.models.Person.list({ limit: 1000 })).data;
  logger()("Loading Projects[] data...");
  const projects = await (
    await client.models.Projects.list({ limit: 1000 })
  ).data;
  logger()("Loading Meeting[] data...");
  const meetings = await (
    await client.models.Meeting.list({ limit: 1000 })
  ).data;
  const newMeetings = await Promise.all(newData.map(createMeeting(meetings)));
  createMeetingParticipants(compact(newMeetings), people, newData);
  createMeetingDiscussedProjects(compact(newMeetings), projects, newData);
  updateProjectsForAddedInMeetings(compact(newMeetings), projects, newData);
};

const createMeeting: CreateMeetingFn =
  (meetings) =>
  async ({ participants, projectsDiscussed, newProjects, ...rest }) => {
    const idLogger = logger(rest.notionId);
    idLogger("Processing Meeting...");
    const exists = meetings.find(({ notionId }) => notionId === rest.notionId);
    if (exists) {
      idLogger("Meetings exists already. Skip import");
      return exists;
    }
    idLogger("Create Meeting", rest.topic);
    const { data: newMeeting, errors } = await client.models.Meeting.create({
      ...rest,
    });
    if (errors) {
      idLogger("Error", errors);
      return;
    }
    idLogger("Meeting created", newMeeting.id);
    return newMeeting;
  };

/** ========================================= */
/**        CREATE MEETING PARTICIPANTS        */
/** ========================================= */
const createMeetingParticipants: CreateMeetingParticipantsFn = async (
  meetings,
  people,
  newData
) => {
  logger()("CREATE MEETING PARTICIPANTS...");
  meetings.map(async (meeting) => {
    const idLogger = logger(meeting.notionId);
    idLogger("Query participants for meeting...");
    const participants = newData.find(
      ({ notionId }) => notionId === meeting.notionId
    )?.participants;
    if (!participants) {
      idLogger("No participants");
      return;
    }
    participants.map(async (participantId) => {
      idLogger("Create participant", participantId);
      const person = people.find(({ notionId }) => notionId === participantId);
      if (!person) {
        idLogger("No person found", participantId);
        return;
      }
      const { data: exists } = await client.models.MeetingParticipant.list({
        filter: { personId: { eq: person.id }, meetingId: { eq: meeting.id } },
      });
      if (exists && exists.length > 0) {
        idLogger("MeetingParticipant exists already. Skip creation");
        return;
      }
      idLogger("Create Meeting Participant", person.name);
      const { data: newParticipant, errors } =
        await client.models.MeetingParticipant.create({
          meeting,
          person,
        });
      if (errors) {
        idLogger("Error", errors);
        return;
      }
      idLogger("Participant created", newParticipant.id);
    });
  });
  return;
};

/** ======================================= */
/**        CREATE DISCUSSED PROJECTS        */
/** ======================================= */
const createMeetingDiscussedProjects: CreateMeetingDiscussedProjectsFn = (
  meetings,
  projects,
  importData
) => {
  logger()("CREATE DISCUSSED PROJECTS IN MEETING...");
  meetings.map(async (meeting) => {
    const idLogger = logger(meeting.notionId);
    idLogger("Query discussed projects for meeting...");
    const discussedProjects = importData.find(
      ({ notionId }) => notionId === meeting.notionId
    )?.projectsDiscussed;
    if (!discussedProjects) {
      idLogger("No projects discussed");
      return;
    }
    discussedProjects.map(async (projectId) => {
      idLogger("Create link to discussed project", projectId);
      const project = projects.find(({ notionId }) => notionId === projectId);
      if (!project) {
        idLogger("No project found", projectId);
        return;
      }
      const { data: exists } = await client.models.MeetingDiscussedProject.list(
        {
          filter: {
            projectsId: { eq: project.id },
            meetingId: { eq: meeting.id },
          },
        }
      );
      if (exists && exists.length > 0) {
        idLogger("Discussed project exists already. Skip creation");
        return;
      }
      idLogger("Create link to discussed project", project.project);
      const { data: newProject, errors } =
        await client.models.MeetingDiscussedProject.create({
          meeting,
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

/** ========================================= */
/**        CREATE LINK TO NEW PROJECTS        */
/** ========================================= */
const updateProjectsForAddedInMeetings: UpdateProjectsForAddedInMeetingsFn = (
  meetings,
  projects,
  importData
) => {
  logger()("CREATE LINK TO PROJECTS CREATED IN MEETING...");
  meetings.map(async (meeting) => {
    const idLogger = logger(meeting.notionId);
    idLogger("Query new projects...");
    const createdProjects = importData.find(
      ({ notionId }) => notionId === meeting.notionId
    )?.newProjects;
    if (!createdProjects) {
      idLogger("No projects created");
      return;
    }
    createdProjects.map(async (projectId) => {
      idLogger("Create link to created project", projectId);
      const project = projects.find(({ notionId }) => notionId === projectId);
      if (!project) {
        idLogger("No project found", projectId);
        return;
      }
      idLogger("Link project to meeting", project.id);
      const { data: updatedProject, errors } =
        await client.models.Projects.update({
          id: project.id,
          createdAtMeeting: meeting,
        });
      if (errors) {
        idLogger("Error", errors);
        return;
      }
      idLogger("Link created", updatedProject.id);
    });
  });
  return;
};

type CreateMeetingFn = (
  meetings: Schema["Meeting"][]
) => (data: ImportMeetingData) => Promise<Schema["Meeting"] | undefined>;

type CreateMeetingParticipantsFn = (
  meetings: Schema["Meeting"][],
  people: Schema["Person"][],
  data: ImportMeetingData[]
) => Promise<any>;

type CreateMeetingDiscussedProjectsFn = (
  meetings: Schema["Meeting"][],
  projects: Schema["Projects"][],
  data: ImportMeetingData[]
) => void;

type UpdateProjectsForAddedInMeetingsFn = (
  meetings: Schema["Meeting"][],
  projects: Schema["Projects"][],
  data: ImportMeetingData[]
) => void;
