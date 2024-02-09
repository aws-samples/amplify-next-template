import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { Context } from "../navigation-menu/AppContext";
const client = generateClient<Schema>();

export type ImportProjectData = {
  notionId: number;
  project: string;
  done?: boolean;
  doneOn?: string;
  dueOn?: string;
  onHoldTill?: string;
  createdAt: string;
  myNextActions?: string;
  nextActionsOfOthers?: string;
  context: Context;
  customerIds?: number[];
  commitmentIds?: number[];
};

export const createProject =
  (
    projects: Schema["Projects"][],
    accountList: Schema["Account"][],
    batchList: Schema["SixWeekBatch"][]
  ) =>
  async ({
    nextActionsOfOthers,
    createdAt,
    customerIds,
    commitmentIds,
    ...rest
  }: ImportProjectData) => {
    const exists = projects.find(({ notionId }) => notionId == rest.notionId);
    if (exists) {
      console.log("Record exists already", rest.project, exists.project);
      return exists;
    } else {
      console.log("To be created", rest.project);
      const { data: newProject, errors } = await client.models.Projects.create({
        createdOnDay: createdAt,
        othersNextActions: nextActionsOfOthers,
        ...rest,
      });
      console.log("New record", newProject, "Errors", errors);

      const accounts: Schema["Account"][] = accountList.filter(({ notionId }) =>
        customerIds?.includes(notionId)
      );
      if (accounts) {
        const createAccountProject = async (account: Schema["Account"]) => {
          const { data, errors } = await client.models.AccountProjects.create({
            account,
            projects: newProject,
          });
          console.log("Account Project created", data, errors);
        };
        await accounts.map(createAccountProject);
      }

      const batches: Schema["SixWeekBatch"][] = batchList.filter(
        ({ notionId }) => commitmentIds?.includes(notionId)
      );
      if (batches) {
        const createBatchProject = async (batch: Schema["SixWeekBatch"]) => {
          const { data, errors } =
            await client.models.SixWeekBatchProjects.create({
              sixWeekBatch: batch,
              projects: newProject,
            });
          console.log("Batch Project created", data, errors);
        };
        await batches.map(createBatchProject);
      }

      return newProject;
    }
  };
