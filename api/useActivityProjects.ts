import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import useSWR from "swr";
import { handleApiErrors } from "./globals";
const client = generateClient<Schema>();

type ActivityProject = {
  projectId?: string;
};

const mapActivityProject: (
  activity: Schema["ProjectActivity"]
) => ActivityProject = ({ projectsId }) => ({ projectId: projectsId });

const fetchActivityProjects = (activityId?: string) => async () => {
  if (!activityId) return;
  const { data, errors } = await client.models.ProjectActivity.list({
    filter: { activityId: { eq: activityId } },
  });
  if (errors) throw errors;
  return data.map(mapActivityProject);
};

const useActivityProjects = (activityId?: string) => {
  const {
    data: activityProjects,
    error: errorActivityProjects,
    isLoading: loadingActivityProjects,
    mutate: mutateActivityProjects,
  } = useSWR(
    `/api/activities/${activityId}/projects`,
    fetchActivityProjects(activityId)
  );

  const addProjectToActivity = async (
    projectId: string,
    newActivityId?: string
  ) => {
    if (!activityId && !newActivityId) return;
    const updated: ActivityProject[] = [
      ...(activityProjects || []),
      { projectId },
    ];
    mutateActivityProjects(updated, false);
    const { errors } = await client.models.ProjectActivity.create({
      activityId: activityId || newActivityId,
      projectsId: projectId,
    });
    if (errors)
      handleApiErrors(errors, "Error adding a project to an activity");
    mutateActivityProjects(updated);
  };

  return {
    activityProjects,
    errorActivityProjects,
    loadingActivityProjects,
    addProjectToActivity,
  };
};

export default useActivityProjects;
