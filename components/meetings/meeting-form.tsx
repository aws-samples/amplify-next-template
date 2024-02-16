import { Meeting, Participant, Project } from "@/helpers/types/data";
import { FC, useEffect, useMemo, useState } from "react";
import Layout from "@/components/layouts/Layout";
import SubmitButton from "../ui-elements/submit-button";
import DateSelector from "../ui-elements/date-selector";
import PersonName from "../ui-elements/person-name";
import styles from "./Meetings.module.css";
import PeopleSelector from "../ui-elements/people-selector";
import { useRouter } from "next/router";
import { getMeeting } from "@/helpers/api-operations/get";
import {
  createMeetingParticipant,
  createPerson as createPersonApi,
  createProject as createProjectApi,
} from "@/helpers/api-operations/create";
import ProjectNotesForm from "./project-notes-form";
import {
  updateActivity,
  updateMeetingTitle,
} from "@/helpers/api-operations/update";
import { useAppContext } from "../navigation-menu/AppContext";
import {
  addProjectToMeetingActivity,
  addProjectToNewNote,
  debouncedSaveActivityNotes,
  debouncedSaveMeetingDateTime,
} from "./helpers/meetings";

type MeetingFormProps = {
  meetingId: string;
};

const MeetingForm: FC<MeetingFormProps> = (props) => {
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState("");
  const router = useRouter();
  const { context } = useAppContext();

  useEffect(() => {
    if (!props.meetingId) return;
    getMeeting(props.meetingId as string, setMeeting);
  }, [props.meetingId, editNoteId]);

  const handleTitleChange = async (newTitle: string) => {
    if (!meeting) return;
    if (newTitle === meeting?.topic) return;
    const data = await updateMeetingTitle(meeting.id, newTitle);
    if (!data) return;
    setMeeting({ ...meeting, topic: data.topic });
  };

  const handleBackBtnClick = () => {
    router.push("/meetings");
  };

  const closeMeeting = async () => {
    if (!meeting) return;
    if (newNote.trim().length > 2) {
      alert(
        "You have not saved your latest note. Scroll down and add a project to save your note"
      );
      return;
    }
    if (!!editNoteId) {
      await saveActivity();
    }
    router.push(`/meetings/${meeting.id}`);
  };

  const addParticipant = async (person: Participant | null) => {
    if (!person) return;
    if (!meeting) return;
    const data = await createMeetingParticipant(meeting.id, person.id);
    if (!data) return;
    const newMeetingData: Meeting = {
      ...meeting,
      participants: [...(meeting.participants || []), { person }],
    };
    setMeeting(newMeetingData);
  };

  const addProjectToSelection = (project: Project | null) =>
    !project || !meeting
      ? null
      : !editNoteId
      ? addProjectToNewNote(
          newNote,
          project,
          meeting,
          setNewNote,
          setMeeting,
          setEditNoteId
        )
      : addProjectToMeetingActivity(meeting, editNoteId, project, setMeeting);

  const saveActivity = async () => {
    if (!meeting) return;
    const editedActivity = meeting.activities.find((a) => a.id === editNoteId);
    if (!editedActivity) {
      alert("Please add at least one project before saving the note");
      return;
    }
    const activity = await updateActivity(
      editedActivity.id,
      editedActivity.notes || ""
    );
    if (!activity) return;
    setEditNoteId(null);
    setNewNote("");
  };

  const handleNoteEditing = (note: string) => {
    if (!meeting) return;
    if (!editNoteId) {
      setNewNote(note);
      return;
    }
    setMeeting({
      ...meeting,
      activities: meeting.activities.map((activity) =>
        activity.id !== editNoteId ? activity : { ...activity, notes: note }
      ),
    });
    const activity = meeting.activities.find((a) => a.id === editNoteId);
    if (!activity) return;
    debouncedSaveActivityNotes(activity, note);
  };

  const createPerson = async (personName: string) => {
    if (!meeting) return;
    const data = await createPersonApi(personName);
    if (!data) return;
    addParticipant({ id: data.id, name: data.name, accountRoles: [] });
  };

  const createProject = async (projectName: string) => {
    const data = await createProjectApi(projectName, context);
    if (!data) return;
    const newProject = {
      id: data.id,
      project: data.project,
      context: data.context,
      batches: [],
      accounts: [],
    };
    addProjectToSelection(newProject);
  };

  const meetingOn = useMemo(
    () =>
      !meeting
        ? new Date()
        : new Date(meeting?.meetingOn || meeting?.createdAt),
    [meeting]
  );

  const handleDateChange = (date: Date) => {
    if (!meeting) return;
    const newMeeting: Meeting = {
      ...meeting,
      meetingOn: date.toISOString(),
    };
    setMeeting(newMeeting);
    debouncedSaveMeetingDateTime(meeting.id, date);
  };

  const handleEditNote = (noteId: string) => {
    if (!!editNoteId) {
      saveActivity();
      setNewNote("");
    }
    if (newNote.trim().length !== 0) {
      alert(
        "Please first add at least one project to your new note, so it can be saved; or delete your notes, if you do not need them"
      );
      return;
    }
    setEditNoteId(noteId);
  };

  return (
    <Layout
      title={meeting?.topic || "Loading..."}
      onTitleChange={handleTitleChange}
      onBackBtnClick={handleBackBtnClick}
    >
      {!meeting ? (
        <div>Loading...</div>
      ) : (
        <div>
          <SubmitButton onClick={closeMeeting}>
            <strong>Close Meeting</strong>
          </SubmitButton>
          <DateSelector
            date={meetingOn}
            setDate={handleDateChange}
            selectHours
          />
          <h3>Participants:</h3>
          <div>
            {meeting.participants.map(({ person }) => (
              <PersonName key={person.id} person={person} />
            ))}
          </div>
          <PeopleSelector
            onChange={addParticipant}
            clearAfterSelection
            onCreatePerson={createPerson}
          />
          {meeting.activities.map(({ id, forProjects, notes }) => (
            <ProjectNotesForm
              key={id}
              isEditing={editNoteId === id}
              forProjects={forProjects?.map(({ projects }) => projects)}
              onSelectProject={addProjectToSelection}
              notes={notes}
              onSubmit={
                editNoteId === id ? saveActivity : () => handleEditNote(id)
              }
              onNoteChange={handleNoteEditing}
              onCreateProject={createProject}
            />
          ))}
          {!editNoteId && (
            <ProjectNotesForm
              isNew
              onSubmit={saveActivity}
              forProjects={[]}
              notes={newNote}
              onSelectProject={addProjectToSelection}
              onNoteChange={handleNoteEditing}
              onCreateProject={createProject}
            />
          )}
        </div>
      )}
    </Layout>
  );
};
export default MeetingForm;
