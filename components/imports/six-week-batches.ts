import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

export type Context = "work" | "family" | "hobby";

export type ImportSixWeekBatchesData = {
  notionId: number;
  idea: string;
  context: Context;
  appetite: "small" | "big";
  hours: number;
  problem: string;
  solution: string;
  risks: string;
  noGos: string;
  createdOn: string;
};

const client = generateClient<Schema>();

export const createSixWeekBatch =
  (
    sixWeekBatches: Schema["SixWeekBatch"][],
    sixWeekCycle: Schema["SixWeekCycle"]
  ) =>
  async ({ ...rest }: ImportSixWeekBatchesData) => {
    const exists = sixWeekBatches.find(
      ({ notionId }) => notionId == rest.notionId
    );
    if (exists) {
      console.log("Record exists already", rest.idea, exists.idea);
      return exists;
    } else {
      console.log("To be created", rest);
      const { data: newData, errors } = await client.models.SixWeekBatch.create(
        {
          status: "inprogress",
          sixWeekCycle,
          ...rest,
        }
      );
      console.log("Record created", newData, "Errors", errors);
      return newData;
    }
  };
