import { FC } from "react";
import styles from "./Task.module.css";
import { IoCheckboxSharp, IoSquareOutline } from "react-icons/io5";
import useProject from "@/api/useProject";
import ProjectName from "../ui-elements/tokens/project-name";

type TaskProps = {
  task: {
    id: string;
    task: string;
    done?: boolean | null;
    projectId?: string;
  };
  switchDone: (taskId: string, done?: boolean | null) => void;
};

const Task: FC<TaskProps> = ({
  task: { id, task, done, projectId },
  switchDone,
}) => {
  const { project, loadingProject } = useProject(projectId);
  return (
    <article>
      <div className={styles.postLine}>
        <a className={styles.postCheckbox} onClick={() => switchDone(id, done)}>
          {!done ? <IoSquareOutline /> : <IoCheckboxSharp />}
        </a>
        <div className={styles.postBody}>
          <div>{task}</div>
          <div className={styles.description}>
            {loadingProject ? (
              "Loading..."
            ) : !project || !project.id ? (
              ""
            ) : (
              <ProjectName projectId={project.id} />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Task;
