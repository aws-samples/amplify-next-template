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
  children: ListItemType[];
};

export type ListItemType = {
  type: TypeNameItem;
  children: CustomTextType[];
};

export const bulletedList: NotesWriterCategories<
  TypeNameBulleted,
  Descendant,
  BulletedListType
> = {
  mapRenderer: {
    [typeNameBulleted]: (props) => {
      const { attributes, children } = props;
      return <ul {...attributes}>{children}</ul>;
    },
  },
};

export const listItems: NotesWriterCategories<
  TypeNameItem,
  CustomTextType,
  ListItemType
> = {
  shortcuts: createShortCutMapper(["-", "*", "+"], typeNameItem),
  mapRenderer: {
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
  },
};
