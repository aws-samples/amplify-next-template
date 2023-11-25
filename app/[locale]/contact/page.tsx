import Image from 'next/image'
import Link from 'next/link'
import { getI18n } from '@/locales/server'; 
import { Contents } from '@components/Contents'
import IcoMeeting from '@public/contact/Meeting.webp'

export default async function ContactPage() {
  const lang = await getI18n()
  return (
    <Contents>
    <div className='w-full flex flex-col items-center justify-start py-20 mx-10 gap-2'>
      

      <div className='w-full flex gap-2'>
        <span className='text-[40px]'>{lang('contact.title')}</span>
      </div>

     
      <div className='min-h-[30vh] grid lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left h-auto'>
        <div className='flex'>
          <Image src={IcoMeeting} alt='Meeting' className='h-[100%] w-auto'/>
        </div>
        <div className='flex flex-col'>
          <div className='h-[15vh]'>
            <input type='text' placeholder={lang('contact.input.name')} className='bg-[#111111] h-[28%] w-[70%] my-1 float-right border border-[#111111] focus:border-[#504343] focus:bg-[#995e5e] hover:bg-[#6e1616] focus:outline-none'/>
            <input type='text' placeholder={lang('contact.input.email')} className='bg-[#111111] h-[28%] w-[70%] my-1 float-right border border-[#111111] focus:border-[#504343] focus:bg-[#995e5e] hover:bg-[#6e1616] focus:outline-none'/>
            <input type='text' placeholder={lang('contact.input.subject')} className='bg-[#111111] h-[28%] w-[70%] my-1 float-right border border-[#111111] focus:border-[#504343] focus:bg-[#995e5e] hover:bg-[#6e1616] focus:outline-none'/>
          </div>
          <div className='h-[15vh]'>
            <input className='bg-[#111111] h-full w-[70%] my-1 float-right border border-[#111111] focus:border-[#504343] focus:bg-[#995e5e] hover:bg-[#6e1616] focus:outline-none'/>
          </div>
        </div>        
      </div>

      <div className='w-full'>
        <input type='submit' className='float-right'/>
      </div>
      

    </div>
    
    </Contents>
  )
}
