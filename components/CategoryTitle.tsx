import { IoChevronBackOutline } from "react-icons/io5";
import styles from "./CategoryTitle.module.css";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import SubmitButton from "./ui-elements/submit-button";

export type CategoryTitleProps = {
  title?: string;
  addButton?: {
    label: string;
    onClick: () => void;
  };
  drawBackBtn?: boolean;
  onBackBtnClick?: () => void;
  saveTitle?: (newTitle: string) => void;
  onTitleChange?: (newTitle: string) => void;
};

const CategoryTitle: FC<CategoryTitleProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.title);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (props.onTitleChange) props.onTitleChange(event.target.value);
    setTitle(event.target.value);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [title, isEditing]);

  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);

  const handleBlur = () => {
    setIsEditing(false);
    if (props.saveTitle && title) {
      props.saveTitle(title);
    }
  };

  return (
    <header className={styles.content}>
      {(props.drawBackBtn || props.onBackBtnClick) && (
        <div
          className={styles.backAction}
          onClick={
            props.onBackBtnClick ? props.onBackBtnClick : () => router.back()
          }
        >
          <IoChevronBackOutline className={styles.backBtn} />
        </div>
      )}
      {title &&
        (props.saveTitle && isEditing ? (
          <textarea
            rows={1}
            ref={textAreaRef}
            value={title}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            className={`${styles.editableTitle} ${styles.alignCenterOnMedium} ${styles.flush}`}
            autoFocus
          />
        ) : (
          <h1
            className={`${styles.alignCenterOnMedium} ${styles.flush} ${
              props.saveTitle ? styles.isEditable : ""
            }`}
            onClick={() => (props.saveTitle ? setIsEditing(true) : null)}
          >
            {title}
          </h1>
        ))}
      {props.addButton && (
        <SubmitButton
          btnClassName={styles.actionBtn}
          wrapperClassName={styles.action}
          onClick={props.addButton.onClick}
        >
          {props.addButton.label}
        </SubmitButton>
      )}
    </header>
  );
};

export default CategoryTitle;
