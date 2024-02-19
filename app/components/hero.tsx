"use client";

import React from "react"
import { Button } from "@aws-amplify/ui-react";

import styles from "./styles.module.css"

export default function Hero(props: any) {
    return (<div className={styles.hero}>
        <div className="hero-inner">
            <span>
                <h1>{props.headerText}</h1>
                <Button className="btn btn-accent">
                    {props.callToAction}
                </Button>
            </span>
        </div>
    </div>)
}