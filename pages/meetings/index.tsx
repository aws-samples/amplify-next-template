import Layout from "@/components/layouts/Layout";
import styles from "./Meetings.module.css";
import { useRouter } from "next/router";
import { filter, flow, map, uniq } from "lodash/fp";
import { useEffect, useState } from "react";
import { Schema } from "@/amplify/data/resource";
import { Meeting, SubNextFunctionParam } from "@/helpers/types";
import { generateClient } from "aws-amplify/data";
import MeetingRecord, { getMeetingDate } from "@/components/meetings/meeting";
import { getDayOfDate, sortDates } from "@/helpers/functional";
import { meetingsSelectionSet } from "@/helpers/selection-sets";

const client = generateClient<Schema>();

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const router = useRouter();

  useEffect(() => {
    const query = {
      selectionSet: meetingsSelectionSet,
    };
    // @ts-expect-error
    const sub = client.models.Meeting.observeQuery(query).subscribe({
      next: ({ items, isSynced }: SubNextFunctionParam<Meeting>) => {
        setMeetings([...(items || [])]);
      },
    });
    return () => sub.unsubscribe();
  }, []);

  return (
    <Layout
      title="Meetings"
      addButton={{
        label: "New",
        onClick: () => router.push("/meetings/new"),
      }}
    >
      {meetings.length === 0
        ? "Loading..."
        : flow(
            map(getMeetingDate),
            map(getDayOfDate),
            uniq,
            sortDates(true),
            map((date: string) => (
              <div>
                <h2>{new Date(date).toLocaleDateString()}</h2>
                {flow(
                  filter(
                    flow(
                      getMeetingDate,
                      getDayOfDate,
                      (meetingDate: string) => meetingDate === date
                    )
                  ),
                  map((meeting: Meeting) => (
                    <MeetingRecord key={meeting.id} meeting={meeting} />
                  ))
                )(meetings)}
              </div>
            ))
          )(meetings)}
    </Layout>
  );
}
