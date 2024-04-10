import { type Schema } from "@/amplify/data/resource";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { handleApiErrors } from "./globals";
import { Context } from "@/contexts/ContextContext";
import useSWR from "swr";
import { flow } from "lodash";
import { addDaysToDate, getDayOfDate } from "@/helpers/functional";
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

const fetchMeetings = (page: number, context?: Context) => async () => {
  if (!context) return;
  const compareDate = flow(addDaysToDate(-4 * 7), getDayOfDate)(new Date());
  const { data, errors } = await client.models.Meeting.list({
    filter: {
      and: [
        {
          or: [
            { context: { eq: context } },
            {
              and: [
                { context: { ne: "work" } },
                { context: { ne: "family" } },
                { context: { ne: "hobby" } },
              ],
            },
          ],
        },
        {
          or: [
            {
              meetingOn: { gt: compareDate },
            },
            {
              and: [
                { meetingOn: { attributeExists: false } },
                { createdAt: { gt: compareDate } },
              ],
            },
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

type UseMeetingsProps = {
  context?: Context;
  page?: number;
};

const useMeetings = ({ page = 1, context }: UseMeetingsProps) => {
  const {
    data: meetings,
    error: errorMeetings,
    isLoading: loadingMeetings,
    mutate: mutateMeetings,
  } = useSWR(
    `/api/meetings/${context}/page/${page}`,
    fetchMeetings(page, context)
  );
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
