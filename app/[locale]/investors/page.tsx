import Link from 'next/link'
import { Contents } from '@components/Contents'

import { getI18n, getScopedI18n, getCurrentLocale } from '@/locales/server';  

export default async function InvestorsPage() {
  const lang = await getI18n()

  return (
    <div className='relative'>
    
      <div className='z-[10] relative'>
        <Contents>
        <div className='w-full h-full flex flex-col items-center justify-center py-20'>
          
          <div className='flex my-4'>
            <div className='font-enriqueta font-serif font-bold text-[38px] text-[#111111]'>{lang('invest.title')}</div>
          </div>
              
          <div className='flex'>
            <ul className='text-[24px]  text-[#111111]'>
              <li>{lang('invest.desc')}</li>
            </ul>
          </div>

        </div>
        </Contents>
      </div>

      <div className='z-[10] relative min-h-[600px] h-auto bg-[#999999]'>
        <Contents>
          <ul className='mx-20 gap-40 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left'>
            <li><div className='text-center text-[#4d4b4b] text-[24px] h-[40px] my-10'>{lang('invest.item[0].title')}</div><div>{lang('invest.item[0].desc')}</div></li>
            <li><div className='text-center text-[#4d4b4b] text-[24px] h-[40px] my-10'>{lang('invest.item[1].title')}</div><div>{lang('invest.item[1].desc')}</div></li>
            <li><div className='text-center text-[#4d4b4b] text-[24px] h-[40px] my-10'>{lang('invest.item[2].title')}</div><div>{lang('invest.item[2].desc')}</div></li>
          </ul>
          <div className='text-center text-[25px]'>{lang('invest.contact.name') + lang('invest.contact.address')}</div>
        </Contents>
        <div className='py-4 mx-20 border-t'></div>
      </div>

      <div className='z-[10] relative min-h-[350px] h-auto bg-[#999999]'>
        <div className='mx-40  min-h-[280px] bg-[#111111]'>
          <ul className='mx-[25%] py-10'>
            <li><span className='ml-4 text-[22px]'>{lang('invest.end.title')}</span></li>
            <li><span>{lang('invest.end.desc')}</span></li>
          </ul>
        </div>
      </div>

    </div>
  )
}
