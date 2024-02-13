import { filter, flow, map, get, join } from "lodash/fp";
import { Project, ProjectActivity, SixWeekBatch } from "./types";

export const getCurrentDate = () => new Date();
export const makeDate = (str: string) => new Date(str);
export const addDaysToDate = (days: number) => (date: Date) =>
  new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
export const toLocaleDateString = (date: Date) => date.toLocaleDateString();
export const toISODateString = (date: Date) => {
  var year = date.getFullYear();
  // Months are zero-based, so we add 1 to get the correct month
  var month = (date.getMonth() + 1).toString().padStart(2, "0");
  var day = date.getDate().toString().padStart(2, "0");

  return year + "-" + month + "-" + day;
};
export const logger =
  (id?: number) =>
  (...args: any[]) => {
    if (id) {
      console.log(new Date().toTimeString(), `[${id}]`, ...args);
      return;
    }
    console.log(new Date().toTimeString(), ...args);
  };
export const isToday = (date: string | Date): boolean =>
  new Date().toISOString().substring(0, 10) ===
  (typeof date === "string" ? new Date(date) : date)
    .toISOString()
    .substring(0, 10);
export const isTodayOrFuture = (date: string | Date): boolean => {
  const inputDate = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return inputDate.getTime() >= today.getTime();
};
export const isBeforeToday = (date: string | Date): boolean =>
  !isTodayOrFuture(date);
export const sortByDate =
  (desc?: boolean) =>
  (dates: string[]): number => {
    const aDate = new Date(dates[0]).getTime();
    const bDate = new Date(dates[1]).getTime();

    return (aDate - bDate) * (!desc ? 1 : -1);
  };
export const validBatches = ({
  sixWeekBatch: {
    sixWeekCycle: { startDate },
  },
}: SixWeekBatch) =>
  flow(makeDate, addDaysToDate(8 * 7), isTodayOrFuture)(startDate);
const makeAccountNames = (project: Project) => {
  if (project.accounts.length === 0) return "";
  return `${project.accounts
    .map(({ account: { name } }) => name)
    .join(", ")}: `;
};
const makeBatchesNames = (project: Project) => {
  const batch = flow(
    filter(validBatches),
    map(get("sixWeekBatch.idea")),
    join(", ")
  )(project.batches);
  if (!batch) return "";
  return `, Batch: ${batch}`;
};
export const makeProjectName = (project: Project) => {
  return `${makeAccountNames(project)}${project.project}${makeBatchesNames(
    project
  )}`;
};
const getActivityDate = (activity: ProjectActivity) =>
  get("activity.finishedOn")(activity) || get("activity.createdAt")(activity);
export const sortActivities = (activities: ProjectActivity[]) =>
  activities.sort((a, b) =>
    flow(map(getActivityDate), sortByDate(true))([a, b])
  );
export type ApiErrorType = { errorType: string; message: string };
export const handleApiErrors = (errors: ApiErrorType[], message?: string) => {
  let errorText = flow(
    map(({ errorType, message }: ApiErrorType) => `${errorType}: ${message}`),
    join("; ")
  )(errors);
  if (message) {
    errorText = `${message}: ${errorText}`;
  }
  alert(errorText);
};
