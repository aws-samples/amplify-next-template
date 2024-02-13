import { Dispatch, FC, SetStateAction } from "react";
import styles from "./NotesWriter.module.css";

type NotesWriterProps = {
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
};
const NotesWriter: FC<NotesWriterProps> = ({ note, setNote }) => {
  return (
    <div className={styles.fullWidth}>
      <textarea
        className={styles.fullWidth}
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
    </div>
  );
};
export default NotesWriter;
