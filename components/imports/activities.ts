import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { logger } from "@/helpers/functional";
const client = generateClient<Schema>();

export type ImportActivityData = {
  notionId: number;
  notes: string;
  fromMeeting?: number[];
  forProjects: number[];
  finishedOn: string;
};

/** =============================== */
/**        CREATE ACTIVITIES        */
/** =============================== */
