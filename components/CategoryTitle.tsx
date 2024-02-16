import { IoChevronBackOutline } from "react-icons/io5";
import styles from "./CategoryTitle.module.css";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type AddButtonProps = {
  label: string;
  onClick: () => void;
};

export type CategoryTitleProps = {
  title?: string;
  addButton?: AddButtonProps;
  drawBackBtn?: boolean;
  onBackBtnClick?: () => void;
  onTitleChange?: (newTitle: string) => void;
};

export default function CategoryTitle(props: CategoryTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.title);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [title, isEditing]);

  useEffect(() => setTitle(props.title), [props.title]);

  const handleBlur = () => {
    setIsEditing(false);
    if (props.onTitleChange && title) {
      props.onTitleChange(title);
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
        (props.onTitleChange && isEditing ? (
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
              props.onTitleChange ? styles.isEditable : ""
            }`}
            onClick={() => {
              if (props.onTitleChange) setIsEditing(true);
            }}
          >
            {title}
          </h1>
        ))}
      {props.addButton && (
        <div className={styles.action}>
          <a className={styles.actionBtn} onClick={props.addButton.onClick}>
            {props.addButton.label}
          </a>
        </div>
      )}
    </header>
  );
}
