import Image from 'next/image'
import Link from 'next/link'
import { Contents } from '@components/Contents'
import IcoPartner from '@public/partners/partnermark.webp'
import { getI18n, getScopedI18n, getCurrentLocale } from '@/locales/server';  

export default async function TermsPage() {
  const lang = await getI18n()
  return (
    <Contents>
    <div className='w-full flex flex-col items-center justify-start py-5 gap-2'>
 
      <div className='w-full flex flex-col mt-10 gap-2'>
        <div className='mx-4 text-[20px] font-bold '>{lang('term.title')}</div>
      </div>

      <div className='w-full flex flex-col mt-2 gap-2'>
        <div className='mx-4 text-[14px]'>{lang('term.item[0].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('term.item[0].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('term.item[1].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('term.item[1].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('term.item[2].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('term.item[2].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('term.item[3].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('term.item[3].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('term.item[4].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('term.item[4].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('term.item[5].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('term.item[5].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('term.item[6].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('term.item[6].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px] list-disc ml-8'>
          <li>{lang('term.sublist[0]')}</li>
          <li>{lang('term.sublist[1]')}</li>
          <li>{lang('term.sublist[2]')}</li>
          <li>{lang('term.sublist[3]')}</li>
          <li>{lang('term.sublist[4]')}</li>
          <li>{lang('term.sublist[5]')}</li>
          <li>{lang('term.sublist[6]')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('term.enditem[0].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('term.enditem[0].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('term.enditem[1].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('term.enditem[1].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('term.enditem[2].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('term.enditem[2].desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-2 gap-0'>
        <div className='mx-4 text-[14px] leading-[18px]'>{lang('term.enditem[3].title')}</div>
        <ul className='mx-4 mr-60 text=[12px] leading-[16px]'>
          <li>{lang('term.enditem[3].desc')}</li>
        </ul>
      </div>
    </div>
    
    </Contents>
  )
}
