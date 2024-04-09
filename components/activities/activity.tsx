import useActivity from "@/api/useActivity";
import { FC, useState } from "react";
import useActivityProjects from "@/api/useActivityProjects";
import ProjectName from "../ui-elements/tokens/project-name";
import MeetingName from "../ui-elements/tokens/meeting-name";
import NotesWriter from "../ui-elements/notes-writer/NotesWriter";
import { TransformNotesToMdFunction } from "../ui-elements/notes-writer/notes-writer-helpers";
import { Descendant } from "slate";
import { debouncedUpdateNotes } from "../ui-elements/activity-helper";
import ActivityMetaData from "../ui-elements/activity-meta-data";

type ActivityComponentProps = {
  activityId?: string;
  showDates?: boolean;
  showProjects?: boolean;
  showMeeting?: boolean;
  createActivity?: (notes?: string) => Promise<string | undefined>;
};

const ActivityComponent: FC<ActivityComponentProps> = ({
  activityId,
  showDates,
  showMeeting,
  showProjects,
  createActivity,
}) => {
  const { activity, updateNotes } = useActivity(activityId);
  const { activityProjects } = useActivityProjects(activityId);
  const [notesSaved, setNotesSaved] = useState(true);

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
    activityId && (
      <div style={{ marginBottom: "2rem" }}>
        {showDates && (
          <h2>
            {activity?.finishedOn.toLocaleString() || "Create new activity"}
          </h2>
        )}
        {showProjects &&
          activityProjects?.map(
            ({ projectId }) =>
              projectId && <ProjectName key={projectId} projectId={projectId} />
          )}
        {showMeeting && activity?.meetingId && (
          <MeetingName meetingId={activity?.meetingId} />
        )}
        <NotesWriter
          notes={activity?.notes || ""}
          saveNotes={handleNotesUpdate}
          unsaved={!notesSaved}
          key={activity?.id}
        />
        <div style={{ padding: "0.3rem 1rem" }}>
          <ActivityMetaData activity={activity} />
        </div>
      </div>
    )
  );
};

export default ActivityComponent;
