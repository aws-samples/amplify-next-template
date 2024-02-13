import Layout from "@/components/layouts/Layout";
import DateSelector from "@/components/ui-elements/date-selector";
import NotesWriter from "@/components/ui-elements/notes-writer";
import PeopleSelector from "@/components/ui-elements/people-selector";
import ProjectName from "@/components/ui-elements/project-name";
import ProjectSelector from "@/components/ui-elements/project-selector";
import SubmitButton from "@/components/ui-elements/submit-button";
import { Participant, Project } from "@/helpers/types";
import { FC, useEffect, useState } from "react";
import styles from "./Meetings.module.css";
import PersonName from "@/components/ui-elements/person-name";

type ProjectNotes = {
  projects: Project[];
  notes: string;
};

const projectNotesInitials: ProjectNotes = {
  projects: [],
  notes: "",
};

type NewMeetingProps = {};

const NewMeetingPage: FC<NewMeetingProps> = (props) => {
  const [title, setTitle] = useState("Topic");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [notes, setNotes] = useState<ProjectNotes[]>([projectNotesInitials]);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const [currentNotes, setCurrentNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [currentEditingIndex, setCurrentEditingIndex] = useState<number | null>(
    0
  );
  const [editingAddedNote, setEditingAddedNote] = useState(false);

  // Function to handle editing a specific note
  const handleEditNote = (index: number) => {
    setEditingAddedNote(false);
    handleSaveNote();
    setCurrentEditingIndex(index);
    setCurrentNotes(notes[index].notes);
    setSelectedProjects(notes[index].projects);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const addProjectToSelection = (project: Project | null) => {
    if (!project) return;
    setSelectedProjects([...selectedProjects, project]);
  };

  const addParticipant = (person: Participant | null) => {
    if (!person) return;
    setParticipants([...participants, person]);
  };

  // Function to save the currently edited note
  const handleSaveNote = (addNote?: boolean) => {
    if (currentEditingIndex !== null) {
      const updatedNotes = notes.map((note, index) => {
        if (index === currentEditingIndex) {
          return { notes: currentNotes, projects: selectedProjects };
        }
        return note;
      });
      if (!addNote) setNotes(updatedNotes);
      else setNotes([...updatedNotes, projectNotesInitials]);
      setCurrentEditingIndex(null); // Reset editing index
      setCurrentNotes(""); // Clear current note input
      setSelectedProjects([]);
    }
  };

  useEffect(() => {
    if (editingAddedNote && notes.length > 0) {
      const index = notes.length - 1;
      const note = notes[index];
      setCurrentEditingIndex(index);
      setSelectedProjects(note.projects);
      setCurrentNotes(note.notes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes.length, editingAddedNote]);

  const handleAddNote = () => {
    if (currentEditingIndex === null)
      setNotes([...notes, projectNotesInitials]);
    else handleSaveNote(true);
    setEditingAddedNote(true);
  };

  const saveMeeting = () => {
    // Meeting will be saved here
  };

  return (
    <Layout title={title} onTitleChange={handleTitleChange} drawBackBtn>
      <SubmitButton onClick={saveMeeting}>Close Meeting</SubmitButton>

      <DateSelector date={date} setDate={setDate} selectHours />
      <h2>Participants:</h2>
      <div>
        {participants.map((person) => (
          <PersonName key={person.id} person={person} />
        ))}
      </div>
      <PeopleSelector onChange={addParticipant} clearAfterSelection />
      <SubmitButton onClick={handleAddNote}>Add Note</SubmitButton>

      {notes.map(({ projects, notes }, idx) => (
        <div key={idx} className={styles.projectNote}>
          {currentEditingIndex === idx ? (
            <div>
              <strong>Projects</strong>
              {selectedProjects.map((project) => (
                <div key={project.id}>
                  <ProjectName key={project.id} project={project} />
                </div>
              ))}
              <div>Add project</div>
              <ProjectSelector onChange={addProjectToSelection} />
              <strong>Notes</strong>
              <NotesWriter note={currentNotes} setNote={setCurrentNotes} />
              <SubmitButton onClick={() => handleSaveNote(false)}>
                Save
              </SubmitButton>
            </div>
          ) : (
            <div>
              <strong>Projects</strong>
              {projects.map((project) => (
                <div key={project.id}>
                  <ProjectName key={project.id} project={project} />
                </div>
              ))}
              <strong>Notes</strong>
              <div>{notes}</div>
              <SubmitButton onClick={() => handleEditNote(idx)}>
                Edit
              </SubmitButton>
            </div>
          )}
        </div>
      ))}
    </Layout>
  );
};

export default NewMeetingPage;
