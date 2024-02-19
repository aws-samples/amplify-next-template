"use client";

import React from "react"

import styles from "./styles.module.css"
import ButtonAccent from "./button-accent";

export default function Hero(props: any) {
    return (<div className={styles.hero}>
        <div className="hero-inner">
            <span>
                <h1>{props.text}</h1>
                <ButtonAccent text= {props.actionText} />
            </span>
        </div>
    </div>)
}