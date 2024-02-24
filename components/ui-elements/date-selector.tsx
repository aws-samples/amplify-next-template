import { FC } from "react";
import styles from "./DateSelector.module.css";

type DateSelectorProps = {
  selectHours?: boolean;
  date: Date;
  setDate: (date: Date) => void;
  className?: string;
};
const DateSelector: FC<DateSelectorProps> = ({
  date,
  setDate,
  selectHours,
  className,
}) => {
  const addHours = (add: number) => {
    const d = new Date(date);
    d.setTime(d.getTime() + add * 1000 * 60 * 60);
    setDate(d);
  };
  const addDays = (add: number) => addHours(add * 24);

  return (
    <div className={className}>
      <button className={styles.dateChanger} onClick={() => addDays(-1)}>
        -Day
      </button>
      {selectHours && (
        <button className={styles.dateChanger} onClick={() => addHours(-1)}>
          -Hour
        </button>
      )}
      <span className={styles.date}>
        {` ${selectHours ? date.toLocaleString() : date.toLocaleDateString()} `}
      </span>

      {selectHours && (
        <button className={styles.dateChanger} onClick={() => addHours(1)}>
          +Hour
        </button>
      )}
      <button className={styles.dateChanger} onClick={() => addDays(1)}>
        +Day
      </button>
    </div>
  );
};

export default DateSelector;
