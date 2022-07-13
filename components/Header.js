import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/Header.module.css'
import { useSession } from "next-auth/react"

export default function Header() {
    const { data: session, status: loading } = useSession();

    return (
        <nav className={styles.navBar}>
            {session && <Link href='/adressBook' ><a className={styles.navBtn}>פרטי משפחות</a></Link>
}
            <Link href='/login' ><a className={styles.navBtn}>כניסת משתמש</a></Link>
            <Link href='/contactUs' ><a className={styles.navBtn}>צור קשר</a></Link>
            <Link href='/gallery' ><a className={styles.navBtn}>גלריה</a></Link>
            <Link href='/people' ><a className={styles.navBtn}>אנשים</a></Link>
            <Link href='/howToHelp'><a className={styles.navBtn}>אני רוצה לעזור</a></Link>
            <Link href='/about' ><a className={styles.navBtn}>אודות</a></Link>
            <Link href='/' ><a className={styles.navBtn}>
                <Image src='/logo.png' alt="" width={50} height={50} />
            </a></Link>
        </nav>       
    )
}
