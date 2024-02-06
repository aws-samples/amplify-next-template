import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' />
      <div style={{ width: '100%', height: '103px', background: '#C16C47', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', marginTop: '0px', marginLeft: '0px' }}>
        <div style={{ justifyContent: 'center', alignItems: 'center', gap: 32, display: 'flex' }}>
          <div><Image
            className={styles.logo}
            src="/beer.svg"
            alt="Next.js Logo"
            width={100}
            height={100}
            priority />
          </div>
          <div style={{ width: 34.55, height: 30, position: 'relative' }}>

          </div>

          <div style={{ color: 'white', fontSize: 20, fontFamily: 'Montserrat', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word' }}>Batch Control</div>
          <div style={{ color: 'white', fontSize: 20, fontFamily: 'Montserrat', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word' }}>Beer Listing</div>
          <div style={{ color: 'white', fontSize: 20, fontFamily: 'Montserrat', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word' }}>News Listing</div>
          <div style={{ color: 'white', fontSize: 20, fontFamily: 'Montserrat', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word' }}>Settings</div>
        </div>
      </div>






    </main>

  )
}
