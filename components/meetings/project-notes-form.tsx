import { FC } from "react";
import SubmitButton from "../ui-elements/submit-button";
import { Nullable, Project } from "@/helpers/types/data";
import ProjectName from "../ui-elements/project-name";
import ProjectSelector from "../ui-elements/project-selector";
import NotesWriter from "../ui-elements/notes-writer";

type ProjectNotesFormProps = {
  className?: string;
  isEditing?: boolean;
  isNew?: boolean;
  onSubmit: () => void;
  onSelectProject: (selected: Project | null) => void;
  forProjects?: Project[];
  notes?: Nullable<string>;
  onNoteChange: (note: string) => void;
  onCreateProject?: (projectName: string) => void;
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
}) => {
  return (
    <div className={className}>
      <h3>
        {isNew ? "Add new notes" : isEditing ? "Edit the Notes" : "Notes"}
      </h3>
      <div>
        {isEditing || isNew ? (
          <NotesWriter note={notes || ""} setNote={onNoteChange} />
        ) : (
          <div>{notes}</div>
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
