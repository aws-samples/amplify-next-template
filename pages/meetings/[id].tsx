import Layout from "@/components/layouts/Layout";
import PersonName from "@/components/ui-elements/person-name";
import SubmitButton from "@/components/ui-elements/submit-button";
import { Meeting } from "@/helpers/types/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../components/meetings/Meetings.module.css";
import ProjectName from "@/components/ui-elements/project-name";
import { getMeeting } from "@/helpers/api-operations/get";
import NotesWriter from "@/components/ui-elements/notes-writer";

export default function MeetingDetailPage() {
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    getMeeting(id as string, setMeeting);
  }, [id]);

  return (
    <Layout
      title={meeting?.topic || "Loading..."}
      recordName={meeting?.topic}
      sectionName="Meeting"
      onBackBtnClick={() => router.push("/meetings")}
    >
      {!meeting ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>
            Meeting on:{" "}
            {new Date(meeting.meetingOn || meeting.createdAt).toLocaleString(
              undefined,
              {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
          </h2>
          <SubmitButton
            onClick={() => router.push(`/meetings/${id as string}/edit`)}
          >
            <strong>Edit Meeting</strong>
          </SubmitButton>
          <h3>Participants:</h3>
          <div>
            {meeting.participants.map(({ person }) => (
              <PersonName key={person.id} person={person} />
            ))}
          </div>

          {meeting.activities.map(({ id, forProjects, slateNotes }) => (
            <div key={id} className={styles.projectNote}>
              <h3>Notes</h3>
              <NotesWriter note={slateNotes} readonly />
              <h4>For Projects:</h4>
              {forProjects?.map(({ projects }) => (
                <ProjectName key={projects.id} project={projects} />
              ))}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
