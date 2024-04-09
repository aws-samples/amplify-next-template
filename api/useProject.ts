import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import useSWR from "swr";

const client = generateClient<Schema>();

type Project = {
  id: string;
  project: string;
  done: boolean;
  doneOn?: Date;
  dueOn?: Date;
};

const mapProject = ({
  id,
  project,
  done,
  doneOn,
  dueOn,
}: Schema["Projects"]): Project => ({
  id,
  project,
  done: !!done,
  doneOn: doneOn ? new Date(doneOn) : undefined,
  dueOn: dueOn ? new Date(dueOn) : undefined,
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
