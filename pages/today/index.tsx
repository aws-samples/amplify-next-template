import Layout from "@/components/layouts/Layout";
import styles from "./Today.module.css";
import { useEffect, useMemo, useState } from "react";
import DayPlanForm from "@/components/dayplan/dayplan-form";
import { DayPlan } from "@/helpers/types/data";
import Tasks from "@/components/dayplan/tasks";
import Notification from "@/components/ui-elements/notification";
import { dayplansSubscription } from "@/helpers/api-operations/subscriptions";
import { createDayPlan as createDayPlanApi } from "@/helpers/api-operations/create";
import { completeDayPlan as completeDayPlanApi } from "@/helpers/api-operations/update";
import { wait } from "@/helpers/functional";
import { useAppContext } from "@/components/navigation-menu/AppContext";
import SubmitButton from "@/components/ui-elements/submit-button";

export default function TodayPage() {
  const [dayplans, setDayplans] = useState<DayPlan[]>([]);
  const [showCreateDayPlan, setShowCreateDayPlan] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { context } = useAppContext();

  useEffect(() => {
    const filter = { done: { ne: "true" }, context: { eq: context } };
    const subscription = dayplansSubscription(({ items, isSynced }) => {
      setDayplans([...(items || [])]);
    }, filter);
    return () => subscription.unsubscribe();
  }, [context]);

  const createDayPlan = async (goal: string, date: string) => {
    if (!context) return;
    const data = await createDayPlanApi(date, goal, context);
    if (!data) return;
    setSuccessMessage("Day plan successfully created");
    setShowCreateDayPlan(false);
  };

  const completeDayPlan = async (dayplanId: string) => {
    const data = await completeDayPlanApi(dayplanId);
    if (!data) return;
    await wait(500);
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
      sectionName="Today's Tasks"
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

          <SubmitButton
            onClick={() => completeDayPlan(id)}
            wrapperClassName={styles.fullWidth}
            btnClassName={styles.fullWidth}
          >
            Complete Day Plan
          </SubmitButton>
        </div>
      ))}
    </Layout>
  );
}
