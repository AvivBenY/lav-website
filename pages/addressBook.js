import { useState, useEffect } from 'react'
import styles from '../styles/AddressBook.module.css'
import '../styles/AddressBook.module.css'
import AddressBookCmp from '../components/admin cmp/AddressBookCmp'
import AddFamily from '../components/admin cmp/AddFamily'


export default function AdressBook() {
  const [addFamBtn, setAddFamBtn] = useState(false)
  const a = 'הוסף משפחה';
  const b = 'x'
  function showForm() {
    setAddFamBtn(!addFamBtn)
  }

  return (
    <div className={styles.mainDiv}>
      <button className={styles.addBtn} onClick={() => showForm()}>{addFamBtn ? b : a}</button>
      {addFamBtn && <AddFamily />}
      <AddressBookCmp />
    </div>
  );
}
