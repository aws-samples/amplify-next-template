import { Activity, Project } from "@/helpers/types/data";
import { flow, map, get } from "lodash/fp";
import { FC } from "react";
import styles from "./Activity.module.css";
import ProjectName from "../ui-elements/project-name";
import NotesWriter from "../ui-elements/notes-writer";

type ActivityProps = {
  activity: Activity;
  showDates?: boolean;
  showProjects?: boolean;
};
const ActivityComponent: FC<ActivityProps> = ({
  activity: { finishedOn, createdAt, slateNotes, forProjects },
  showDates,
  showProjects,
}) => {
  return (
    <div>
      {showDates && (
        <h4>{new Date(finishedOn || createdAt).toLocaleString()}</h4>
      )}
      {showProjects && (
        <div>
          {flow(
            map(get("projects")),
            map((project: Project) => (
              <ProjectName key={project.id} project={project} />
            ))
          )(forProjects)}
        </div>
      )}
      <NotesWriter note={slateNotes} readonly />
    </div>
  );
};

export default ActivityComponent;
