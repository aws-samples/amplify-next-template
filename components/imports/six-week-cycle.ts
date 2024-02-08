import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { LogFunction } from "@/pages/commitments/new";

const client = generateClient<Schema>();

export const createSixWeekCycle = (log: LogFunction) => {
  client.models.SixWeekCycle.create({
    name: "Just a test",
    startDate: "2024-01-22",
  }).then(({ data }) => log(JSON.stringify(data)));
};
