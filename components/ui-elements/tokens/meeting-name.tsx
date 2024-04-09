import { FC } from "react";
import styles from "./Tokens.module.css";
import useMeeting from "@/api/useMeeting";
import useMeetingParticipants from "@/api/useMeetingParticipants";
import PersonName from "./person-name";

type MeetingNameProps = {
  meetingId: string;
  noLinks?: boolean;
};

const NameAndDate: FC<{ topic: string; meetingOn: Date }> = ({
  topic,
  meetingOn,
}) => (
  <>
    {topic}
    <small> on </small>
    <small>
      {meetingOn.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </small>
  </>
);

const MeetingName: FC<MeetingNameProps> = ({ meetingId, noLinks }) => {
  const { meeting } = useMeeting(meetingId);
  const { meetingParticipants } = useMeetingParticipants(meetingId);

  return (
    meeting && (
      <div>
        {noLinks ? (
          <div className={styles.meetingName}>
            <NameAndDate topic={meeting.topic} meetingOn={meeting.meetingOn} />
          </div>
        ) : (
          <a href={`/meetings/${meetingId}`} className={styles.meetingName}>
            <NameAndDate topic={meeting.topic} meetingOn={meeting.meetingOn} />
          </a>
        )}
        <div>
          {meetingParticipants?.map(
            ({ personId }) =>
              personId && (
                <PersonName
                  key={personId}
                  personId={personId}
                  noLinks={noLinks}
                />
              )
          )}
        </div>
      </div>
    )
  );
};

export default MeetingName;
