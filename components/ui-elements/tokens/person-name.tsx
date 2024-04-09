import { FC } from "react";
import styles from "./Tokens.module.css";
import usePerson from "@/api/usePerson";

type PersonNameProps = {
  personId: string;
  noLinks?: boolean;
};

const PersonName: FC<PersonNameProps> = ({ personId, noLinks }) => {
  const { person, loadingPerson } = usePerson(personId);
  return (
    !loadingPerson &&
    (noLinks ? (
      <span className={styles.personName}>{person?.name}</span>
    ) : (
      <a href={`/people/${personId}`} className={styles.personName}>
        {person?.name}
      </a>
    ))
  );
};
export default PersonName;
