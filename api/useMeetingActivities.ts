import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import useSWR from "swr";
import { handleApiErrors } from "./globals";
import { Activity, mapActivity } from "./useActivity";
const client = generateClient<Schema>();

const fetchMeetingActivities = (meetingId: string) => () =>
  client.models.Activity.list({
    filter: { meetingActivitiesId: { eq: meetingId } },
  }).then(({ data }) =>
    data
      .map(mapActivity)
      .sort((a, b) => a.finishedOn.getTime() - b.finishedOn.getTime())
  );

const useMeetingActivities = (meetingId?: string) => {
  const {
    data: meetingActivities,
    error: errorMeetingActivities,
    isLoading: loadingMeetingActivities,
    mutate: mutateMeetingActivities,
  } = useSWR(
    `/api/meetings/${meetingId}/activities`,
    fetchMeetingActivities(meetingId || "")
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
