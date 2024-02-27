import { FC, FormEvent, useState } from "react";
import DateSelector from "../ui-elements/date-selector";
import SubmitButton from "../ui-elements/submit-button";
import styles from "./DayPlan.module.css";

type DayPlanFormProps = {
  onSubmit: (goal: string, date: string) => void;
};

const DayPlanForm: FC<DayPlanFormProps> = ({ onSubmit: onConfirm }) => {
  const [goal, setGoal] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    confirm();
  };

  const confirm = () => {
    onConfirm(goal, date.toISOString().split("T")[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.fullWidth} ${styles.dayGoal}`}>
          <input
            className={styles.fullWidth}
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            placeholder="Give the day a goal"
          />
        </div>
      </form>
      <DateSelector date={date} setDate={setDate} className={styles.date} />
      <SubmitButton onClick={confirm}>Confirm</SubmitButton>
    </div>
  );
};

export default DayPlanForm;
