import styles from "./Meetings.module.css";
import { useRouter } from "next/router";
import { useContextContext } from "@/contexts/ContextContext";
import useMeetings, { Meeting } from "@/api/useMeetings";
import MainLayout from "@/components/layouts/MainLayout";
import MeetingRecord from "@/components/meetings/meeting";

export default function MeetingsPage() {
  const { context } = useContextContext();
  const { meetings, loadingMeetings, meetingDates, createMeeting } =
    useMeetings({ context });
  const router = useRouter();

  const createAndOpenNewMeeting = async () => {
    const id = await createMeeting("New Meeting", context); // ADD CONTEXT
    if (!id) return;
    router.push(`/meetings/${id}`);
  };

  return (
    <MainLayout
      title="Meetings"
      sectionName="Meetings"
      addButton={{ label: "New", onClick: createAndOpenNewMeeting }}
    >
      {loadingMeetings && "Loading..."}
      {meetingDates.map((date) => (
        <div key={date.toLocaleDateString()}>
          <h1 className={styles.date}>{date.toLocaleDateString()}</h1>
          {meetings
            ?.filter(
              ({ meetingOn }) =>
                meetingOn.toISOString().split("T")[0] ===
                date.toISOString().split("T")[0]
            )
            .map((meeting: Meeting) => (
              <MeetingRecord key={meeting.id} meeting={meeting} />
            ))}
        </div>
      ))}
    </MainLayout>
  );
}
