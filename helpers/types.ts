export type Nullable<T> = T | null;
export type MappedAccount = {
  name: string;
};
export type SixWeekCycle = {
  name: string;
  startDate: string;
};
export type SixWeekBatch = {
  sixWeekBatch: {
    idea: string;
    context: string;
    sixWeekCycle: SixWeekCycle;
  };
};
export type ProjectActivity = {
  activity: {
    id: string;
    finishedOn: Nullable<string>;
    notes: Nullable<string>;
    createdAt: string;
  };
};
export type Project = {
  id: string;
  project: string;
  context: string;
  batches: SixWeekBatch[];
  accounts: { account: MappedAccount }[];
};
export type ProjectTask = {
  id: string;
  task: string;
  done?: Nullable<boolean>;
  projects: Project;
  createdAt: string;
  timeInvested?: Nullable<number>;
};
export type DayPlan = {
  id: string;
  day: string;
  dayGoal: string;
  done?: Nullable<boolean>;
};
export type SubNextFunctionParam<T> = {
  items: T[];
  isSynced: boolean;
};
