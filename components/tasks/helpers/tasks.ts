import { Activity } from "@/helpers/types/data";

type FilterBySearch = (
  search: string
) => (activity: Activity) => boolean | undefined;

export const filterBySearch: FilterBySearch =
  (search) =>
  ({ notes }) =>
    notes?.toUpperCase().includes(search);
