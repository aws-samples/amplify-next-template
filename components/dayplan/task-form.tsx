import { FC, FormEvent, useEffect, useState } from "react";
import { useAppContext } from "../navigation-menu/AppContext";
import { Project, SixWeekBatch } from "@/helpers/types/data";
import { flow, map } from "lodash/fp";
import Batch, { getUniqueBatches } from "../batches/batches";
import ProjectSelector from "../ui-elements/project-selector";
import { projectsSubscription } from "@/helpers/api-operations/subscriptions";
import SubmitButton from "../ui-elements/submit-button";
import ProjectName from "../ui-elements/project-name";

type TaskFormProps = {
  onSubmit: (task: string, selectedProject: Project | null) => void;
};

const TaskForm: FC<TaskFormProps> = ({ onSubmit }) => {
  const { context } = useAppContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [task, setTask] = useState("");

  useEffect(() => {
    const filter = {
      context: { eq: context },
      done: { ne: "true" },
    };
    const subscription = projectsSubscription(({ items, isSynced }) => {
      setProjects([...(items || [])]);
    }, filter);
    return () => subscription.unsubscribe();
  }, [context]);

  const handleChange = (selectedOption: Project | null) => {
    setSelectedProject(selectedOption);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(task, selectedProject);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          placeholder="Describe task"
        />
        {selectedProject && <ProjectName project={selectedProject} />}
        <ProjectSelector onChange={handleChange} />
        <SubmitButton type="submit">Create Task</SubmitButton>
      </form>
      <div>
        <h3>Important Six-Week Batches and Projects</h3>
        {flow(
          getUniqueBatches,
          map((batch: SixWeekBatch) => (
            <Batch key={batch.id} batch={batch} projects={projects} />
          ))
        )(projects)}
      </div>
    </div>
  );
};

export default TaskForm;
