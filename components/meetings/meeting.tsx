import { FC } from "react";
import { Meeting } from "@/api/useMeetings";
import styles from "./Meeting.module.css";
import ActivityComponent from "../activities/activity";
import PersonName from "../ui-elements/tokens/person-name";
import useMeetingParticipants from "@/api/useMeetingParticipants";
import useMeetingActivities from "@/api/useMeetingActivities";

type MeetingRecordProps = {
  meeting: Meeting;
};
const MeetingRecord: FC<MeetingRecordProps> = ({ meeting }) => {
  const { meetingParticipants, loadingMeetingParticipants } =
    useMeetingParticipants(meeting.id);
  const { meetingActivities, loadingMeetingActivities } = useMeetingActivities(
    meeting.id
  );

  return (
    <div>
      <h2>
        <a href={`/meetings/${meeting.id}`} className={styles.title}>
          {meeting.meetingOn.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          – {meeting.topic}
          <small style={{ color: "gray" }}>
            {" "}
            {(meeting.context || "none").toUpperCase()}
          </small>
        </a>
      </h2>
      <div>
        {loadingMeetingParticipants && "Loading attendees..."}
        {(meetingParticipants?.length || 0) > 0 && "Attendees: "}
        {meetingParticipants?.map(({ personId }) =>
          !personId ? "" : <PersonName key={personId} personId={personId} />
        )}
        {loadingMeetingActivities && "Loading meeting notes..."}
        {(meetingActivities?.length || 0) > 0 && <h3>Meeting notes:</h3>}
        {meetingActivities?.map(({ id }) => (
          <ActivityComponent key={id} activityId={id} showProjects />
        ))}
      </div>
    </div>
  );
};
export default MeetingRecord;
