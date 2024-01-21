import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="center">
        <div className={styles.description}>
          <h1>Guldkystens Dartklub</h1>
        </div>
      </div>

      <Image
        src="/dart.png"
        width={800}
        height={957}
        alt="Guldkystens Dartklub Logo"
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        priority
      />
    </main>
  );
}
