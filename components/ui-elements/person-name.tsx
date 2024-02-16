import { FC } from "react";
import styles from "./PersonName.module.css";
import { Participant } from "@/helpers/types/data";

type PersonNameProps = {
  person: Participant;
};
const PersonName: FC<PersonNameProps> = ({ person }) => {
  return <span className={styles.person}>{person.name}</span>;
};
export default PersonName;
