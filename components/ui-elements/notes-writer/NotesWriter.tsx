import React, { FC, useEffect, useState } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import {
  TransformNotesToMdFunction,
  renderElement,
  transformMdToNotes,
  transformNotesToMd,
} from "./notes-writer-helpers";
import styles from "./NotesWriter.module.css";

type NotesWriterProps = {
  notes: string;
  saveNotes?: (
    notes: Descendant[],
    transformerFn: TransformNotesToMdFunction
  ) => void;
  unsaved?: boolean;
};

const NotesWriter: FC<NotesWriterProps> = ({ notes, saveNotes, unsaved }) => {
  const [editor] = useState(() => withReact(withHistory(createEditor())));

  useEffect(() => {
    editor.children = transformMdToNotes(notes);
    editor.onChange();
  }, [notes, editor]);

  const handleEditNote = (val: Descendant[]) => {
    if (!saveNotes) return;
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );
    if (!isAstChange) return;
    saveNotes(val, transformNotesToMd);
  };

  return (
    <div className={styles.fullWidth}>
      <Slate
        editor={editor}
        initialValue={transformMdToNotes(notes)}
        onChange={handleEditNote}
      >
        <Editable
          className={`${styles.editorInput} ${unsaved && styles.unsaved}`}
          renderElement={renderElement}
          placeholder="Start taking notes..."
        />
      </Slate>
    </div>
  );
};

export default NotesWriter;
