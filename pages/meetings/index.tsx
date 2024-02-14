import Layout from "@/components/layouts/Layout";
import styles from "./Meetings.module.css";
import { useRouter } from "next/router";
import { flow, map, uniq } from "lodash/fp";
import { useEffect, useMemo, useState } from "react";
import { Schema } from "@/amplify/data/resource";
import { Meeting, SubNextFunctionParam } from "@/helpers/types";
import { generateClient } from "aws-amplify/data";
import MeetingRecord, { getMeetingDate } from "@/components/meetings/meeting";
import { getDayOfDate } from "@/helpers/functional";
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

  const sortedMeetings = useMemo(
    () =>
      meetings.sort(
        (a, b) =>
          new Date(b.meetingOn || b.createdAt).getTime() -
          new Date(a.meetingOn || a.createdAt).getTime()
      ),
    [meetings]
  );

  const meetingDates = useMemo(
    () => flow(map(getMeetingDate), map(getDayOfDate), uniq)(sortedMeetings),
    [sortedMeetings]
  );

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
        : meetingDates.map((date: string, idx: number) => (
            <div key={idx}>
              <h2>{new Date(date).toLocaleDateString()}</h2>
              {sortedMeetings
                .filter(
                  flow(
                    getMeetingDate,
                    getDayOfDate,
                    (meetingDate: string) => meetingDate === date
                  )
                )
                .map((meeting: Meeting) => (
                  <MeetingRecord key={meeting.id} meeting={meeting} />
                ))}
            </div>
          ))}
    </Layout>
  );
}
