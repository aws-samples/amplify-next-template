import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import styles from "./SubmitButton.module.css";

type SubmitButtonProps = {
  children: ReactNode;
  onClick: () => void;
};
const SubmitButton: FC<SubmitButtonProps> = ({ children, onClick }) => {
  return (
    <div>
      <button className={styles.button} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
export default SubmitButton;
