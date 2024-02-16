import { Nullable } from "@/helpers/types/data";
import { FC } from "react";

type NotesViewerProps = {
  notes?: Nullable<string>;
};

const NotesViewer: FC<NotesViewerProps> = ({ notes }) => {
  return (
    !!notes && (
      <div>
        {notes.split("\n").map((note, idx) => (
          <p key={idx}>{note}</p>
        ))}
      </div>
    )
  );
};

export default NotesViewer;
