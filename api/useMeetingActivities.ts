import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import useSWR from "swr";
import { handleApiErrors } from "./globals";
import { Activity, mapActivity } from "./useActivity";
import { addDaysToDate, getDayOfDate } from "@/helpers/functional";
import { flow } from "lodash/fp";
const client = generateClient<Schema>();

const fetchMeetingActivities =
  (page: number, meetingId?: string) => async () => {
    if (!meetingId) return;
    const compareDate = flow(addDaysToDate(-4 * 7), getDayOfDate)(new Date());
    const { data, errors } = await client.models.Activity.list({
      filter: {
        meetingActivitiesId: { eq: meetingId },
        createdAt: { gt: compareDate },
      },
    });
    if (errors) throw errors;
    return data
      .map(mapActivity)
      .sort((a, b) => a.finishedOn.getTime() - b.finishedOn.getTime());
  };

type UseMeetingActivitiesProps = {
  meetingId?: string;
  page?: number;
};

const useMeetingActivities = ({
  meetingId,
  page = 1,
}: UseMeetingActivitiesProps) => {
  const {
    data: meetingActivities,
    error: errorMeetingActivities,
    isLoading: loadingMeetingActivities,
    mutate: mutateMeetingActivities,
  } = useSWR(
    `/api/meetings/${meetingId}/activities/page/${page}`,
    fetchMeetingActivities(page, meetingId)
  );

  const createMeetingActivity = async (activityId: string, notes?: string) => {
    const newActivity: Activity = {
      id: activityId,
      notes: notes || "",
      finishedOn: new Date(),
      updatedAt: new Date(),
    };
    const updated = [...(meetingActivities || []), newActivity];
    mutateMeetingActivities(updated, false);
    const { data, errors } = await client.models.Activity.create({
      id: activityId,
      meetingActivitiesId: meetingId,
      notes,
    });
    if (errors) handleApiErrors(errors, "Error creating activity for meeting");
    mutateMeetingActivities(updated);
    return data.id;
  };

  return {
    meetingActivities,
    errorMeetingActivities,
    loadingMeetingActivities,
    createMeetingActivity,
  };
};

export default useMeetingActivities;
