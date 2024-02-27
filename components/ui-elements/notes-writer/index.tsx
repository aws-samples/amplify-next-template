import { FC, useMemo } from "react";
import { Descendant, createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import styles from "./NotesWriter.module.css";
import { onDomBeforeInput, renderElement, withShortCuts } from "./helpers";
import { withHistory } from "slate-history";

type ReadOnly = {
  readonly: true;
  setNote?: never;
};

type EditingMode = {
  readonly?: never;
  setNote: (newNote: Descendant[]) => void;
};

type NotesWriterProps = (ReadOnly | EditingMode) & {
  note: Descendant[];
};

const NotesWriter: FC<NotesWriterProps> = ({ note, setNote, readonly }) => {
  const editor = useMemo(
    () => withShortCuts(withReact(withHistory(createEditor()))),
    []
  );

  const handleEditNote = (val: Descendant[]) => {
    if (!setNote) return;
    if (JSON.stringify(note) === JSON.stringify(val)) return;
    setNote(val);
  };

  return (
    <div className={`${styles.fullWidth} ${styles.mdEditor}`}>
      <Slate editor={editor} initialValue={note} onChange={handleEditNote}>
        <Editable
          onDOMBeforeInput={onDomBeforeInput(editor)}
          readOnly={readonly}
          renderElement={renderElement}
          placeholder="Start taking notes..."
          spellCheck
          autoFocus
        />
      </Slate>
    </div>
  );
};

export default NotesWriter;
