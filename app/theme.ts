import { Inter, Noto_Sans_JP } from 'next/font/google'

const interFont = Inter({ subsets: ['latin'] });
const notoSansJPFont = Noto_Sans_JP({ subsets: ['latin'] })

export const theme = {
  mainContentsColor: 'black',
  subContentsColor: 'white',
  contentWidth: '68vw',
  sectionMargin: '96px',
  maxItemFontSize: '80px',
  fonts: {
    inter: interFont,
    notoSansJP: notoSansJPFont
  }
}


