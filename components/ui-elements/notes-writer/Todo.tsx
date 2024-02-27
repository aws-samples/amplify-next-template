import {
  CustomTextType,
  NotesWriterCategories,
  createShortCutMapper,
} from "./CustomText";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

const typeName = "todo";
type TypeName = "todo";

export type TodoType = {
  type: TypeName;
  done: boolean;
  children: CustomTextType[];
};

export const todo: NotesWriterCategories<TypeName, CustomTextType, TodoType> = {
  shortcuts: createShortCutMapper(["[]", "[x]"], typeName),
  mapRenderer: {
    [typeName]: (props) => {
      const { attributes, children } = props;
      const { done } = props.element as TodoType;
      return (
        <div {...attributes}>
          {done ? <IoCheckboxOutline /> : <IoSquareOutline />} {children}
        </div>
      );
    },
  },
  mapProps: {
    [typeName]: (text) => ({ type: typeName, done: text === "[x]" }),
  },
  serialize: {
    [typeName]: (note: TodoType) =>
      `${note.done ? "[x]" : "[]"} ${note.children
        .map(({ text }) => text)
        .join("")}`,
  },
};
