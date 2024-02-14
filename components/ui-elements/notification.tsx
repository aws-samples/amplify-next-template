import { FC } from "react";

type NotificationProps = {
  message?: string;
};
const Notification: FC<NotificationProps> = ({ message }) => {
  return !message ? <></> : <div>{message}</div>;
};

export default Notification;
