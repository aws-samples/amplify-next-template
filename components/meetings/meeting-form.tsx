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
import SavedState from "../ui-elements/saved-state";
import { Descendant } from "slate";
import {
  initialValue,
  noteHasContent,
} from "../ui-elements/notes-writer/helpers";

type MeetingFormProps = {
  meetingId: string;
};

const MeetingForm: FC<MeetingFormProps> = (props) => {
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState<Descendant[]>(initialValue);
  const [dateTitleSaved, setDateTitleSaved] = useState(
    Boolean(props.meetingId)
  );
  const [notesSaved, setNotesSaved] = useState(true);
  const [participantsSaved, setParticipantsSaved] = useState(true);
  const [allSaved, setAllSaved] = useState(Boolean(props.meetingId));
  const router = useRouter();
  const { context } = useAppContext();

  useEffect(() => {
    setAllSaved(dateTitleSaved && notesSaved && participantsSaved);
  }, [dateTitleSaved, notesSaved, participantsSaved]);

  useEffect(() => {
    setDateTitleSaved(Boolean(props.meetingId));
    if (!props.meetingId) return;
    getMeeting(props.meetingId as string, setMeeting);
  }, [props.meetingId]);

  const saveNewMeetingTitle = async (newTitle: string) => {
    if (!meeting) return;
    if (newTitle === meeting?.topic) return;
    const data = await updateMeetingTitle(meeting.id, newTitle);
    if (!data) return;
    setMeeting({ ...meeting, topic: data.topic });
    setDateTitleSaved(true);
  };

  const handleBackBtnClick = () => {
    router.push("/meetings");
  };

  const closeMeeting = async () => {
    if (!meeting) return;
    if (noteHasContent(newNote)) {
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
    setParticipantsSaved(false);
    const data = await createMeetingParticipant(meeting.id, person.id);
    if (!data) return;
    setParticipantsSaved(true);
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
          setEditNoteId,
          setNotesSaved
        )
      : addProjectToMeetingActivity(
          meeting,
          editNoteId,
          project,
          setMeeting,
          setNotesSaved
        );

  const saveActivity = async () => {
    if (!meeting) return;
    if (!notesSaved) {
      const editedActivity = meeting.activities.find(
        (a) => a.id === editNoteId
      );
      if (!editedActivity) {
        alert("Please add at least one project before saving the note");
        return;
      }
      const activity = await updateActivity(
        editedActivity.id,
        editedActivity.slateNotes
      );
      if (!activity) return;
      setNotesSaved(true);
    }
    setEditNoteId(null);
    setNewNote(initialValue);
  };

  const handleNoteEditing = (note: Descendant[]) => {
    if (!meeting) return;
    setNotesSaved(false);
    if (!editNoteId) {
      setNewNote(note);
      return;
    }
    setMeeting({
      ...meeting,
      activities: meeting.activities.map((activity) =>
        activity.id !== editNoteId
          ? activity
          : { ...activity, slateNotes: note }
      ),
    });
    const activity = meeting.activities.find((a) => a.id === editNoteId);
    if (!activity) return;
    debouncedSaveActivityNotes(activity, note, setNotesSaved);
  };

  const createPerson = async (personName: string) => {
    if (!meeting) return;
    const data = await createPersonApi(personName);
    if (!data) return;
    addParticipant({ id: data.id, name: data.name, accountRoles: [] });
  };

  const createProject = async (projectName: string) => {
    setNotesSaved(false);
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
    setDateTitleSaved(false);
    const newMeeting: Meeting = {
      ...meeting,
      meetingOn: date.toISOString(),
    };
    setMeeting(newMeeting);
    debouncedSaveMeetingDateTime(meeting.id, date, setDateTitleSaved);
  };

  const handleEditNote = (noteId: string) => {
    if (!!editNoteId) {
      saveActivity();
      setNewNote(initialValue);
    }
    if (noteHasContent(newNote)) {
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
      recordName={meeting?.topic}
      sectionName="Meeting"
      saveTitle={saveNewMeetingTitle}
      onTitleChange={() => setDateTitleSaved(false)}
      onBackBtnClick={handleBackBtnClick}
    >
      {!meeting ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className={styles.inOneLine}>
            <SubmitButton onClick={closeMeeting}>
              <strong>Close Meeting</strong>
            </SubmitButton>
            <SavedState saved={allSaved} className={styles.meetingSaved} />
          </div>
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
          {meeting.activities.map(({ id, forProjects, slateNotes }) => (
            <ProjectNotesForm
              key={id}
              isEditing={editNoteId === id}
              forProjects={forProjects?.map(({ projects }) => projects)}
              onSelectProject={addProjectToSelection}
              notes={slateNotes}
              onSubmit={
                editNoteId === id ? saveActivity : () => handleEditNote(id)
              }
              onNoteChange={handleNoteEditing}
              onCreateProject={createProject}
            >
              {editNoteId === id && (
                <SavedState
                  saved={notesSaved}
                  className={styles.saveStatusMsg}
                />
              )}
            </ProjectNotesForm>
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
            >
              <SavedState saved={notesSaved} className={styles.saveStatusMsg} />
            </ProjectNotesForm>
          )}
        </div>
      )}
    </Layout>
  );
};
export default MeetingForm;
