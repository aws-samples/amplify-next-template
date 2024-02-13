import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import {
  ProjectActivity,
  ProjectTask,
  SubNextFunctionParam,
} from "@/helpers/types";
import {
  activitiesSelectionSet,
  projectTasksSelectionSet,
} from "@/helpers/selection-sets";
import {
  handleApiErrors,
  makeProjectName,
  sortActivities,
} from "@/helpers/functional";
import { flow, map } from "lodash/fp";
import Activity from "@/components/activities/activity";
import DateSelector from "@/components/ui-elements/date-selector";
import styles from "./Tasks.module.css";

const client = generateClient<Schema>();

export default function TaskDetailPage() {
  const [projectTask, setProjectTask] = useState<ProjectTask | null>(null);
  const [activities, setActivities] = useState<ProjectActivity[]>([]);
  const [nonProjectTask, setNonProjectTask] = useState<
    Schema["NonProjectTask"] | null
  >(null);
  const [newNote, setNewNote] = useState("");
  const [date, setDate] = useState(new Date());

  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    const loadProjectTask = async () => {
      if (!id) return;
      // @ts-ignore
      const { data, errors } = await client.models.DayProjectTask.get(
        { id },
        // @ts-ignore
        { selectionSet: projectTasksSelectionSet }
      );
      if (data) setProjectTask(data);
    };
    if (!projectTask) {
      loadProjectTask();
      return;
    }
    // @ts-expect-error
    const subProjectTasks = client.models.ProjectActivity.observeQuery({
      filter: {
        projectsId: { eq: projectTask.projects.id },
      },
      // @ts-expect-error
      selectionSet: activitiesSelectionSet,
    }).subscribe({
      next: ({ items, isSynced }: SubNextFunctionParam<ProjectActivity>) => {
        setActivities([...items]);
      },
    });
    return () => {
      subProjectTasks.unsubscribe();
    };
  }, [id, projectTask]);

  const createActivity = async () => {
    if (!newNote || !date || !projectTask) {
      alert("Please add a note and a date");
      return;
    }
    const { data: newActivity, errors: activityErrors } =
      await client.models.Activity.create({
        finishedOn: date.toISOString(),
        notes: newNote,
      });
    if (activityErrors) {
      handleApiErrors(activityErrors, "Error creating activity");
      return;
    }
    const activityId = newActivity.id;
    const { data: newLink, errors: linkErrors } =
      await client.models.ProjectActivity.create({
        activityId,
        projectsId: projectTask.projects.id,
      });
    if (linkErrors) {
      handleApiErrors(linkErrors, "Error linking activitiy to project");
      return;
    }
    const finishedOn = date.toISOString();
    const notes = newNote;
    setNewNote("");
    setDate(new Date());
    await new Promise((resolve) => setTimeout(resolve, 500));
    setActivities([
      ...activities,
      {
        activity: {
          id: activityId,
          createdAt: finishedOn,
          finishedOn,
          notes,
        },
      },
    ]);
  };

  return (
    <Layout drawBackBtn>
      {!projectTask ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{projectTask.task}</h1>
          <h3>{makeProjectName(projectTask.projects)}</h3>
          <div>
            <h4>Log new activity</h4>
            <DateSelector date={date} setDate={setDate} selectHours />
            <div className={styles.fullWidth}>
              <textarea
                className={styles.fullWidth}
                value={newNote}
                onChange={(event) => setNewNote(event.target.value)}
              />
            </div>
            <div>
              <button onClick={createActivity}>Submit</button>
            </div>
          </div>

          {flow(
            sortActivities,
            map((activity) => (
              <Activity key={activity.activity.id} activity={activity} />
            ))
          )(activities)}
        </div>
      )}
    </Layout>
  );
}
