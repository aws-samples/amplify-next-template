import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import useSWR from "swr";

const client = generateClient<Schema>();

const fetchProjectAccounts = (projectId: string) => async () =>
  client.models.AccountProjects.list({
    filter: { projectsId: { eq: projectId } },
  }).then(({ data }) => {
    return data.map(({ accountId }) => ({ accountId }));
  });

const useProjectAccounts = (projectId?: string) => {
  const {
    data: projectAccountIds,
    error: errorProjectAccounts,
    isLoading: loadingProjectAccounts,
  } = useSWR(
    `/api/projects/${projectId}/accounts`,
    fetchProjectAccounts(projectId || "")
  );

  return { projectAccountIds, errorProjectAccounts, loadingProjectAccounts };
};

export default useProjectAccounts;
