import { FC } from "react";
import { Meeting } from "@/helpers/types";
import styles from "./Meeting.module.css";
import { flow, map } from "lodash/fp";
import { sortActivities } from "@/helpers/functional";
import ActivityComponent from "../activities/activity";

export const getMeetingDate = ({ meetingOn, createdAt }: Meeting) =>
  new Date(meetingOn || createdAt);

type MeetingRecordProps = {
  meeting: Meeting;
};
const MeetingRecord: FC<MeetingRecordProps> = ({ meeting }) => {
  return (
    <div>
      <h3>
        {`${new Date(getMeetingDate(meeting)).toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })} – ${meeting.topic}`}
      </h3>
      <div>
        {meeting.participants.map(({ person: { id, name } }) => (
          <span key={id} className={styles.token}>
            {name}
          </span>
        ))}
      </div>

      {flow(
        sortActivities,
        map((activity) => (
          <ActivityComponent
            key={activity.id}
            activity={activity}
            showProjects
          />
        ))
      )(meeting.activities)}
    </div>
  );
};
export default MeetingRecord;
