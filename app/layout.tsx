import type { Metadata } from 'next'
import './globals.css'
import TopBar from './components/TopBar'
import styled from 'styled-components'
import { theme } from './theme'



export const metadata: Metadata = {
  title: 'WaratakeBlog',
  description: 'I output my daily learnings and insights. I hope I can grow with everyone.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="jp">
      <style jsx global>{`
        body { font-family: ${theme.fonts.inter.style.fontFamily}, sans-serif}
        body:lang(ja) { font-family: ${theme.fonts.notoSansJP.style.fontFamily}, sans-serif}
      `}</style>
      <body>
        <TopBar />
        {children}
      </body>
    </html>
  )
}
