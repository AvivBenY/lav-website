import { useState, useEffect } from 'react'
import { useInfo } from '../../Context/Context'
import styles from '../../styles/AddressBook.module.css'
import '../../styles/AddressBook.module.css'
import { FormLabel, Checkbox, FormControlLabel, Button, TextField } from '@mui/material';

export default function AddFamily() {
  const { familiesArr, setFamiliesArr } = useInfo()

const [lavArea, setLavArea] = useState('')
const [lineNr, setlineNr] = useState('')
const [description, setDescription] = useState('')
const [address, setAddress] = useState('')
const [name, setName] = useState('')
const [phone, setPhone] = useState('')
  




  useEffect(() => {
    fetch("/api/family")
      .then((res) => res.json())
      .then((families) => {
        setFamiliesArr(families)
      });
  }, [familiesArr])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      console.log('e', e);
      const contact = {
        name: e.target.name.value,
        phone: e.target.phone.value,
      }
      const res = await fetch("/api/contact", {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const contactData = await res.json();
      const fam = {
        lavArea: e.target.lavArea.value,
        lineNr: e.target.lineNr.value,
        description: e.target.description.value,
        address: e.target.address.value,
        isGettingFood: e.target.isGettingFood.checked,
        contact: contactData._id
      }

      console.log("json", JSON.stringify(fam))
      const response = await fetch("/api/family", {
        method: 'POST',
        body: JSON.stringify(fam),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const familyData = await response.json();
      setLavArea('');
      setlineNr('');
      setDescription('');
      setAddress('');
      setName('');
      setPhone('');
        } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className={styles.form}>
      <form className={styles.formContent} onSubmit={(e) => handleSubmit(e)} >
        <div className={styles.famContent}>
          <p>פרטי משפחה:</p>
          <FormLabel htmlFor="area">:איזור ל.א.ו בארץ</FormLabel>
          <TextField value={lavArea} onChange={(e)=>setLavArea(e.target.value)} required id="area" type="text" name='lavArea' />
          <FormLabel htmlFor="line">:מספר קו</FormLabel>
          <TextField value={lineNr} onChange={(e)=>setlineNr(e.target.value)} required id="line" type="text" name='lineNr' />
          <FormLabel htmlFor="adress">:כתובת</FormLabel>
          <TextField value={address} onChange={(e)=>setAddress(e.target.value)} required id="address" type="text" name='address' />
          <FormLabel htmlFor="desc">:תיאור כתובת</FormLabel>
          <TextField value={description} onChange={(e)=>setDescription(e.target.value)} id="desc" type="text" name='description' />
          <FormControlLabel control={<Checkbox defaultChecked name='isGettingFood' />} label="מקבלים ארגז מזון?:" />
        </div>
        <div className={styles.famContent}>
          <p>פרטי איש קשר:</p>
          <FormLabel htmlFor="name">:שם</FormLabel>
          <TextField value={name} onChange={(e)=>setName(e.target.value)} required id="name" type="text" name='name' />
          <FormLabel htmlFor="phone">:טלפון</FormLabel>
          <TextField value={phone} onChange={(e)=>setPhone(e.target.value)} required id="phone" type="text" name='phone' /><br />
          <Button variant="contained" color="primary" type="submit" >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
