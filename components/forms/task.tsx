import { FC, useEffect, useState } from "react";
import { useAppContext } from "../navigation-menu/AppContext";
import Select from "react-select";
import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Project, SubNextFunctionParam } from "@/helpers/types";
import { filter, flow, get, join, map, uniqBy } from "lodash/fp";
import { validBatches } from "@/helpers/functional";

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
      selectionSet: [
        "id",
        "project",
        "context",
        "accounts.account.name",
        "batches.sixWeekBatch.idea",
        "batches.sixWeekBatch.context",
        "batches.sixWeekBatch.sixWeekCycle.name",
        "batches.sixWeekBatch.sixWeekCycle.startDate",
      ],
    };
    // @ts-expect-error
    const sub = client.models.Projects.observeQuery(query).subscribe({
      next: ({ items, isSynced }: SubNextFunctionParam<Project>) => {
        setProjects([...items]);
      },
    });
    return () => sub.unsubscribe();
  }, [context]);

  const mapOptions = ({ id, project, accounts }: Project) => {
    return {
      value: id,
      label: `${
        !accounts
          ? ""
          : `${accounts.map(({ account: { name } }) => name).join(", ")}: `
      }${project}`,
    };
  };

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
      <Select
        options={projects.map(mapOptions)}
        onChange={handleChange}
        isClearable
        isSearchable
        placeholder="Select project..."
      />
      <button onClick={() => onSubmit(task, selectedProject)}>
        Create Task
      </button>
      <div>
        <h3>Important Six-Week Batches and Projects</h3>
        {flow(
          filter(
            flow(get("batches"), filter(validBatches), (b) => b.length > 0)
          ),
          map(({ batches }) => ({ batch: batches[0].sixWeekBatch.idea })),
          uniqBy("batch"),
          map(({ batch }: { batch: string }) => ({
            batch,
            projects: flow(
              filter(
                flow(
                  get("batches"),
                  filter(
                    flow(get("sixWeekBatch"), get("idea"), (i) => i === batch)
                  ),
                  (b) => b.length > 0
                )
              ),
              map(
                ({ accounts, project }) =>
                  `${flow(
                    map(get("account.name")),
                    join(", ")
                  )(accounts)}: ${project}`
              )
            )(projects),
          })),
          map(
            (
              { batch, projects }: { batch: string; projects: string[] },
              idx: number
            ) => (
              <div key={idx}>
                <h4>Batch: {batch}</h4>
                <ul>
                  {projects.map((project: string, idx) => (
                    <li key={idx}>{project}</li>
                  ))}
                </ul>
              </div>
            )
          )
        )(projects)}
      </div>
    </div>
  );
};

export default TaskForm;
