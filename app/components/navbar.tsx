import * as React from 'react';
import styles from './navbar.module.css'
import Image from 'next/image'
import imagePath from "public/beer.svg"

const NavBar = (props: {
    brand: { name: string; to: string },
    links: Array<{ name: string, to: string }>
     }) => {
        const { brand, links } = props;

        const NavLinks: any = () => links.map((link: { name: string, to: string}) => <li key={link.name}><a href={link.to}>{link.name}</a></li>)

        return (
            <div className={styles.navBar}>
                <div className={styles.container}>
                    <a href={brand.to} className={styles.brand}><Image src={imagePath} alt="Drafted" width={50} height={50}/></a>
                    <ul className={styles.navLinks}>
                        <NavLinks />
                    </ul>
                </div>
            </div>
    )
}

export default NavBar