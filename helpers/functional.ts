import { flow } from "lodash/fp";
import { Project, SixWeekBatch } from "./types";

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
export const makeProjectName = (project: Project) => {
  if (project.accounts.length === 0) return project.project;
  const accounts = project.accounts
    .map(({ account: { name } }) => name)
    .join(", ");
  if (project.project.includes("OLX")) console.log(project.accounts);
  return `${accounts}: ${project.project}`;
};
