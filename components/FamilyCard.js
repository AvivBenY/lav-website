import React from 'react'
import styles from '../styles/FamilyCard.module.css'

export default function FamilyCard({ lavArea, lineNr, adress, isGettingFood, contact }) {
    return (
        <div className={styles.FamilyCardDiv}>
            <p>area - {lavArea}</p>
            <p>Line - {lineNr}</p>
            <p>Adress - {adress}</p>
            <p>Is Getting Food{isGettingFood}</p>
            <p> Contact:<br />
                Name - {contact?.name}</p>
            <p>Phone - {contact?.phone}</p>
        </div>
    )
}

