export const getCurrentDate = () => new Date();
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
