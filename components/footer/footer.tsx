'use client'
import React from 'react'
import { Props } from '@lib/Interfaces'
import { Contents } from '@components/Contents'
import Image from 'next/image'
import Link from 'next/link'
import IcoTwitter from '@/public/twitter.webp'
import IcoTel from '@/public/tel.webp'
import IcoContact from '@/public/contact.webp'
import IcoCopyRight from '@/public/copyright.webp'
import { useI18n } from '@/locales/client';

export function RootFooter(props: Props){
    const lang = useI18n()
    const { className, ...otherProps } = props
    return(
        <div className={`w-full  bg-[#000000] ${className}`} {...otherProps}>
            <Contents>
            <div className={`mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left ${className}`} {...otherProps}>
                <div className='flex flex-row items-center justify-start gap-4 py-4' >
                    <Link href='https://twitter.com/Veritaze_' className='flex flex-row items-center'><Image src={IcoTwitter} alt='twitter'/> </Link>
                    <Link href='https://t.me/Veritaze' className='flex flex-row items-center'><Image src={IcoTel} alt='telegram'/></Link>
                </div>
                <div className='flex flex-col items-center justify-center py-4' >
                    <Link href='terms-of-use' className='w-full flex flex-row items-center gap-2'><span className='border-b'>{lang('footer.item[0][0]')}</span></Link>
                    <Link href='privacy-cookies-policy' className='w-full flex flex-row items-center gap-2'><span className='border-b'>{lang('footer.item[0][1]')}</span></Link>
                </div>
                <div className='flex flex-col items-center justify-center py-4' >
                    <Link href='contact' className='w-full flex flex-row items-center gap-2'><span className='inline-block w-9'><Image src={IcoContact} alt='contact'/></span><span className='border-b'>{lang('footer.item[1][0]')}</span></Link>
                    <Link href='investors' className='w-full flex flex-row items-center gap-2'><span className='inline-block w-9'></span><span className='border-b'>{lang('footer.item[1][1]')}</span></Link>
                </div>
                <div className='flex flex-row items-center justify-start gap-4 py-4' ><Image src={IcoCopyRight} alt='copy right'/> <p>{lang('footer.item[2][0]')}</p></div>
            </div>
            </Contents>
        </div>
    )
}