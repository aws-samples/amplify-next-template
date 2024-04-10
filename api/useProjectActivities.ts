import { type Schema } from "@/amplify/data/resource";
import { SelectionSet, generateClient } from "aws-amplify/data";
import useSWR from "swr";
import { handleApiErrors } from "./globals";
const client = generateClient<Schema>();

const selectionSet = [
  "activity.id",
  "activity.finishedOn",
  "activity.createdAt",
] as const;

type ProjectActivitiesData = SelectionSet<
  Schema["ProjectActivity"],
  typeof selectionSet
>;

type ProjectActivity = {
  id: string;
  finishedOn: Date;
};

const mapProjectActivity = ({
  activity: { id, finishedOn, createdAt },
}: ProjectActivitiesData): ProjectActivity => ({
  id,
  finishedOn: new Date(finishedOn || createdAt),
});

const fetchProjectActivities = (projectId?: string) => async () => {
  if (!projectId) return;
  const { data, errors } = await client.models.ProjectActivity.list({
    filter: { projectsId: { eq: projectId } },
    selectionSet,
  });
  if (errors) throw errors;
  return data
    .map(mapProjectActivity)
    .sort((a, b) => b.finishedOn.getTime() - a.finishedOn.getTime());
};

const useProjectActivities = (projectId?: string) => {
  const {
    data: projectActivities,
    error: errorProjectActivity,
    isLoading: loadingProjectActivities,
    mutate: mutateProjectActivities,
  } = useSWR(
    `/api/projects/${projectId}/activities`,
    fetchProjectActivities(projectId)
  );

  const createProjectActivity = async (activityId: string, notes?: string) => {
    if (!projectId) return;
    const { data: activity, errors: errorsActivity } =
      await client.models.Activity.create({ id: activityId, notes });
    if (errorsActivity) {
      handleApiErrors(
        errorsActivity,
        "Error creating an activity for a project"
      );
      return;
    }
    const updated: ProjectActivity[] = [
      {
        id: activity.id,
        finishedOn: new Date(activity.finishedOn || activity.createdAt),
      },
      ...(projectActivities || []),
    ];
    mutateProjectActivities(updated, false);
    const { data, errors } = await client.models.ProjectActivity.create({
      activityId: activity.id,
      projectsId: projectId,
    });
    if (errors)
      handleApiErrors(
        errors,
        "Error creating link between project and activity"
      );
    mutateProjectActivities(updated);
    return data.activityId;
  };

  return {
    projectActivities,
    errorProjectActivity,
    loadingProjectActivities,
    createProjectActivity,
  };
};

export default useProjectActivities;
