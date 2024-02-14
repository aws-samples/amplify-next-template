import Layout from "@/components/layouts/Layout";
import styles from "./Today.module.css";
import { useEffect, useMemo, useState } from "react";
import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import DayPlanForm from "@/components/forms/dayplan";
import { DayPlan, SubNextFunctionParam } from "@/helpers/types";
import Tasks from "@/components/dayplan/tasks";
import { handleApiErrors } from "@/helpers/functional";
import { dayplanSelectionSet } from "@/helpers/selection-sets";
import Notification from "@/components/ui-elements/notification";

const client = generateClient<Schema>();

export default function TodayPage() {
  const [dayplans, setDayplans] = useState<DayPlan[]>([]);
  const [showCreateDayPlan, setShowCreateDayPlan] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const query = {
      filter: {
        done: { ne: "true" },
      },
      selectionSet: dayplanSelectionSet,
    };
    // @ts-expect-error
    const subscription = client.models.DayPlan.observeQuery(query).subscribe({
      next: ({ items, isSynced }: SubNextFunctionParam<DayPlan>) => {
        setDayplans([...(items || [])]);
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
      handleApiErrors(errors, "Error creating plan for the day");
      return;
    }
    setSuccessMessage("Day plan successfully created");
    setShowCreateDayPlan(false);
  };

  const completeDayPlan = async (dayplanId: string) => {
    // @ts-expect-error
    const { data, errors } = await client.models.DayPlan.update({
      id: dayplanId,
      done: true,
    });
    if (errors) {
      handleApiErrors(errors, "Error completing plan for the day");
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    setDayplans(dayplans.filter(({ id }) => id !== dayplanId));
  };

  const sortedDayPlans = useMemo(
    () =>
      dayplans.sort(
        (a, b) => new Date(b.day).getTime() - new Date(a.day).getTime()
      ),
    [dayplans]
  );

  return (
    <Layout
      title="Today's Tasks"
      addButton={{
        label: "New",
        onClick: () => setShowCreateDayPlan(true),
      }}
    >
      <Notification message={successMessage} />

      {showCreateDayPlan && (
        <div>
          <DayPlanForm onSubmit={createDayPlan} />
        </div>
      )}

      {sortedDayPlans.map(({ id, day, dayGoal }) => (
        <div key={id}>
          <h2>
            {dayGoal} - {new Date(day).toLocaleDateString()}
          </h2>
          <Tasks day={day} dayPlanId={id} />

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
