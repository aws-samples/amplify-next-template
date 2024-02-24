import { FC, useState, useEffect } from "react";
import { createMeeting as createMeetingApi } from "@/helpers/api-operations/create";
import MeetingForm from "@/components/meetings/meeting-form";
import Layout from "@/components/layouts/Layout";

const NewMeetingPage: FC = () => {
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const createMeeting = async () => {
    setIsLoading(true);
    const data = await createMeetingApi();
    setIsLoading(false);
    if (!data) return;
    setMeetingId(data.id);
  };

  useEffect(() => {
    createMeeting();
  }, []);

  if (isLoading) {
    return (
      <Layout title="Loading..." recordName="Loading..." sectionName="Meeting">
        Creating new meeting...
      </Layout>
    );
  }
  if (!meetingId) {
    return (
      <Layout title="Error" sectionName="Meeting" recordName="Error">
        Error creating the meeting. Are you connected to the internet?
      </Layout>
    );
  }
  return <MeetingForm meetingId={meetingId} />;
};

export default NewMeetingPage;
