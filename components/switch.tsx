'use client'
import { Props } from '@lib/Interfaces'
import { useChangeLocale } from '@/locales/client'
import { Settings } from '../settings'

export function Switch(props: Props) {
  const changeLocale = useChangeLocale(/* { preserveSearchParams: true } */)
  const langs = Settings.lang
  const { className, ...otherProps } = props
  const onItemClick = (locale: any) =>{
    changeLocale(locale)
  }
  return (
    <div className='w-full h-auto fixed top-0 z-[200]'>
      <div className='w-[100px] h-[50px] m-4 !fixed !top-0 flex items-center justify-center gap-2'>
        {
          langs.map((item, key)=> (
            <button key={key} type="button" onClick={() => onItemClick(item)}>{item.toUpperCase()}</button>
          ))
        }
      </div>
    </div>
  )
}