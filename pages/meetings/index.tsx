import Layout from "@/components/layouts/Layout";
import ListView from "@/components/lists/ListView";
import { meetings } from "./demoData";
import styles from "./Meetings.module.css";
import { useRouter } from "next/router";

export type Meeting = {
  id: number;
  title: string;
  meetingOn: Date;
  participants: string[];
};

export default function MeetingsPage() {
  const router = useRouter();

  return (
    <Layout
      title="Meetings"
      addButton={{
        label: "New",
        onClick: () => router.push("/meetings/new"),
      }}
    >
      <ListView
        listItems={meetings.map(({ id, title, meetingOn, participants }) => ({
          id: `${id}`,
          title,
          description: `On: ${meetingOn.toLocaleString()}, Participants: ${participants.join(
            ", "
          )}`,
          detailOnClick: () => router.push(`/meetings/${id}`),
        }))}
      />
    </Layout>
  );
}
