import { FC } from "react";
import styles from "./ProjectName.module.css";
import { Project } from "@/helpers/types/data";
import { flow, map, get, join, filter } from "lodash/fp";
import { validBatches } from "@/helpers/functional";

const makeAccountNames = (project: Project) =>
  !Array.isArray(project.accounts)
    ? ""
    : project.accounts.length === 0
    ? ""
    : `${project.accounts.map(({ account: { name } }) => name).join(", ")}: `;

const makeBatchesNames = (project: Project) => {
  const batch = flow(
    filter(flow(get("sixWeekBatch"), validBatches)),
    map(get("sixWeekBatch.idea")),
    join(", ")
  )(project.batches);
  if (!batch) return "";
  return `, Batch: ${batch}`;
};
export const makeProjectName = (project: Project) =>
  `${makeAccountNames(project)}${project.project}${makeBatchesNames(project)}`;

type ProjectNameProps = {
  project: Project;
};
const ProjectName: FC<ProjectNameProps> = ({
  project: { project, id, accounts, batches },
}) => (
  <div className={styles.wrapper}>
    <div className={`${styles.token} ${styles.project}`}>
      <a href={`/projects/${id}`} className={styles.project}>
        {project}
      </a>
    </div>
    {Array.isArray(accounts) &&
      accounts.map(({ account: { id, name } }) => (
        <a
          href={`/accounts/${id}`}
          key={id}
          className={`${styles.token} ${styles.account}`}
        >
          {name}
        </a>
      ))}
    {Array.isArray(batches) &&
      batches.map(({ sixWeekBatch: { id, idea } }) => (
        <a
          href={`/commitments/${id}`}
          key={id}
          className={`${styles.token} ${styles.batches}`}
        >
          {idea}
        </a>
      ))}
  </div>
);

export default ProjectName;
