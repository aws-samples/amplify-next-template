import Image from "next/image";
import styles from "./ProfilePicture.module.css";

export default function ProfilePicture() {
  return (
    <a className={styles.profile} title="Settings">
      <Image
        alt="User name"
        title="User name and Email"
        width="50"
        height="50"
        className={styles.profilePicture}
        src="/images/profile-pic-test.jpeg"
      />
    </a>
  );
}
