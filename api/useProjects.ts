import { type Schema } from "@/amplify/data/resource";
import { Context } from "@/contexts/ContextContext";
import { generateClient } from "aws-amplify/data";
import useSWR from "swr";
import { handleApiErrors } from "./globals";

const client = generateClient<Schema>();

const fetchProjects = (context?: Context) => async () =>
  context &&
  client.models.Projects.list({
    filter: { context: { eq: context }, done: { ne: "true" } },
    limit: 500,
  }).then(({ data }) =>
    data.map(({ id, project, done, doneOn, dueOn }) => ({
      id,
      project,
      done,
      doneOn,
      dueOn,
    }))
  );

const useProjects = (context?: Context) => {
  const {
    data: projects,
    error: errorProjects,
    isLoading: loadingProjects,
    mutate,
  } = useSWR("/api/projects", fetchProjects(context));

  const createProject = async (projectName: string) => {
    if (projectName.length < 3 || !context) return null;

    const newProject = {
      id: crypto.randomUUID(),
      project: projectName,
      done: false,
      doneOn: null,
      dueOn: null,
    };
    const updatedProjects = [...(projects || []), newProject];
    mutate(updatedProjects, false);

    const { data, errors } = await client.models.Projects.create({
      ...newProject,
      context,
    });
    if (errors) handleApiErrors(errors, "Error creating project");
    mutate(updatedProjects);
    return data.id;
  };

  return { projects, errorProjects, loadingProjects, createProject };
};

export default useProjects;
