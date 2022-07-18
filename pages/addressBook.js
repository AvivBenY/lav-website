import { useState } from 'react'
import { useInfo } from '../Context/Context'
import styles from '../styles/AddressBook.module.css'
import '../styles/AddressBook.module.css'
import AddressBookCmp from '../components/admin cmp/AddressBookCmp'
import { FormControl, Input, FormLabel, Checkbox, FormControlLabel, Button, TextField } from '@mui/material';


export default function AdressBook() {
  const { familiesArr, setFamiliesArr } = useInfo()
  const [formValues, setFormValues] = useState('')


  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (e.target.name) {
        const contact = {
          name: e.target.name.value,
          phone: e.target.phone.value,
        }
        const response = await fetch("/api/contact", {
          method: 'POST',
          body: JSON.stringify(contact),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await response.json();
      }
      const fam = {
        lavArea: e.target.lavArea.value,
        lineNr: e.target.lineNr.value,
        description: e.target.description.value,
        address: e.target.address.value,
        isGettingFood: e.target.isGettingFood.checked,
      }

      console.log("fam", fam)
      console.log("json", JSON.stringify(fam))
      const response = await fetch("/api/family", {
        method: 'POST',
        body: JSON.stringify(fam),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className={styles.mainDiv}>
      <div className={styles.form}>
        {/* <form className={styles.formContent} onSubmit={(e)=> handleSubmit(e)} action="/api/form" method="post"> */}
        <form className={styles.formContent} onSubmit={(e) => handleSubmit(e)} >
          <p>פרטי משפחה:</p>
          <FormLabel htmlFor="area">:איזור ל.א.ו בארץ</FormLabel>
          <TextField required id="area" type="text" name='lavArea' />
          <FormLabel htmlFor="line">:מספר קו</FormLabel>
          <TextField required id="line" type="text" name='lineNr' />
          <FormLabel htmlFor="adress">:כתובת</FormLabel>
          <TextField required id="address" type="text" name='address' />
          <FormLabel htmlFor="desc">:תיאור כתובת</FormLabel>
          <TextField required id="desc" type="text" name='description' />
          <FormControlLabel control={<Checkbox defaultChecked name='isGettingFood' />} label="מקבלים ארגז מזון?:" />
          <p>פרטי איש קשר:</p>
          <FormLabel htmlFor="name">:שם</FormLabel>
          <TextField required id="name" type="text" name='name' />
          <FormLabel htmlFor="phone">:טלפון</FormLabel>
          <TextField required id="phone" type="text" name='phone' /><br />
          <Button variant="contained" color="primary" type="submit" >
            Submit
          </Button>
        </form>
      </div>
      <AddressBookCmp />
    </div>
  );
}

