import { useState, useEffect } from 'react'
import styles from '../styles/AddressBook.module.css'
import '../styles/AddressBook.module.css'
import AddressBookCmp from '../components/admin_cmp/AddressBookCmp'
import AddFamily from '../components/admin_cmp/AddFamily'
import VolunteersTbl from '../components/admin_cmp/VolunteersTbl'
import AddUser from '../components/admin_cmp/AddUser'

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
