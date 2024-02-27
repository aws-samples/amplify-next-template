import { FC, useEffect, useState } from "react";
import styles from "./SavedState.module.css";

type SavedStateProps = {
  saved: boolean;
  className?: string;
};

const SavedState: FC<SavedStateProps> = (props) => {
  const [showSavedMsg, setShowSavedMsg] = useState(props.saved);

  useEffect(() => {
    setShowSavedMsg(props.saved);
    if (props.saved) {
      setShowSavedMsg(true);
      const timer = setTimeout(() => {
        setShowSavedMsg(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [props.saved]);

  return (
    <div
      className={`${props.className} ${styles.savedStatusMsg} ${
        props.saved
          ? showSavedMsg
            ? ""
            : styles.fadeOut
          : styles.unsavedChanges
      }`}
    >
      {props.saved ? "Changes saved" : "Unsaved changes"}
    </div>
  );
};
export default SavedState;
