import { useState, useEffect } from 'react'
import styles from '../styles/AddressBook.module.css'
import '../styles/AddressBook.module.css'
import AddressBookCmp from '../components/adminCmp/AddressBookCmp'
import AddFamily from '../components/adminCmp/AddFamily'
import VolunteersTbl from '../components/adminCmp/VolunteersTbl'
import AddUser from '../components/adminCmp/AddUser'

export default function AdressBook() {

  const [addUserBtn, setAddUserBtn] = useState(false)
  const [addFamBtn, setAddFamBtn] = useState(false)
  const a = 'הוסף משפחה';
  const b = 'x'
  const c = 'הוסף מנהל';

  return (
    <div className={styles.mainDiv}>
      {/* <button className={styles.addBtn} onClick={() => showForm()}>{addFamBtn ? b : a}</button> */}
      <button className={styles.addBtn} onClick={() => setAddFamBtn(!addFamBtn)}>{addFamBtn ? b : a}</button>
      <button className={styles.addBtn} onClick={() => setAddUserBtn(!addUserBtn)}>{addUserBtn ? b : c}</button>
      {addFamBtn && <AddFamily />}
      {addUserBtn && <AddUser />}
      <AddressBookCmp />
      <VolunteersTbl />
    </div>
  );
}

//FIX VOLUNTEERTBL PATCH & CHECK OTHER BUGS
