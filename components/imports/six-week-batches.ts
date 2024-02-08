import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { LogFunction } from "@/pages/commitments/new";

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

export const createSixWeekBatch = async (
  log: LogFunction,
  { ...rest }: ImportSixWeekBatchesData
) => {};

// export const createSixWeekCycle = (log: (str: string) => void) => {
//   client.models.SixWeekCycle.create({
//     name: "Just a test",
//     startDate: "2024-01-22",
//   }).then(({ data }) => log(JSON.stringify(data)));
// };
