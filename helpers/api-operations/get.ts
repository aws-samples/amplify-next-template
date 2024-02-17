import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { handleApiErrors } from "./globals";
import { createCurrentContext } from "./create";
import {
  currentContextSelectionSet,
  meetingsSelectionSet,
  projectTasksSelectionSet,
} from "../selection-sets";
import { Meeting, NonProjectTask, ProjectTask } from "../types/data";
import { Context } from "@/components/navigation-menu/AppContext";

const client = generateClient<Schema>();

export const getMeeting = async (
  id: string,
  setMeeting: (meeting: Meeting) => void
) => {
  const query = { id };
  const options = { selectionSet: meetingsSelectionSet };
  const getMeetingApi = client.models.Meeting.get;
  // @ts-expect-error
  const { data, errors } = await getMeetingApi(query, options);
  if (errors) {
    handleApiErrors(errors);
    return;
  }
  if (!data) return;
  setMeeting(data);
};

export const getCurrentContext = async (fallbackContext: Context) => {
  const options = {
    limit: 1,
    selectionSet: currentContextSelectionSet,
  };
  const getApi = client.models.CurrentContext.list;
  const { data, errors } = await getApi(options);
  if (errors) return fallbackContext;
  if (data && data.length > 0) return data[0].context;
  const newContext = await createCurrentContext(fallbackContext);
  if (!newContext) return fallbackContext;
  return newContext;
};

export const getTask = async (
  id: string,
  setProjectTask: (items: ProjectTask) => void
) => {
  const projectTasksQuery = { selectionSet: projectTasksSelectionSet };
  const getProjectTask = client.models.DayProjectTask.get;
  // @ts-expect-error
  const { data, errors } = await getProjectTask({ id }, projectTasksQuery);
  if (errors) {
    handleApiErrors(errors, "Error loading project task");
    return;
  }
  if (data) {
    setProjectTask(data);
    return;
  }
  // TODO: Implement search for non project task
};
