import { useRouter } from "next/router";
import { FC } from "react";
import Layout from "@/components/layouts/Layout";
import MeetingForm from "@/components/meetings/meeting-form";

type EditMeetingPageProps = {};

const EditMeetingPage: FC<EditMeetingPageProps> = (props) => {
  const router = useRouter();
  const { id } = router.query;

  return !id ? (
    <Layout title="Loading..." recordName="Loading..." sectionName="Meeting">
      Loading Meeting...
    </Layout>
  ) : (
    <MeetingForm meetingId={id as string} />
  );
};
export default EditMeetingPage;
