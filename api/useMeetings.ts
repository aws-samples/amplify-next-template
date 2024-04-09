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
};

export const mapMeeting = ({
  id,
  topic,
  meetingOn,
  createdAt,
}: Schema["Meeting"]): Meeting => ({
  id,
  topic,
  meetingOn: new Date(meetingOn || createdAt),
});

const fetchMeetings = (context?: Context) => () =>
  client.models.Meeting.list({
    filter: { context: { eq: context || "" } },
  }).then(({ data }) =>
    data
      .map(mapMeeting)
      .sort((a, b) => a.meetingOn.getTime() - b.meetingOn.getTime())
  );

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

/**

const debouncedSearchText = debounce(
  async (searchText: string, setLocalSearchText: (text: string) => void) => {
    setLocalSearchText(searchText);
  },
  1500
);


const useMeetings = () => {

  useEffect(() => {
    debouncedSearchText(searchText, setLocalSearchText);
  }, [searchText]);

};
 */
