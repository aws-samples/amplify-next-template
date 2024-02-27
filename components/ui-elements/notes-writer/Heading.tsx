import {
  CustomTextType,
  NotesWriterCategories,
  createShortCutMapper,
} from "./CustomText";
import styles from "./NotesWriter.module.css";

const typeName = "heading";
type TypeName = "heading";

export type HeadingType = {
  type: TypeName;
  level: number;
  children: CustomTextType[];
};

export const heading: NotesWriterCategories<
  TypeName,
  CustomTextType,
  HeadingType
> = {
  shortcuts: createShortCutMapper(
    ["#", "##", "###", "####", "#####", "######"],
    typeName
  ),
  mapRenderer: {
    [typeName]: (props) => {
      const { attributes, children } = props;
      const { level } = props.element as HeadingType;
      return level === 1 ? (
        <h1 className={styles.heading} {...attributes}>
          {children}
        </h1>
      ) : level === 2 ? (
        <h2 className={styles.heading} {...attributes}>
          {children}
        </h2>
      ) : level === 3 ? (
        <h3 className={styles.heading} {...attributes}>
          {children}
        </h3>
      ) : level === 4 ? (
        <h4 className={styles.heading} {...attributes}>
          {children}
        </h4>
      ) : level === 5 ? (
        <h5 className={styles.heading} {...attributes}>
          {children}
        </h5>
      ) : (
        <h6 className={styles.heading} {...attributes}>
          {children}
        </h6>
      );
    },
  },
  mapProps: { [typeName]: (text) => ({ type: typeName, level: text.length }) },
};
