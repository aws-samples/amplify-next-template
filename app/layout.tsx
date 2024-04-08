import type { Metadata } from 'next'
import './globals.css'
import TopBar from './components/organisms/Header'
import styled from 'styled-components'
import { theme } from './theme'

import { Inter, Noto_Sans_JP } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const notojp = Noto_Sans_JP({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
