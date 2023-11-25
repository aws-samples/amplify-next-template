'use client'
import { useEffect } from 'react'

import Image from 'next/image'
import { Props } from '@lib/Interfaces'
import { Contents } from '@components/Contents'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n ,useCurrentLocale} from '@/locales/client'

import Icohlogo from '@public/h-logo.png'


export function RootHeader(props: Props){
    
    const currentLocale = useCurrentLocale()
    const lang = useI18n()
    
    const menulist = [
        {name:  lang('header.home'),            path:'/'},
        {name:  lang('header.solutions'),       path: '/solutions'},
        {name:  lang('header.about'),           path: '/about'},
        {name:  lang('header.investors'),       path: '/investors'},
        {name:  lang('header.partners'),        path: '/partners'},
        {name:  lang('header.contact'),         path:'/contact'}
    ]
    
    const prefexLocale = '/' + currentLocale
    const { className, ...otherProps } = props
    const pathname = usePathname() //'/ru'
    const uri = prefexLocale == pathname ? '/' : pathname.replace(prefexLocale, '')

    return(
        <div className={`w-full bg-[#2B6CA3] ${className}`} {...otherProps}>
            <Contents>
                <div className={`flex list-direction ${className}`} {...otherProps}>
                    <Image
                        src={Icohlogo}
                        alt='Header Logo'
                        className='w-auto h-full'
                        priority={true}
                    />
                    <ul className='w-full flex list-direction header-panel mb-8'>
                        {
                            menulist.map((item, index)=>(
                                <li key={index} className='header-item'>
                                    <Link className={ item.path == uri ? 'text-[#111111]' : 'text-[#fff]' } href={`${item.path}`}>{item.name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Contents>
        </div>
    )
}