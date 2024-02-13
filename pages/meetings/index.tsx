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

const client = generateClient<Schema>();

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const router = useRouter();

  useEffect(() => {
    // @ts-expect-error
    const sub = client.models.Meeting.observeQuery({
      selectionSet: [
        "id",
        "topic",
        "meetingOn",
        "createdAt",
        "timeInvested",
        "participants.person.id",
        "participants.person.name",
        "participants.person.accountRoles.role",
        "participants.person.accountRoles.startDate",
        "participants.person.accountRoles.endDate",
        "participants.person.accountRoles.company.name",
        "activities.id",
        "activities.notes",
        "activities.finishedOn",
        "activities.createdAt",
        // @ts-expect-error
        "activities.forProjects.projects.id",
        // @ts-expect-error
        "activities.forProjects.projects.project",
        // @ts-expect-error
        "activities.forProjects.projects.context",
        // @ts-expect-error
        "activities.forProjects.projects.accounts.account.name",
        // @ts-expect-error
        "activities.forProjects.projects.batches.sixWeekBatch.id",
        // @ts-expect-error
        "activities.forProjects.projects.batches.sixWeekBatch.idea",
        // @ts-expect-error
        "activities.forProjects.projects.batches.sixWeekBatch.context",
        // @ts-expect-error
        "activities.forProjects.projects.batches.sixWeekBatch.sixWeekCycle.name",
        // @ts-expect-error
        "activities.forProjects.projects.batches.sixWeekBatch.sixWeekCycle.startDate",
      ],
    }).subscribe({
      next: ({ items, isSynced }: SubNextFunctionParam<Meeting>) => {
        setMeetings([...items]);
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
