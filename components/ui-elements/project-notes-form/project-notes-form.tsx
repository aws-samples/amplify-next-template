import useActivity from "@/api/useActivity";
import useActivityProjects from "@/api/useActivityProjects";
import { FC, useState } from "react";
import ProjectName from "../tokens/project-name";
import ProjectSelector from "../project-selector";
import NotesWriter from "../notes-writer/NotesWriter";
import SavedState from "./saved-state";
import { Descendant } from "slate";
import { TransformNotesToMdFunction } from "../notes-writer/notes-writer-helpers";
import ActivityMetaData from "../activity-meta-data";
import { debouncedUpdateNotes } from "../activity-helper";

type ProjectNotesFormProps = {
  className?: string;
  activityId: string;
  createActivity?: (notes?: string) => Promise<string | undefined>;
};

const ProjectNotesForm: FC<ProjectNotesFormProps> = ({
  activityId,
  className,
  createActivity,
}) => {
  const { activity, updateNotes } = useActivity(activityId);
  const { activityProjects, loadingActivityProjects, addProjectToActivity } =
    useActivityProjects(activityId);
  const [notesSaved, setNotesSaved] = useState(true);

  const handleSelectProject = async (projectId: string | null) => {
    if (!projectId) return;
    if (createActivity) {
      const newId = await createActivity();
      if (!newId) return;
      await addProjectToActivity(projectId, newId);
      return;
    }
    await addProjectToActivity(projectId, activityId);
  };

  const handleNotesUpdate = (
    notes: Descendant[],
    transformerFn: TransformNotesToMdFunction
  ) => {
    if (!updateNotes) return;
    setNotesSaved(false);
    debouncedUpdateNotes({
      notes,
      transformerFn,
      setSaveStatus: setNotesSaved,
      updateNotes,
      createActivity,
    });
  };

  return (
    <div className={className}>
      {loadingActivityProjects && "Loading projects..."}
      {activityProjects?.map(
        ({ projectId }) =>
          projectId && <ProjectName projectId={projectId} key={projectId} />
      )}
      <ProjectSelector onChange={handleSelectProject} allowCreateProjects />
      <NotesWriter
        notes={activity?.notes || ""}
        saveNotes={handleNotesUpdate}
        unsaved={!notesSaved}
      />
      <div style={{ padding: "0.3rem 1rem" }}>
        <ActivityMetaData activity={activity} />
        <SavedState saved={notesSaved} />
      </div>
    </div>
  );
};

export default ProjectNotesForm;
