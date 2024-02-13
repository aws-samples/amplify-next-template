import { ProjectActivity } from "@/helpers/types";
import { FC } from "react";

type ActivityProps = {
  activity: ProjectActivity;
};
const Activity: FC<ActivityProps> = ({
  activity: {
    activity: { finishedOn, createdAt, notes },
  },
}) => {
  return (
    <div>
      <h4>{new Date(finishedOn || createdAt).toLocaleString()}</h4>
      <div>{notes}</div>
    </div>
  );
};

export default Activity;
