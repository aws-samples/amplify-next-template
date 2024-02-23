export const activitiesSelectionSet = [
  "activity.id",
  "activity.finishedOn",
  "activity.notes",
  "activity.createdAt",
];
export const currentContextSelectionSet = ["id", "context"] as const;
export const accountsSelectionSet = ["id", "name"];
export const batchesSelectionSet = [
  "id",
  "idea",
  "context",
  "sixWeekCycle.name",
  "sixWeekCycle.startDate",
];
export const projectsSelectionSet = [
  "id",
  "project",
  "context",
  ...accountsSelectionSet.map((a) => `accounts.account.${a}`),
  ...batchesSelectionSet.map((b) => `batches.sixWeekBatch.${b}`),
];
const taskBaseSelectionSet = ["id", "task", "done", "createdAt"];
export const otherTasksSelectionSet = taskBaseSelectionSet;
export const projectTasksSelectionSet = [
  ...taskBaseSelectionSet,
  "timeInvested",
  ...projectsSelectionSet.map((p) => `projects.${p}`),
];
export const personSelectionSet = [
  "id",
  "name",
  "accountRoles.role",
  "accountRoles.startDate",
  "accountRoles.endDate",
  "accountRoles.company.name",
];
export const meetingsSelectionSet = [
  "id",
  "topic",
  "meetingOn",
  "createdAt",
  "timeInvested",
  ...personSelectionSet.map((a) => `participants.person.${a}`),
  ...activitiesSelectionSet.map((a) => a.replace("activity.", "activities.")),
  ...projectsSelectionSet.map((p) => `activities.forProjects.projects.${p}`),
];
export const dayplanSelectionSet = ["id", "day", "dayGoal", "done"];
