import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>


      <div className={styles.center} style={{ display: "flex", flexDirection: "column" }}>
        <h1>Lyric Boost</h1>
        <p>Elevate your lyrical game</p>
      </div>


    </main>
  )
}
