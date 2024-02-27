import { Descendant, Editor, Element, Transforms } from "slate";
import {
  CustomTextType,
  NotesWriterCategories,
  createShortCutMapper,
} from "./CustomText";
import { ReactEditor } from "slate-react";

const typeNameBulleted = "bulleted-list";
type TypeNameBulleted = "bulleted-list";

const typeNameItem = "list-item";
type TypeNameItem = "list-item";

export type BulletedListType = {
  type: TypeNameBulleted;
  align?: string;
  children: Descendant[];
};

export type ListItemType = {
  type: TypeNameItem;
  children: CustomTextType[];
};

export const listItems: NotesWriterCategories<
  TypeNameBulleted | TypeNameItem,
  CustomTextType | Descendant,
  BulletedListType | ListItemType
> = {
  shortcuts: createShortCutMapper(["-", "*", "+"], typeNameItem),
  mapRenderer: {
    [typeNameBulleted]: (props) => {
      const { attributes, children } = props;
      return <ul {...attributes}>{children}</ul>;
    },
    [typeNameItem]: (props) => {
      const { attributes, children } = props;
      return <li {...attributes}>{children}</li>;
    },
  },
  mapWrapperFn: {
    [typeNameItem]: (editor: ReactEditor) => {
      const list: BulletedListType = {
        type: typeNameBulleted,
        children: [],
      };
      Transforms.wrapNodes(editor, list, {
        match: (node) =>
          !Editor.isEditor(node) &&
          Element.isElement(node) &&
          node.type === typeNameItem,
      });
    },
    [typeNameBulleted]: () => {},
  },
  serialize: {
    [typeNameBulleted]: (note: BulletedListType) => {
      return note.children
        .map(
          (child: Descendant) =>
            `- ${child.children.map((val) => val.text).join("")}`
        )
        .join("\n");
    },
    [typeNameItem]: () => "",
  },
};
