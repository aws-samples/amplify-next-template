import Layout from "@/components/layouts/Layout";
import styles from "./Today.module.css";
import { useEffect, useState } from "react";
import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import DayPlanForm from "@/components/forms/dayplan";
import { DayPlanTasks, SubNextFunctionParam } from "@/helpers/types";
import Tasks from "@/components/dayplan/tasks";
import { sortByDate } from "@/helpers/functional";
import { flow, get, map } from "lodash/fp";

const client = generateClient<Schema>();

export default function TodayPage() {
  const [dayplans, setDayplans] = useState<DayPlanTasks[]>([]);
  const [showCreateDayPlan, setShowCreateDayPlan] = useState(false);
  const [errorsDayPlanCreation, setErrorDayPlanCreation] = useState<string[]>(
    []
  );
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const query = {
      filter: {
        done: { ne: "true" },
      },
      selectionSet: [
        "id",
        "day",
        "dayGoal",
        "done",
        // "tasks.task",
        // "tasks.context",
      ],
    };
    // @ts-expect-error
    const subscription = client.models.DayPlan.observeQuery(query).subscribe({
      next: ({ items, isSynced }: SubNextFunctionParam<DayPlanTasks>) => {
        setDayplans([...items]);
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  const createDayPlan = async (goal: string, date: string) => {
    const { data, errors } = await client.models.DayPlan.create({
      day: date,
      dayGoal: goal,
    });
    if (errors) {
      setErrorDayPlanCreation(
        errors.map(({ errorType, message }) => `${errorType}: ${message}`)
      );
      return;
    }
    setErrorDayPlanCreation([]);
    setSuccessMessage("Day plan successfully created");
    setShowCreateDayPlan(false);
  };

  const completeDayPlan = async (dayplanId: string) => {
    // @ts-expect-error
    const { data, errors } = await client.models.DayPlan.update({
      id: dayplanId,
      done: true,
    });
    if (errors)
      alert(
        `Error completing plan for the day: ${errors
          .map(({ errorType, message }) => `${errorType}: ${message}`)
          .join("; ")}`
      );
    await new Promise((resolve) => setTimeout(resolve, 500));
    setDayplans([...dayplans.filter(({ id }) => id !== dayplanId)]);
  };

  return (
    <Layout
      title="Today's Tasks"
      addButton={{
        label: "New",
        onClick: () => setShowCreateDayPlan(true),
      }}
    >
      {successMessage && <div>{successMessage}</div>}

      {showCreateDayPlan && (
        <div>
          <DayPlanForm onSubmit={createDayPlan} />
          {errorsDayPlanCreation &&
            errorsDayPlanCreation.map((msg, idx) => <div key={idx}>{msg}</div>)}
        </div>
      )}

      {dayplans
        .sort((a, b) => flow(map(get("day")), sortByDate(true))([a, b]))
        .map(({ id, day, dayGoal }) => (
          <div key={id}>
            <h2>
              {dayGoal} - {new Date(day).toLocaleDateString()}
            </h2>
            <Tasks day={day} dayPlanId={id} />

            {/* <div>Other tasks: {JSON.stringify(tasks)}</div> */}

            <div className={styles.fullWidth}>
              <button
                className={`${styles.fullWidth} ${styles.mainBtn}`}
                onClick={() => completeDayPlan(id)}
              >
                Complete Day Plan
              </button>
            </div>
          </div>
        ))}
    </Layout>
  );
}
