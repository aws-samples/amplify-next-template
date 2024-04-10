import { type Schema } from "@/amplify/data/resource";
import { Context } from "@/contexts/ContextContext";
import { generateClient } from "aws-amplify/data";
import useSWR from "swr";
import { handleApiErrors } from "./globals";
import { mapProject } from "./useProject";

const client = generateClient<Schema>();

const fetchProjects = (context?: Context) => async () => {
  if (!context) return;
  const { data, errors } = await client.models.Projects.list({
    filter: { context: { eq: context }, done: { ne: "true" } },
    limit: 500,
  });
  if (errors) throw errors;
  return data.map(mapProject);
};

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
      context,
      done: false,
    };
    const updatedProjects = [...(projects || []), newProject];
    mutate(updatedProjects, false);

    const { data, errors } = await client.models.Projects.create({
      id: newProject.id,
      project: projectName,
      done: false,
      context,
    });
    if (errors) handleApiErrors(errors, "Error creating project");
    mutate(updatedProjects);
    return data.id;
  };

  return { projects, errorProjects, loadingProjects, createProject };
};

export default useProjects;
