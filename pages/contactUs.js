import React from 'react'
import styles from '../styles/Contact.module.css'
import Image from 'next/image'

export default function contactUs() {
    const admins = [
        {
            name: "ראם וייס",
            phone: "054-3152771"
        },
        {
            name: "דנה חסיד",
            phone: "053-6267620",
        },
        {
            name: "רועי איתן יוטבת",
            phone: '058-6992288',
        },
    ]
    return (
        <div className={styles.contactDiv}>
            <div className={styles.contacts}>
                <div className={styles.contactInfo}>
                    <p className={styles.contactName}>
                        {admins[0].name}
                    </p>
                    <p className={styles.contactPhone}>
                        {admins[0].phone}
                    </p>
                </div>
                <div className={styles.contactInfo}>
                    <p className={styles.contactName}>
                        {admins[1].name}
                    </p>
                    <p className={styles.contactPhone}>
                        {admins[1].phone}
                    </p>
                </div>
                <div className={styles.contactInfo}>
                    <p className={styles.contactName}>
                        {admins[2].name}
                    </p>
                    <p className={styles.contactPhone}>
                        {admins[2].phone}
                    </p>
                </div>

            </div>
            <div className={styles.links}>
                <a className={styles.linkImg} href='https://www.instagram.com/lemaan_achai_vreai/?hl=en'>
                    <Image src='/Instagram.png' alt='ins' width={100} height={100} />
                </a>
                <a className={styles.linkImg} href='https://www.facebook.com/Lav.lmaan.achai.vreai'>
                    <Image src='/facebook.png' alt='FB' width={100} height={100} />
                </a>                
            </div>
        </div>
    )
}
