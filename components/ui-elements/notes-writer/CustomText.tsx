import { FC } from "react";
import { Descendant } from "slate";
import { ReactEditor, RenderElementProps } from "slate-react";

export const createShortCutMapper = (shortCuts: string[], type: string) =>
  shortCuts.reduce((prev, curr) => ({ ...prev, [curr]: type }), {});

type ElementMinimal<T, ChildrenType> = {
  type: T;
  children: ChildrenType[];
};

export type NotesWriterCategories<
  T extends string,
  ChildrenType,
  Type extends ElementMinimal<T, ChildrenType>
> = {
  shortcuts: { [key: string]: T };
  mapRenderer: { [K in T]: FC<RenderElementProps> };
  mapProps?: { [K in T]: (beforeText: string) => Partial<Type> };
  mapWrapperFn?: { [K in T]: (editor: ReactEditor) => void };
  serialize?: { [K in T]: (note: Type) => string };
};

export type CustomTextType = { text: string };
export type TextType = { type: "paragraph"; children: CustomTextType[] };

export const RenderText: FC<RenderElementProps> = (props) => {
  const { attributes, children } = props;
  return <div {...attributes}>{children}</div>;
};
