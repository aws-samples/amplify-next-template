import Image from 'next/image'
import Link from 'next/link'
import { Contents } from '@components/Contents'
import IcoPartner from '@public/partners/partnermark.webp'
import { getI18n, getScopedI18n, getCurrentLocale } from '@/locales/server';  

export default async function PartnerPage() {
  const lang = await getI18n()
  return (
    <Contents>
    <div className='w-full flex flex-col items-center justify-start py-20 gap-2'>
      
      <div className='w-full flex gap-2 my-4'>
        <Image src={IcoPartner} alt='solution'/>
      </div>
      
      <div className='w-full flex gap-2'>
        <span className='mx-4 mr-60 mt-20 text-[32px]'>{lang('partner.title')}</span>
      </div>
     
      <div className='w-full flex gap-2 my-4'>
        <ul className='mx-14 text-[20px] '>
          <li>{lang('partner.desc')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-20 gap-2'>
        <div className='mx-4 text-[28px]'>{lang('partner.conts.title')}</div>
        <ul className='mx-14 mr-60 list-decimal text=[22px]'>
          
          <li>{lang('partner.conts.list[0]')}</li>
          <li>{lang('partner.conts.list[1]')}</li>
          <li>{lang('partner.conts.list[2]')}</li>
          <li>{lang('partner.conts.list[3]')}</li>
          <li>{lang('partner.conts.list[4]')}</li>
        </ul>
      </div>

      <div className='w-full flex flex-col mt-20 gap-2 mb-10'>
        <div className='mx-4 text-[28px]'>{lang('partner.end.title')}</div>
        <ul className='mx-14 mr-60 text=[22px]'>
          
          <li className='my-4'>{lang('partner.end.list[0]')}</li>
          <li className='my-4'>{lang('partner.end.list[1]')}</li>
          <li className='my-4'>{lang('partner.end.list[2]')}</li>
          
        </ul>
      </div>

    </div>
    
    </Contents>
  )
}
