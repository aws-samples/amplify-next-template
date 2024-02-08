import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export const createSixWeekCycle = () => {
  client.models.SixWeekCycle.create({
    name: "Just a test",
    startDate: "2024-01-22",
  }).then(({ data }) => {
    console.log(data);
  });
};
