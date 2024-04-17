'use client'
import React, {Component} from "react";
import NavBar from "../components/navbar";
import styles from "./beerlisting.module.css"

const navigation = {
    brand: { name: "Drafted", to: "/"},
    links: [
        { name: "Batch Control", to: "/batchcontrol", },
        { name: "Beer Listing", to: "/beerlisting", },
        { name: "News Posts", to: "/news", },
        { name: "Settings", to: "/settings", },
    ]
    
}

export default class BeerListing extends Component {
    render() {
        const { brand, links } = navigation;

        return (
            <main className={styles.main}>
                <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' />
                <NavBar brand={brand} links={links}/>

                <div className={styles.mainContainer}>
                    <div className="form">
                        <h2 className={styles.heading1}>Add a New Beer Listing</h2>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Beer Name</label>
                            <input type="text" name="name"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Beer Style</label>
                            <input type="text" name="style"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>ABV</label>
                            <input type="text" name="abv"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>IBU</label>
                            <input type="text" name="ibu"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Color (SRM)</label>
                            <input type="text" name="color"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Beer Description</label>
                            <input type="text" name="description"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Batch Image</label>
                            <input type="file" name="image" accept="image/png, image/jpeg"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Serving Size</label>
                            <input type="text" name="servingsize"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Ingredients</label>
                            <input type="text" name="ingredients"/>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.labelClass}>Start Date</label>
                            <input type="text" name="date"/>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button className={styles.saveButton}>Save</button>
                            <button className={styles.clearButton}>Clear</button>
                        </div>
                    </div>
                    <div className={styles.dataTable}>
                        <h2 className={styles.heading2}>Beers</h2>
                    </div>
                </div>

                
            </main>
        );
    }
}