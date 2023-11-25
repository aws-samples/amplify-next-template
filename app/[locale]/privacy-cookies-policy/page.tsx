import Image from 'next/image'
import Link from 'next/link'
import { Contents } from '@components/Contents'
import { getI18n, getScopedI18n, getCurrentLocale } from '@/locales/server';  

export default async function PrivacyPage() {
  const lang = await getI18n()
  return (
    <Contents>
    <div className='w-full flex flex-col items-center justify-start py-5 gap-2'>
 
      <div className='w-full flex flex-col mt-10 gap-2'>
        <div className='mx-4 text-[22px] font-bold mb-4'>{lang('privacy.item[0].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('privacy.item[0].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('privacy.item[1].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('privacy.item[1].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('privacy.item[2].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('privacy.item[2].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('privacy.item[3].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('privacy.item[3].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('privacy.item[4].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('privacy.item[4].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('privacy.item[5].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('privacy.item[5].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('privacy.item[6].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('privacy.item[6].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('privacy.item[7].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('privacy.item[7].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('privacy.item[8].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('privacy.item[8].desc')}</li>
        </ul>
      </div>

    </div>
    
    </Contents>
  )
}
