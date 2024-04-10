import { type Schema } from "@/amplify/data/resource";
import { Context } from "@/contexts/ContextContext";
import { generateClient } from "aws-amplify/data";
import useSWR from "swr";

const client = generateClient<Schema>();

type Project = {
  id: string;
  project: string;
  context?: Context;
  done: boolean;
  doneOn?: Date;
  dueOn?: Date;
};

export const mapProject: (project: Schema["Projects"]) => Project = ({
  id,
  project,
  done,
  doneOn,
  dueOn,
  context,
}) => ({
  id,
  project,
  done: !!done,
  doneOn: doneOn ? new Date(doneOn) : undefined,
  dueOn: dueOn ? new Date(dueOn) : undefined,
  context,
});

const fetchProject = (projectId: string) => () =>
  client.models.Projects.get({ id: projectId }).then(({ data }) =>
    mapProject(data)
  );

const useProject = (projectId?: string) => {
  const {
    data: project,
    error: errorProject,
    isLoading: loadingProject,
  } = useSWR(`/api/projects/${projectId}`, fetchProject(projectId || ""));

  return { project, errorProject, loadingProject };
};

export default useProject;
