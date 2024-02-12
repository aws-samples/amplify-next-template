import { FC, useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

type DayPlanFormProps = {
  onSubmit: (goal: string, date: string) => void;
};

const DayPlanForm: FC<DayPlanFormProps> = ({ onSubmit: onConfirm }) => {
  const [goal, setGoal] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  const addDays = (add: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + add);
    const newDate = d.toISOString().split("T")[0];
    setDate(newDate);
  };
  return (
    <div>
      <div>
        <input
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder="Give the day a goal"
        />
      </div>
      <div>
        <IoRemoveCircleOutline onClick={() => addDays(-1)} />
        {` ${new Date(date).toDateString()} `}
        <IoAddCircleOutline onClick={() => addDays(1)} />
      </div>
      <div>
        <button onClick={() => onConfirm(goal, date)}>Confirm</button>
      </div>
    </div>
  );
};

export default DayPlanForm;
