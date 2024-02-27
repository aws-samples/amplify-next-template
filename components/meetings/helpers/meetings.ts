import { initialValue } from "@/components/ui-elements/notes-writer/helpers";
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
import { Descendant } from "slate";

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
  newNote: Descendant[],
  project: Project,
  meeting: Meeting,
  setNewNote: (newNote: Descendant[]) => void,
  setEditNoteId: (noteId: string) => void,
  setSaved: (saved: boolean) => void
) => {
  setSaved(false);
  const data = await createActivity(
    new Date(),
    newNote,
    project.id,
    meeting.id
  );
  if (!data) return;
  setSaved(true);
  setNewNote(initialValue);
  const activityId = data.activityData.id;
  setEditNoteId(activityId);
};

export const addProjectToMeetingActivity = async (
  meeting: Meeting,
  editNoteId: string,
  project: Project,
  setMeeting: (meeting: Meeting) => void,
  setSaved: (saved: boolean) => void
) => {
  if (isDuplicate(meeting, editNoteId, project)) return;
  setSaved(false);
  const data = await createProjectActivity(editNoteId, project.id);
  if (!data) return;
  setSaved(true);
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
  async (
    activity: Activity,
    notes: Descendant[],
    setSaved: (saved: boolean) => void
  ) => {
    const data = await updateActivity(activity.id, notes);
    if (!data) return;
    setSaved(true);
  },
  1000
);

export const debouncedSaveMeetingDateTime = debounce(
  async (
    meetingId: string,
    meetingOn: Date | string,
    setSaved: (saved: boolean) => void
  ) => {
    const data = await updateMeetingDateTime(meetingId, meetingOn);
    if (!data) return;
    setSaved(true);
  },
  1500
);
