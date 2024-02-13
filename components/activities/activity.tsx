import { makeProjectName } from "@/helpers/functional";
import { Activity, Project } from "@/helpers/types";
import { flow, map, get } from "lodash/fp";
import { FC } from "react";
import styles from "./Activity.module.css";
import ProjectName from "../ui-elements/project-name";

type ActivityProps = {
  activity: Activity;
  showDates?: boolean;
  showProjects?: boolean;
};
const ActivityComponent: FC<ActivityProps> = ({
  activity: { finishedOn, createdAt, notes, forProjects },
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
      <div>{notes}</div>
    </div>
  );
};

export default ActivityComponent;
