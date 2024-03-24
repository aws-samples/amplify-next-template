import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopBar from './components/TopBar'
import styled from 'styled-components'
import { theme } from './theme'

const inter = Inter({ subsets: ['latin'] })



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
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        {children}
      </body>
    </html>
  )
}
