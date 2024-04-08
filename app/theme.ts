import { Inter, Noto_Sans_JP } from 'next/font/google'

const interFont = Inter({ subsets: ['latin'] });
const notoSansJPFont = Noto_Sans_JP({ subsets: ['latin'] })

export const theme = {
  contentWidth: '65vw',
  sectionMargin: '72px',

  ContentsColors: {
    main: 'white',
    sub: 'black'
  },
  fontsize : {
    xlarge: '80px',
    large: '70px',
    base: '35px'
  },
  fonts: {
    inter: interFont,
    notoSansJP: notoSansJPFont
  }
}


