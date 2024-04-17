'use client'
import React, {Component} from "react";
import NavBar from "../components/navbar";
import styles from "./batchcontrol.module.css";

const navigation = {
    brand: { name: "Drafted", to: "/"},
    links: [
        { name: "Batch Control", to: "/batchcontrol", },
        { name: "Beer Listing", to: "/beerlisting", },
        { name: "News Posts", to: "/news", },
        { name: "Settings", to: "/settings", },
    ]
    
}

export default class BatchControl extends Component {
    render() {
        const { brand, links } = navigation;

        return (
            <main className={styles.main}>
                <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' />
                <NavBar brand={brand} links={links}/>

                <div className={styles.mainContainer}>
                    <div className="form">
                        <h2 className={styles.heading1}>Create a New Batch</h2>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Batch Name</label>
                            <input type="text" name="name"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Creation Date</label>
                            <input type="text" name="date"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Batch Description</label>
                            <input type="text" name="desc"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Ingredients</label>
                            <input type="text" name="ingredients"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>ABV</label>
                            <input type="text" name="abv"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>IBU (International Bitterness Index)</label>
                            <input type="text" name="ibu"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Quantity Produced (In Gallons)</label>
                            <input type="text" name="quantity"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Type of Packaging</label>
                            <input type="text" name="type"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Batch Image</label>
                            <input type="file" name="image" accept="image/png, image/jpeg"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Linked Beer</label>
                            <input type="text" name="linked"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Status</label>
                            <input type="text" name="status"/>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button className={styles.saveButton}>Save</button>
                            <button className={styles.clearButton}>Clear</button>
                        </div>
                    </div>
                    <div className={styles.dataTable}>
                        <h2 className={styles.heading2}>Batches</h2>
                    </div>
                </div>

                
            </main>
        );
    }
}