'use client'
import React, { useEffect, useState } from 'react';
import { PrivacyItemProps } from '@lib/Interfaces'

export function PrivacyItem(props: PrivacyItemProps){

    return (
        <div className={`${props.mt}'w-full flex flex-col gap-2'`}>
            <div className={`${props.titlefsize} ${props.titlebold?'font-bold':'font-normal'} 'mx-4 mb-4'`}>{props.title}</div>
            <ul className={`${props.leading} ${props.descfsize}'mx-4 mr-60'`}>
            <li>{props.desc}</li>
            </ul>
        </div>
    )
}