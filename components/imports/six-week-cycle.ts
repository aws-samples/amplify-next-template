import { Dispatch, SetStateAction } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

const logDataFn =
  (logData: string[], setLogData: Dispatch<SetStateAction<string[]>>) =>
  (log: string) =>
    setLogData([...logData, log]);

export const createSixWeekCycle = (
  logData: string[],
  setLogData: Dispatch<SetStateAction<string[]>>
) => {
  const log = logDataFn(logData, setLogData);
  client.models.SixWeekCycle.create({
    name: "Just a test",
    startDate: "2024-01-22",
  }).then(({ data }) => log(JSON.stringify(data)));
};
