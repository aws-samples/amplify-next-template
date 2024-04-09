import { debounce } from "lodash";
import { Descendant } from "slate";
import { TransformNotesToMdFunction } from "./notes-writer/notes-writer-helpers";

type DebouncedUpdateNotesProps = {
  notes: Descendant[];
  transformerFn: TransformNotesToMdFunction;
  setSaveStatus: (status: boolean) => void;
  updateNotes: (notes: string) => Promise<string | undefined>;
  createActivity?: (notes: string) => Promise<string | undefined>;
};

export const debouncedUpdateNotes = debounce(
  async ({
    notes: descendants,
    transformerFn,
    setSaveStatus,
    updateNotes,
    createActivity,
  }: DebouncedUpdateNotesProps) => {
    const notes = transformerFn(descendants);
    if (createActivity) {
      const newActivity = await createActivity(notes);
      if (newActivity) setSaveStatus(true);
      return;
    }
    const data = await updateNotes(notes);
    if (data) setSaveStatus(true);
  },
  1000
);
