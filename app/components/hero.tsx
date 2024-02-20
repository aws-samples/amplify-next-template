"use client";

import React from "react"

import styles from "./styles.module.css"
import { Button, Typography} from "@mui/material";
  
export default function Hero(props: any) {
    return (<div className={styles.hero}>
        <div className="hero-inner">
            <span>
                <Typography className={styles.hero_text}>{props.text}</Typography>
                <Typography className={styles.hero_subtext}>{props.subText}</Typography>
                <Button size="large" variant="contained" color="secondary">{props.actionText}</Button>
            </span>
        </div>
    </div>)
}