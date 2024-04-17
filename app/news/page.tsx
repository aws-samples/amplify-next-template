'use client'
import React, {Component} from "react";
import NavBar from "../components/navbar";
import styles from "./news.module.css"

const navigation = {
    brand: { name: "Drafted", to: "/"},
    links: [
        { name: "Batch Control", to: "/batchcontrol", },
        { name: "Beer Listing", to: "/beerlisting", },
        { name: "News Posts", to: "/news", },
        { name: "Settings", to: "/settings", },
    ]
    
}

export default class News extends Component {
    render() {
        const { brand, links } = navigation;

        return (
            <main className={styles.main}>
                <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' />
                <NavBar brand={brand} links={links}/>

                <div className={styles.mainContainer}>
                    <div className="form">
                        <h2 className={styles.heading1}>Add a News Listing</h2>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Title</label>
                            <input type="text" name="title"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Type</label>
                            <input type="text" name="type"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Start Date</label>
                            <input type="text" name="start"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>End Date</label>
                            <input type="text" name="date"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Content</label>
                            <input type="file" name="content" accept="image/png, image/jpeg"/>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button className={styles.saveButton}>Save</button>
                            <button className={styles.clearButton}>Clear</button>
                        </div>
                    </div>
                    <div className={styles.dataTable}>
                        <h2 className={styles.heading2}>News</h2>
                    </div>
                </div>

                
            </main>
        );
    }
}