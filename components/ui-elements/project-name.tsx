import { FC } from "react";
import styles from "./ProjectName.module.css";
import { Project } from "@/helpers/types";
import { makeProjectName } from "@/helpers/functional";

type ProjectNameProps = {
  project: Project;
};
const ProjectName: FC<ProjectNameProps> = ({ project }) => {
  return <div className={styles.project}>{makeProjectName(project)}</div>;
};
export default ProjectName;
