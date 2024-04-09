import useMeeting from "@/api/useMeeting";
import MainLayout from "@/components/layouts/MainLayout";
import { useRouter } from "next/router";
import styles from "./Meetings.module.css";
import DateSelector from "@/components/ui-elements/date-selector";
import useMeetingParticipants from "@/api/useMeetingParticipants";
import PersonName from "@/components/ui-elements/tokens/person-name";
import PeopleSelector from "@/components/ui-elements/people-selector";
import useMeetingActivities from "@/api/useMeetingActivities";
import ProjectNotesForm from "@/components/ui-elements/project-notes-form/project-notes-form";
import { useEffect, useMemo, useState } from "react";
import SavedState from "@/components/ui-elements/project-notes-form/saved-state";
import { debounce } from "lodash";
import { Activity } from "@/api/useActivity";

const MeetingDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const meetingId: string | undefined = Array.isArray(id) ? id[0] : id;
  const { meeting, loadingMeeting, updateMeeting } = useMeeting(meetingId);
  const {
    meetingParticipants,
    loadingMeetingParticipants,
    createMeetingParticipant,
  } = useMeetingParticipants(meetingId);
  const { meetingActivities, loadingMeetingActivities, createMeetingActivity } =
    useMeetingActivities(meetingId);
  const [meetingDate, setMeetingDate] = useState(
    meeting?.meetingOn || new Date()
  );
  const [dateTitleSaved, setDateTitleSaved] = useState(true);
  const [participantsSaved, setParticipantsSaved] = useState(true);
  const [allSaved, setAllSaved] = useState(true);
  const [newActivityId, setNewActivityId] = useState(crypto.randomUUID());

  useEffect(() => {
    setAllSaved(dateTitleSaved && participantsSaved);
  }, [dateTitleSaved, participantsSaved]);

  useEffect(() => {
    if (!meeting) return;
    setMeetingDate(meeting.meetingOn);
  }, [meeting]);

  const debouncedUpdateMeeting = useMemo(
    () =>
      debounce(
        async ({ meetingOn, title }: { meetingOn?: Date; title?: string }) => {
          if (!meeting) return;
          const data = await updateMeeting({
            meetingId: meeting.id,
            title: title || meeting.topic,
            meetingOn: meetingOn || meeting.meetingOn,
          });
          if (data) setDateTitleSaved(true);
        },
        1500
      ),
    [updateMeeting, meeting]
  );

  const handleDateChange = (date: Date) => {
    if (!meeting) return;
    setDateTitleSaved(false);
    setMeetingDate(date);
    debouncedUpdateMeeting({
      meetingOn: date,
    });
  };

  const addParticipant = async (personId: string) => {
    setParticipantsSaved(false);
    const data = await createMeetingParticipant(personId, meetingId);
    if (data) setParticipantsSaved(true);
  };

  const handleBackBtnClick = () => {
    router.push("/meetings");
  };

  const saveMeetingTitle = (newTitle: string) => {
    if (!meeting) return;
    if (newTitle === meeting.topic) return;
    setDateTitleSaved(false);
    debouncedUpdateMeeting({ title: newTitle });
  };

  const saveNewActivity = async (notes?: string) => {
    const data = await createMeetingActivity(newActivityId, notes);
    setNewActivityId(crypto.randomUUID());
    return data;
  };

  return (
    <MainLayout
      title={meeting?.topic || "Loading..."}
      recordName={meeting?.topic}
      sectionName="Meetings"
      onBackBtnClick={handleBackBtnClick}
      onTitleChange={() => setDateTitleSaved(false)}
      saveTitle={saveMeetingTitle}
    >
      {loadingMeeting && "Loading meeting..."}
      {meeting && (
        <div>
          <SavedState saved={allSaved} />
          <h2>Meeting on:</h2>
          <DateSelector
            date={meetingDate}
            setDate={handleDateChange}
            selectHours
          />
          <h2>Participants:</h2>
          {loadingMeetingParticipants && "Loading participants..."}
          {meetingParticipants?.map(({ personId }) =>
            !personId ? "" : <PersonName key={personId} personId={personId} />
          )}
          <SavedState saved={participantsSaved} />
          <PeopleSelector
            onChange={addParticipant}
            clearAfterSelection
            allowNewPerson
          />
          <h2>Notes:</h2>
          {loadingMeetingActivities && "Loading notes..."}
          {[
            ...(meetingActivities?.filter((ma) => ma.id !== newActivityId) ||
              []),
            {
              id: newActivityId,
              finishedOn: new Date(),
              notes: "",
              meetingId,
            } as Activity,
          ].map(({ id }) => (
            <ProjectNotesForm
              key={id}
              activityId={id}
              className={styles.projectNote}
              createActivity={
                id === newActivityId ? saveNewActivity : undefined
              }
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default MeetingDetailPage;
