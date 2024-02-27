import { type Schema } from "@/amplify/data/resource";
import { SelectionSet } from "aws-amplify/data";
import { currentContextSelectionSet } from "../selection-sets";
import { Descendant } from "slate";

export type Nullable<T> = T | null;
export type MappedAccount = {
  id: string;
  name: string;
};
export type CurrentContext = SelectionSet<
  Schema["CurrentContext"],
  typeof currentContextSelectionSet
>;
export type SixWeekCycle = {
  name: string;
  startDate: string;
};
export type SixWeekBatch = {
  id: string;
  idea: string;
  context: string;
  sixWeekCycle: SixWeekCycle;
};
export type Activity = {
  id: string;
  finishedOn: Nullable<string>;
  notes: Nullable<string>;
  slateNotes: Descendant[];
  createdAt: string;
  forProjects?: { projects: Project }[];
};
export type Project = {
  id: string;
  project: string;
  context: string;
  batches: { sixWeekBatch: SixWeekBatch }[];
  accounts: { account: MappedAccount }[];
};
type TaskBase = {
  id: string;
  task: string;
  done?: Nullable<boolean>;
  createdAt: string;
};
export type NonProjectTask = TaskBase;
export type ProjectTask = TaskBase & {
  projects: Project;
  timeInvested?: Nullable<number>;
};
export type DayPlan = {
  id: string;
  day: string;
  dayGoal: string;
  done?: Nullable<boolean>;
};
export type AccountRole = {
  role?: Nullable<string>;
  startDate?: Nullable<string>;
  endDate?: Nullable<string>;
  company?: MappedAccount;
};
export type Participant = {
  id: string;
  name: string;
  accountRoles: AccountRole[];
};
export type Meeting = {
  id: string;
  topic: string;
  meetingOn?: Nullable<string>;
  createdAt: string;
  timeInvested?: Nullable<number>;
  participants: { person: Participant }[];
  activities: Activity[];
};
