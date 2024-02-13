export const activitiesSelectionSet = [
  "activity.id",
  "activity.finishedOn",
  "activity.notes",
  "activity.createdAt",
];
export const projectTasksSelectionSet = [
  "id",
  "task",
  "done",
  "timeInvested",
  "createdAt",
  "projects.id",
  "projects.project",
  "projects.context",
  "projects.accounts.account.name",
  "projects.batches.sixWeekBatch.id",
  "projects.batches.sixWeekBatch.idea",
  "projects.batches.sixWeekBatch.context",
  "projects.batches.sixWeekBatch.sixWeekCycle.name",
  "projects.batches.sixWeekBatch.sixWeekCycle.startDate",
];
