import { FC, FormEvent, useState } from "react";
import styles from "./Task.module.css";
import ProjectName from "@/components/ui-elements/tokens/project-name";
import ProjectSelector from "@/components/ui-elements/project-selector";
import SubmitButton from "../ui-elements/submit-button";

type TaskFormProps = {
  onSubmit: (task: string, selectedProjectId: string | null) => void;
};

const TaskForm: FC<TaskFormProps> = ({ onSubmit }) => {
  const [task, setTask] = useState("");
  const [projectId, setProjectId] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(task, projectId);
  };

  const handleChange = (projectId: string | null) => {
    setProjectId(projectId);
  };

  return (
    <div className={styles.taskForm}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.taskInput}
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          placeholder="Describe task"
        />
        {projectId && <ProjectName projectId={projectId} />}
        <ProjectSelector allowCreateProjects onChange={handleChange} />
        <SubmitButton type="submit" wrapperClassName={styles.confirmBtn}>
          Create Task
        </SubmitButton>
        <h3>Current Commitments</h3>
        <code>Work in progress</code>
      </form>
    </div>
  );
};

export default TaskForm;
