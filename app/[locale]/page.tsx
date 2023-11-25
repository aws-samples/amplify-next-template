import Image from 'next/image'
import Link from 'next/link'
import { Contents } from '@components/Contents'
import Icohmark from '@public/home-1.gif'
import Icoplay from '@public/play.webp'
import { getI18n, getScopedI18n, getCurrentLocale } from '@/locales/server';  

export default async function Home({ params }: { params: { locale: string } }) {
  const lang = await getI18n()

  return (
    <Contents>
    <div className='w-full flex list-direction items-center justify-start py-20 gap-2'>
      <Image
        src={Icohmark}
        alt='Home Mark'
      />
      <div className='flex items-center flex-col justify-center mx-20 text-justify tracking-normal'>
        <div className='text-[37px]'>{lang('home.title')}</div>
        <div className='w-full my-4 border-b'></div>
        <div className=''>{lang('home.desc')}</div>
        <Link href='/solutions' className='w-full flex items-center justify-start gap-4 my-4'><p className='text-start' >{lang('home.more')}</p><Image src={Icoplay} alt='read more'/></Link>
      </div>
    </div>
    </Contents>
  )
}
