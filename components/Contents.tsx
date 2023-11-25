'use client'
import type { Metadata } from 'next'

export function Contents({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <section className='mx-[20%]'>
        {children}
    </section>
  )
}
