import MainLayout from "@/components/layouts/MainLayout";
import styles from "./Today.module.css";
import { useState } from "react";
import DayPlanForm from "@/components/dayplan/dayplan-form";
import Tasks from "@/components/dayplan/tasks";
import SubmitButton from "@/components/ui-elements/submit-button";
import useDayPlans from "@/api/useDayplans";
import { useContextContext } from "@/contexts/ContextContext";

const TodayPage = () => {
  const { context } = useContextContext();
  const {
    dayPlans,
    errorDayPlans,
    loadingDayPlans,
    createDayPlan,
    completeDayPlan,
  } = useDayPlans(context);
  const [showCreateDayPlan, setShowCreateDayPlan] = useState(false);

  return (
    <MainLayout
      title="Today's Tasks"
      sectionName="Today's Tasks"
      addButton={
        showCreateDayPlan
          ? undefined
          : {
              label: "New",
              onClick: () => setShowCreateDayPlan(true),
            }
      }
    >
      {showCreateDayPlan && (
        <DayPlanForm
          onSubmit={(goal, date) => {
            createDayPlan(date, goal, context);
            setShowCreateDayPlan(false);
          }}
        />
      )}

      {(!context || loadingDayPlans) && "Loading..."}
      {errorDayPlans && <div>Error: {errorDayPlans}</div>}

      {dayPlans?.map(({ id, day, dayGoal }) => (
        <div key={id}>
          <h2 className={styles.dayGoal}>
            {dayGoal} – {new Date(day).toLocaleDateString()}
            <SubmitButton
              onClick={() => completeDayPlan(id)}
              wrapperClassName={styles.doneBtn}
            >
              Done
            </SubmitButton>
          </h2>
          <Tasks day={day} dayPlanId={id} />
        </div>
      ))}
    </MainLayout>
  );
};

export default TodayPage;
