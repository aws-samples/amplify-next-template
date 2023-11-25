import Image from 'next/image'
import Link from 'next/link'
import { Contents } from '@components/Contents'
import ImgAbout1 from '@/public/abouts/1.webp'
import { getI18n, getScopedI18n, getCurrentLocale } from '@/locales/server'
import { PhotoSlider } from '@components/PhotoSlider'


export default async function AboutPage() {
  const lang = await getI18n()
  return (
    <Contents>
    <div className='w-full flex flex-col items-center justify-start py-20 gap-2'>
      
      <div className='w-full flex gap-2 mt-2'>
        <div className='text-[37px]'>{lang('about.title')}</div>
      </div>

      <div className='w-full h-auto flex gap-2 bg-[#042013]'>
        <PhotoSlider interval={1000} hegit='h-[35vh]' />
      </div>
           
      <div className='w-full my-2 border-b'></div>

      <div className='w-full flex gap-2 my-4'>
        <ul className='mx-4 text-[28px]'>
          <li>{lang('about.desc[0]')}</li>
          <li>{lang('about.desc[1]')}</li>
        </ul>
      </div>

      <div className='w-full my-2 border-b'></div>

      <div className='w-full flex gap-2'>
        <ul className='mx-8 mr-60'>
          <li>{lang('about.detial')}</li>
        </ul>
      </div>

    </div>
    
    </Contents>
  )
}
