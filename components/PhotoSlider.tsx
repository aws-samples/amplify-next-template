'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { PhotoSliderProps } from '@lib/Interfaces'
import ImgNavLeft from '@/public/abouts/nav-left.png'
import ImgNavRight from '@/public/abouts/nav-right.png'

export function PhotoSlider(props: PhotoSliderProps){
    
    const [PhotoIndex, setPhotoIndex] = useState<number>(0);
    const photos = [
        "bg-[url('../../public/abouts/1.webp')]",
        "bg-[url('../../public/abouts/2.webp')]"
    ];
    

    const onClickLeft = () =>{
        let num = (PhotoIndex - 1) < 0 ? 0 : (PhotoIndex - 1);
        setPhotoIndex(num);
    }

    const onClickRight = () =>{
        let num = (PhotoIndex + 1) % photos.length;
        setPhotoIndex(num);
    }

    useEffect(() => {
        const timer  = setTimeout(() => {
            setPhotoIndex((PhotoIndex + 1) % photos.length);
        }, props.interval);
        return () => clearTimeout(timer);
    }, [PhotoIndex])

    return (
        <div className={`${photos[PhotoIndex]} ${props.hegit} w-full flex items-center justify-between bg-no-repeat bg-cover`}>
            <div className='w-1/2 h-full flex items-center justify-start'>
                <Image onClick={onClickLeft} src={ImgNavLeft} width={30}  alt='slider left' className={`${PhotoIndex > 0 ? 'visible':'hidden'} 'bg-transparent'`} />
            </div>
            <div className='w-1/2 h-full flex items-center justify-end'>
                <Image onClick={onClickRight} src={ImgNavRight}  width={30} alt='slider right' className={`${PhotoIndex < photos.length-1 ? 'visible':'hidden'} 'bg-transparent'`} />
            </div>
        </div>
    )
}