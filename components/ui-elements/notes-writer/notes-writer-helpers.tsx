import { Descendant, BaseEditor, Range, Element as SlateElement } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import { FC, HTMLAttributes, ReactNode, SVGAttributes } from "react";

export type ParagraphElement = {
  type: "paragraph";
  align?: string;
  children: CustomText[];
};

export type CustomElement = ParagraphElement;

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  text: string;
};

export type EmptyText = {
  text: string;
};

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<SlateElement, Range[]>;
  };

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
  }
}

interface ElementProps {
  attributes: HTMLAttributes<HTMLElement> & SVGAttributes<SVGElement>;
  children: ReactNode;
  element: CustomElement;
}

const Element: FC<ElementProps> = ({ attributes, children, element }) => {
  return <div {...attributes}>{children}</div>;
};

export const renderElement = (props: ElementProps) => <Element {...props} />;

const initialValue: ParagraphElement = {
  type: "paragraph",
  children: [{ text: "" }],
};

const mapTextChildren = (note: Descendant) =>
  !("children" in note)
    ? note.text
    : note.children.map((val): string => val.text).join("");

export type TransformNotesToMdFunction = (notes: Descendant[]) => string;

export const transformNotesToMd: TransformNotesToMdFunction = (notes) =>
  notes
    .map((note) =>
      !("type" in note)
        ? !("children" in note)
          ? note.text
          : ""
        : mapTextChildren(note)
    )
    .join("\n");

export const transformMdToNotes = (notes: string): Descendant[] => {
  if (notes === "") return [initialValue];

  const splittedNotes = notes.split("\n");
  const nodes = [] as CustomElement[];
  for (let i = 0; i < splittedNotes.length; i++) {
    const note = splittedNotes[i];

    const props: ParagraphElement = {
      type: "paragraph",
      children: [
        {
          text: note,
        },
      ],
    };
    nodes.push(props);
  }
  return nodes;
};
