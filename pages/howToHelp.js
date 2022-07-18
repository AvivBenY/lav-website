import React from 'react'
import styles from '../styles/EventInformation.module.css'
export default function howToHelp() {
    return (
        <div className={styles.mainDiv}>
        <div className={styles.header}>הצטרפו למשפחה!</div>
        <div className={styles.infoDiv}>
            <div className={styles.enEventInfo}>
                <lable>Visit Us</lable>
                <p>Jerusalem: <br /> Tuesday</p>
                    <p>Mahne Yehuda Market <br/> 20:00 - 23:00</p>
                    <p>Ramat-Gan: <br /> Thursday</p>
                    <p>Rambam Squar <br /> 20:00 - 23:00</p>
            </div>
            <div className={styles.hebEventInfo}>
                <lable>זמני חלוקות</lable>
                <p>ירושלים: <br /> יום שלישי</p>
                <p> שוק מחנה יהודה <br /> 20:00 - 23:00</p>
                <p>:מרכז <br/> יום חמישי</p>
                <p>כיכר רמבם/אורדע רמת גן <br /> 20:00 - 23:00</p>
            </div>
        </div>
        </div>
    )
}
