export const activitiesSelectionSet = [
  "activity.id",
  "activity.finishedOn",
  "activity.notes",
  "activity.createdAt",
];
export const projectsSelectionSet = [
  "id",
  "project",
  "context",
  "accounts.account.name",
  "batches.sixWeekBatch.id",
  "batches.sixWeekBatch.idea",
  "batches.sixWeekBatch.context",
  "batches.sixWeekBatch.sixWeekCycle.name",
  "batches.sixWeekBatch.sixWeekCycle.startDate",
];
export const projectTasksSelectionSet = [
  "id",
  "task",
  "done",
  "timeInvested",
  "createdAt",
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
