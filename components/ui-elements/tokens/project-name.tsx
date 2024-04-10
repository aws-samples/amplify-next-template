import useProject from "@/api/useProject";
import useProjectAccounts from "@/api/useProjectAccounts";
import AccountName from "./account-name";
import { FC } from "react";
import styles from "./Tokens.module.css";

type ProjectNameProps = {
  projectId: string;
  noLinks?: boolean;
};

const ProjectName: FC<ProjectNameProps> = ({ projectId, noLinks }) => {
  const { project, loadingProject } = useProject(projectId);
  const { projectAccountIds } = useProjectAccounts(projectId);

  return !project ? (
    "Loading project..."
  ) : (
    <div>
      {noLinks ? (
        <div className={styles.projectName}>
          {project?.project}
          <small> {(project.context || "none").toUpperCase()}</small>
        </div>
      ) : (
        <a href={`/projects/${projectId}`} className={styles.projectName}>
          {project?.project}
          <small style={{ color: "gray" }}>
            {" "}
            {(project.context || "none").toUpperCase()}
          </small>
        </a>
      )}
      <div>
        {projectAccountIds?.map(
          ({ accountId }) =>
            accountId && (
              <AccountName
                noLinks={noLinks}
                key={accountId}
                accountId={accountId}
              />
            )
        )}
      </div>
    </div>
  );
};

export default ProjectName;
