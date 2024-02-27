import Layout from "@/components/layouts/Layout";
import styles from "../../components/meetings/Meetings.module.css";
import { useRouter } from "next/router";
import { flow, map, uniq } from "lodash/fp";
import { useEffect, useMemo, useState } from "react";
import { Meeting } from "@/helpers/types/data";
import MeetingRecord, { getMeetingDate } from "@/components/meetings/meeting";
import { getDayOfDate } from "@/helpers/functional";
import { meetingsSubscription } from "@/helpers/api-operations/subscriptions";
import { useAppContext } from "@/components/navigation-menu/AppContext";
import { filterBySearchText } from "@/components/meetings/helpers/meetings";
import { transformMdToNotes } from "@/components/ui-elements/notes-writer/helpers";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { searchTextUpperCase, setSearchText } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    setSearchText("");
    const subscription = meetingsSubscription(({ items, isSynced }) => {
      setMeetings(
        items.map((meeting) => ({
          ...meeting,
          activities: meeting.activities.map((activity) => ({
            ...activity,
            slateNotes: transformMdToNotes(activity.notes),
          })),
        })) || []
      );
    });
    return () => subscription.unsubscribe();
  }, [setSearchText]);

  const sortedMeetings = useMemo(
    () =>
      meetings
        .filter(filterBySearchText(searchTextUpperCase))
        .sort(
          (a, b) =>
            new Date(b.meetingOn || b.createdAt).getTime() -
            new Date(a.meetingOn || a.createdAt).getTime()
        ),
    [meetings, searchTextUpperCase]
  );

  const meetingDates = useMemo(
    () => flow(map(getMeetingDate), map(getDayOfDate), uniq)(sortedMeetings),
    [sortedMeetings]
  );

  return (
    <Layout
      title="Meetings"
      sectionName="Meetings"
      addButton={{
        label: "New",
        onClick: () => router.push("/meetings/new"),
      }}
    >
      {meetings.length === 0
        ? "Loading..."
        : meetingDates.map((date: string, idx: number) => (
            <div key={idx}>
              <h1 className={styles.date}>
                {new Date(date).toLocaleDateString()}
              </h1>
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
