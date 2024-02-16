import { FC } from "react";
import styles from "./NotesWriter.module.css";

type NotesWriterProps = {
  note: string;
  setNote: (newNote: string) => void;
};
const NotesWriter: FC<NotesWriterProps> = ({ note, setNote }) => {
  return (
    <div className={styles.fullWidth}>
      <textarea
        className={styles.fullWidth}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        autoFocus
      />
    </div>
  );
};
export default NotesWriter;
