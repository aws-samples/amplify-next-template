import { FC, ReactNode } from "react";
import styles from "./SubmitButton.module.css";

type OnClickType = {
  onClick: () => void;
  type?: never;
};

type BtnType = {
  onClick?: never;
  type: "submit";
};

type SubmitButtonProps = (OnClickType | BtnType) & {
  children: ReactNode;
};

const SubmitButton: FC<SubmitButtonProps> = ({ children, onClick, type }) => {
  return (
    <div>
      <button className={styles.button} type={type} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
export default SubmitButton;
