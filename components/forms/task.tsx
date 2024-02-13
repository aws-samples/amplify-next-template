import { FC, useEffect, useState } from "react";
import { useAppContext } from "../navigation-menu/AppContext";
import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Project, SixWeekBatch, SubNextFunctionParam } from "@/helpers/types";
import { flow, map } from "lodash/fp";
import Batch, { getUniqueBatches } from "../batches/batches";
import SubmitButton from "../ui-elements/submit-button";
import ProjectSelector from "../ui-elements/project-selector";
import { projectsSelectionSet } from "@/helpers/selection-sets";

const client = generateClient<Schema>();

type TaskFormProps = {
  onSubmit: (task: string, selectedProject: Project | null) => void;
};

const TaskForm: FC<TaskFormProps> = ({ onSubmit }) => {
  const { context } = useAppContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [task, setTask] = useState("");

  useEffect(() => {
    const query = {
      filter: {
        context: { eq: context },
        done: { ne: "true" },
      },
      selectionSet: projectsSelectionSet,
    };
    // @ts-expect-error
    const sub = client.models.Projects.observeQuery(query).subscribe({
      next: ({ items, isSynced }: SubNextFunctionParam<Project>) => {
        setProjects([...items]);
      },
    });
    return () => sub.unsubscribe();
  }, [context]);

  const handleChange = (selectedOption: any) => {
    const project = projects.find((p) => p.id === selectedOption.value);
    setSelectedProject(project || null);
  };

  return (
    <div>
      <input
        value={task}
        onChange={(event) => setTask(event.target.value)}
        placeholder="Describe task"
      />
      <ProjectSelector onChange={handleChange} />
      <SubmitButton onClick={() => onSubmit(task, selectedProject)}>
        Create Task
      </SubmitButton>
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
