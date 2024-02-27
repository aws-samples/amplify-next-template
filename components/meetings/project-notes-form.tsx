import { FC, ReactNode } from "react";
import SubmitButton from "../ui-elements/submit-button";
import { Project } from "@/helpers/types/data";
import ProjectName from "../ui-elements/project-name";
import ProjectSelector from "../ui-elements/project-selector";
import NotesWriter from "../ui-elements/notes-writer";
import styles from "./ProjectNotes.module.css";
import { Descendant } from "slate";

type ProjectNotesFormProps = {
  className?: string;
  isEditing?: boolean;
  isNew?: boolean;
  onSubmit: () => void;
  onSelectProject: (selected: Project | null) => void;
  forProjects?: Project[];
  notes: Descendant[];
  onNoteChange: (note: Descendant[]) => void;
  onCreateProject?: (projectName: string) => void;
  children?: ReactNode;
};
const ProjectNotesForm: FC<ProjectNotesFormProps> = ({
  className,
  isEditing,
  isNew,
  onSubmit,
  forProjects,
  onSelectProject,
  notes,
  onNoteChange,
  onCreateProject,
  children,
}) => {
  return (
    <div className={className}>
      <h3 className={styles.title}>
        {isNew ? "Add new notes" : isEditing ? "Edit the Notes" : "Notes"}
      </h3>
      {children}
      <div>
        {isEditing || isNew ? (
          <NotesWriter note={notes} setNote={onNoteChange} />
        ) : (
          <NotesWriter note={notes} readonly />
        )}
      </div>

      <h4>For Projects:</h4>
      {forProjects?.map((project) => (
        <ProjectName key={project.id} project={project} />
      ))}
      {(isEditing || isNew) && (
        <ProjectSelector
          onChange={onSelectProject}
          onCreateProject={onCreateProject}
        />
      )}

      {!isNew && (
        <SubmitButton onClick={onSubmit}>
          <strong>
            {isNew ? "Add Note" : isEditing ? "Save Note" : "Edit Note"}
          </strong>
        </SubmitButton>
      )}
    </div>
  );
};
export default ProjectNotesForm;
