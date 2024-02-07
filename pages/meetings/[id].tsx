import { meetings } from "@/components/demo-data/meetings";
import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";

export default function MeetingDetailPage() {
  const router = useRouter();
  const id = router.query.id;
  const meeting = meetings.find((m) => `${m.id}` === id);
  return (
    <Layout title={meeting?.title || "New Meeting"} drawBackBtn>
      {JSON.stringify(meeting)}
    </Layout>
  );
}
