import Image from 'next/image'
import Link from 'next/link'
import { Contents } from '@components/Contents'
import IcoSolution from '@public/solution.webp'

import { getI18n, getScopedI18n, getCurrentLocale } from '@/locales/server';  

export default async function SolutionPage() {
  const lang = await getI18n()
  return (
    <Contents>
    <div className='w-full flex flex-col items-center justify-start py-20 gap-2'>
      
      <div className='w-full flex gap-2 my-4'>
        <Image src={IcoSolution} alt='solution'/>
        <div className='text-[37px]'>{lang('solution.title')}</div>
      </div>
      
      <div className='w-full flex gap-2'>
        <span className='mx-4 mr-60 text-[28px]'>{lang('solution.desc')}</span>
      </div>
     
      <div className='w-full flex gap-2 my-4'>
        <ul className='mx-14 text-[20px] list-disc'>
          <li>{lang('solution.list[0]')}</li>
          <li>{lang('solution.list[1]')}</li>
          <li>{lang('solution.list[2]')}</li>
          <li>{lang('solution.list[3]')}</li>
        </ul>
      </div>

      <div className='w-full flex gap-2'>
        <ul className='mx-4 mr-60'>
          <li className='text-[28px]'>{lang('solution.end.title')}</li>
          <li>{lang('solution.end.desc')}</li>
        </ul>
      </div>

    </div>
    
    </Contents>
  )
}
