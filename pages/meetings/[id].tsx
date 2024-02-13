import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";

export default function MeetingDetailPage() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <Layout title={"New Meeting"} drawBackBtn>
      WIP
    </Layout>
  );
}
