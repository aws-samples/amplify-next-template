import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Activity, NonProjectTask, ProjectTask } from "@/helpers/types/data";
import { activitySorter, wait } from "@/helpers/functional";
import ActivityComponent from "@/components/activities/activity";
import DateSelector from "@/components/ui-elements/date-selector";
import styles from "./Tasks.module.css";
import NotesWriter from "@/components/ui-elements/notes-writer";
import SubmitButton from "@/components/ui-elements/submit-button";
import { getTask } from "@/helpers/api-operations/get";
import { projectActivitySubscription } from "@/helpers/api-operations/subscriptions";
import { createActivity as createActivityApi } from "@/helpers/api-operations/create";
import ProjectName from "@/components/ui-elements/project-name";
import { useAppContext } from "@/components/navigation-menu/AppContext";
import { filterBySearch } from "@/components/tasks/helpers/tasks";

export default function TaskDetailPage() {
  const [projectTask, setProjectTask] = useState<ProjectTask | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [nonProjectTask, setNonProjectTask] = useState<NonProjectTask | null>(
    null
  );
  const [newNote, setNewNote] = useState("");
  const [date, setDate] = useState(new Date());
  const { searchTextUpperCase } = useAppContext();

  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    if (!id) return;
    if (!projectTask) {
      getTask(id, setProjectTask);
      return;
    }
    const filter = {
      projectsId: { eq: projectTask.projects.id },
    };
    const subscription = projectActivitySubscription(({ items, isSynced }) => {
      setActivities([...items.map(({ activity }) => activity)]);
    }, filter);
    return () => subscription.unsubscribe();
  }, [id, projectTask]);

  const createActivity = async () => {
    if (!newNote || !date || !projectTask) {
      alert("Please add a note and a date");
      return;
    }
    const data = await createActivityApi(
      date,
      newNote,
      projectTask.projects.id
    );
    if (!data?.activityData.id) return;
    const finishedOn = date.toISOString();
    const notes = newNote;
    setNewNote("");
    setDate(new Date());
    await wait(500);
    setActivities([
      ...activities,
      {
        id: data.activityData.id,
        createdAt: finishedOn,
        finishedOn,
        notes,
      },
    ]);
  };

  const sortedActivities: Activity[] = useMemo(
    () =>
      activities
        .filter(filterBySearch(searchTextUpperCase))
        .sort(activitySorter),
    [activities, searchTextUpperCase]
  );

  return (
    <Layout
      onBackBtnClick={() => router.push("/today")}
      recordName={projectTask?.task || "Loading..."}
      sectionName="Task"
    >
      {!projectTask ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{projectTask.task}</h1>
          <h3>
            <ProjectName project={projectTask.projects} />
          </h3>
          <div>
            <h4>Log new activity</h4>
            <DateSelector date={date} setDate={setDate} selectHours />
            <NotesWriter note={newNote} setNote={setNewNote} />
            <SubmitButton onClick={createActivity}>Submit</SubmitButton>
          </div>

          {sortedActivities.map((activity) => (
            <ActivityComponent
              key={activity.id}
              activity={activity}
              showDates
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
