import { Activity } from "@/api/useActivity";
import { FC } from "react";

type ActivityMetaDataProps = {
  activity?: Activity;
};

const dateTimeOptions: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

const makeLocaleString = (date: Date) =>
  date.toLocaleDateString(undefined, dateTimeOptions);

const getUpdatedAtTime = ({ updatedAt, finishedOn }: Activity) =>
  `Created: ${makeLocaleString(finishedOn)} ${
    updatedAt.getTime() - finishedOn.getTime() < 1000 * 60
      ? ""
      : ` – Updated on: ${makeLocaleString(updatedAt)}`
  }`;

const ActivityMetaData: FC<ActivityMetaDataProps> = ({ activity }) => {
  return (
    <div style={{ color: "gray", fontSize: "var(--font-size-small)" }}>
      {activity?.id && getUpdatedAtTime(activity)}
    </div>
  );
};

export default ActivityMetaData;
