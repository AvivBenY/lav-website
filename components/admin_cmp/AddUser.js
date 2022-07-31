import { useState, useEffect } from 'react'
import { useInfo } from '../../Context/Context'
import styles from '../../styles/AddressBook.module.css'
// import '../styles/AddressBook.module.css'
import { FormLabel, Button, TextField } from '@mui/material';

export default function AddUser() {
    const { usersArr, setUsersArr } = useInfo()
    const [isSent, setIsSent] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    //   useEffect(() => {
    //     fetch("/api/family")
    //       .then((res) => res.json())
    //       .then((families) => {
    //         setFamiliesArr(families)
    //       });
    //   }, [familiesArr])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            console.log('e', e);
            const user = {
                name: e.target.name.value,
                email: e.target.email.value,
            }
            const res = await fetch("/api/user", {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            await res.json();
            setName('');
            setEmail('');
            setIsSent(!isSent)
            alert('מנהל נוסף למערכת');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.vForm}>
            <form className={styles.formContent} onSubmit={(e) => handleSubmit(e)} >
                <div className={styles.volContent}>
                    <p>פרטי התקשרות מנהל:</p>
                    <FormLabel htmlFor="name">:שם</FormLabel>
                    <TextField value={name} onChange={(e) => setName(e.target.value)} required id="name" type="text" name='name' />
                    <FormLabel htmlFor="email">:מייל</FormLabel>
                    <TextField value={email} onChange={(e) => setEmail(e.target.value)} required id="email" type="email" name='email' /><br />
                    <br />
                    <Button variant="contained" color="primary" type="submit" >
                        שלח
                    </Button>
                    {isSent && <div><p>הרשם</p></div>}
                </div>
            </form>
        </div>
    )
}