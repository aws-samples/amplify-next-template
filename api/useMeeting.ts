import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import useSWR from "swr";
import { Meeting, mapMeeting } from "./useMeetings";
import { handleApiErrors } from "./globals";
const client = generateClient<Schema>();

type MeetingUpdateProps = {
  meetingId: string;
  meetingOn: Date;
  title: string;
};

const fetchMeeting = (meetingId: string) => () =>
  client.models.Meeting.get({ id: meetingId }).then(({ data }) =>
    mapMeeting(data)
  );

const useMeeting = (meetingId?: string) => {
  const {
    data: meeting,
    error: errorMeeting,
    isLoading: loadingMeeting,
    mutate: mutateMeeting,
  } = useSWR(`/api/meeting/${meetingId}`, fetchMeeting(meetingId || ""));

  const updateMeeting = async ({
    meetingId,
    meetingOn,
    title,
  }: MeetingUpdateProps) => {
    const updated: Meeting = {
      id: meetingId,
      topic: title,
      meetingOn,
    };
    mutateMeeting(updated, false);
    const { data, errors } = await client.models.Meeting.update({
      id: meetingId,
      topic: title,
      meetingOn: meetingOn.toISOString(),
    });
    if (errors) handleApiErrors(errors, "Error updating the meeting");
    mutateMeeting(updated);
    return data.id;
  };

  return { meeting, errorMeeting, loadingMeeting, updateMeeting };
};

export default useMeeting;
