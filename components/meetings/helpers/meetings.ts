import {
  createActivity,
  createProjectActivity,
} from "@/helpers/api-operations/create";
import {
  updateActivity,
  updateMeetingDateTime,
} from "@/helpers/api-operations/update";
import { Activity, Meeting, Project } from "@/helpers/types/data";
import { debounce } from "lodash";

export const isDuplicate = (
  meeting: Meeting,
  editNoteId: string,
  project: Project
) =>
  meeting.activities
    .find((a) => a.id === editNoteId)
    ?.forProjects?.some((proj) => proj.projects.id === project.id);

export const filterBySearchText =
  (searchText: string) =>
  ({ topic, activities }: Meeting) =>
    topic.toUpperCase().includes(searchText) ||
    activities.filter(
      ({ notes, forProjects }) =>
        notes?.toUpperCase().includes(searchText) ||
        (forProjects &&
          forProjects.filter(({ projects: { project } }) =>
            project.toUpperCase().includes(searchText)
          ).length > 0)
    ).length > 0;

export const addProjectToNewNote = async (
  newNote: string,
  project: Project,
  meeting: Meeting,
  setNewNote: (newNote: string) => void,
  setMeeting: (meeting: Meeting) => void,
  setEditNoteId: (noteId: string) => void
) => {
  const data = await createActivity(
    new Date(),
    newNote,
    project.id,
    meeting.id
  );
  if (!data) return;
  setNewNote("");
  const activityId = data.activityData.id;
  setEditNoteId(activityId);
};

export const addProjectToMeetingActivity = async (
  meeting: Meeting,
  editNoteId: string,
  project: Project,
  setMeeting: (meeting: Meeting) => void
) => {
  if (isDuplicate(meeting, editNoteId, project)) return;
  const data = await createProjectActivity(editNoteId, project.id);
  if (!data) return;
  setMeeting({
    ...meeting,
    activities: meeting.activities.map((activity) =>
      activity.id !== editNoteId
        ? activity
        : {
            ...activity,
            forProjects: [
              ...(activity.forProjects || []),
              { projects: project },
            ],
          }
    ),
  });
};

export const debouncedSaveActivityNotes = debounce(
  (activity: Activity, notes: string) => updateActivity(activity.id, notes),
  1000
);

export const debouncedSaveMeetingDateTime = debounce(
  (meetingId: string, meetingOn: Date | string) =>
    updateMeetingDateTime(meetingId, meetingOn),
  1500
);
