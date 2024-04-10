import { type Schema } from "@/amplify/data/resource";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { handleApiErrors } from "./globals";
import { Context } from "@/contexts/ContextContext";
import useSWR from "swr";
const client = generateClient<Schema>();

export type Meeting = {
  id: string;
  topic: string;
  meetingOn: Date;
  context?: Context;
};

export const mapMeeting: (data: Schema["Meeting"]) => Meeting = ({
  id,
  topic,
  meetingOn,
  createdAt,
  context,
}) => ({
  id,
  topic,
  meetingOn: new Date(meetingOn || createdAt),
  context: context || undefined,
});

const fetchMeetings = (context?: Context) => async () => {
  const { data, errors } = await client.models.Meeting.list({
    filter: {
      or: [
        { context: { eq: context || "" } },
        {
          and: [
            { context: { ne: "work" } },
            { context: { ne: "family" } },
            { context: { ne: "hobby" } },
          ],
        },
      ],
    },
  });
  if (errors) throw errors;
  return data
    .map(mapMeeting)
    .sort((a, b) => b.meetingOn.getTime() - a.meetingOn.getTime());
};

const useMeetings = (context?: Context) => {
  const {
    data: meetings,
    error: errorMeetings,
    isLoading: loadingMeetings,
    mutate: mutateMeetings,
  } = useSWR(`/api/meetings/${context}`, fetchMeetings(context));
  const [meetingDates, setMeetingDates] = useState<Date[]>([]);

  const createMeeting = async (
    topic: string,
    context?: Context
  ): Promise<string | undefined> => {
    const newMeeting: Meeting = {
      id: crypto.randomUUID(),
      topic,
      meetingOn: new Date(),
    };
    const updatedMeetings = [newMeeting, ...(meetings || [])];
    mutateMeetings(updatedMeetings, false);
    const { data, errors } = await client.models.Meeting.create({
      ...newMeeting,
      meetingOn: newMeeting.meetingOn.toISOString(),
      context,
    });
    if (errors) handleApiErrors(errors, "Error creating a meeting");
    mutateMeetings(updatedMeetings);
    return data.id;
  };

  useEffect(() => {
    setMeetingDates(
      meetings
        ?.reduce((prev: string[], curr) => {
          const day = curr.meetingOn.toISOString().split("T")[0];
          return [...prev, ...(prev.includes(day) ? [] : [day])];
        }, [] as string[])
        .map((d) => new Date(d)) || []
    );
  }, [meetings]);

  return {
    meetings,
    errorMeetings,
    loadingMeetings,
    meetingDates,
    createMeeting,
  };
};

export default useMeetings;
