import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Nullable } from "../types/data";
import { handleApiErrors } from "./globals";
import { makeISOString } from "../functional";
import { Context } from "@/components/navigation-menu/AppContext";
import { createCurrentContext } from "./create";

const client = generateClient<Schema>();

export const switchDoneTask = async (
  id: string,
  isProject: boolean,
  currentDone?: Nullable<boolean>
) => {
  if (isProject) {
    // @ts-expect-error
    const { data, errors } = await client.models.DayProjectTask.update({
      id,
      done: !currentDone,
    });
    if (errors) {
      handleApiErrors(
        errors,
        `Couldn't switch task to ${currentDone ? "Open" : "Done"}`
      );
      return null;
    }
    return data;
  }
  // @ts-expect-error
  const { data, errors } = await client.models.NonProjectTask.update({
    id,
    done: !currentDone,
  });
  if (errors) {
    handleApiErrors(
      errors,
      `Couldn't switch task to ${currentDone ? "Open" : "Done"}`
    );
    return null;
  }
  return data;
};

export const completeDayPlan = async (id: string) => {
  // @ts-expect-error
  const { data, errors } = await client.models.DayPlan.update({
    id,
    done: true,
  });
  if (errors) {
    handleApiErrors(errors, "Error completing day plan");
    return;
  }
  return data;
};

const updateMeeting = async (
  param: {
    id: string;
    topic?: string;
    meetingOn?: string;
  },
  errorMsg?: string
) => {
  const meetingApi = client.models.Meeting.update;
  const { data, errors } = await meetingApi(param);
  if (errors) {
    handleApiErrors(errors, errorMsg);
    return;
  }
  return data;
};

export const updateMeetingTitle = (meetingId: string, newTitle: string) =>
  updateMeeting({ id: meetingId, topic: newTitle });

export const updateMeetingDateTime = (
  meetingId: string,
  dateTime: Date | string
) => updateMeeting({ id: meetingId, meetingOn: makeISOString(dateTime) });

export const updateCurrentContext: (
  context: Context
) => Promise<Context> = async (context) => {
  const options = { limit: 1 };
  const getApi = client.models.CurrentContext.list;
  const { data, errors } = await getApi(options);
  if (errors) return context;
  if (data) {
    // we found a record for the current context
    // so, let's update it
    const id = data[0].id;
    const updateApi = client.models.CurrentContext.update;
    const { data: updated, errors } = await updateApi({
      id,
      context,
    });
    return context;
  }
  // we didn't find a record for the current context
  // so, let's create one
  return createCurrentContext(context);
};

export const updateActivity = async (id: string, notes: string) => {
  const updateApi = client.models.Activity.update;
  const { data, errors } = await updateApi({
    id,
    notes,
  });
  if (errors) {
    handleApiErrors(errors, "Error updating notes");
    return;
  }
  return data;
};
