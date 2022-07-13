import Image from 'next/image'
import React from 'react'
import styles from '../styles/About.module.css'

function people() {
    const text = 'asdasdasdasdasdadsasd'
    return (
    <div className={styles.aboutDiv}>        
            <div className={styles.contentDiv}>
                {text}
               </div>
            <div className={styles.imgDiv}><Image src='/aboutImg.png' alt='peson' width={700} height={500}/></div>
    </div>
    )
}

export default people