import { CustomTextType, NotesWriterCategories } from "./CustomText";

const typeName = "block-quote";
type TypeName = "block-quote";

export type BlockQuoteType = {
  type: TypeName;
  children: CustomTextType[];
};

export const blockQuote: NotesWriterCategories<
  TypeName,
  CustomTextType,
  BlockQuoteType
> = {
  shortcuts: { ">": typeName },
  mapRenderer: {
    [typeName]: (props) => {
      const { attributes, children } = props;
      return <blockquote {...attributes}>{children}</blockquote>;
    },
  },
  serialize: {
    [typeName]: (note: BlockQuoteType) =>
      `> ${note.children.map(({ text }) => text).join("")}`,
  },
};
