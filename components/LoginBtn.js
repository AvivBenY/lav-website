import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import styles from '../styles/SignOut.module.css'
import { useEffect, useState } from 'react'

export default function LoginBtn() {

    const [familiesArr, setFamiliesArr] = useState([])
    const [contactsArr, setContactsArr] = useState([])
    const [usersArr, setUsersArr] = useState([])
  
  
    useEffect(() => {
      fetch("/api/family")
        .then((res) => res.json())
        .then((families) => {
          setFamiliesArr(families)
          console.log("fam", families);
        });
    }, [])
  
    useEffect(() => {
      fetch('/api/contact').then((res) => res.json()).then((contacts) => {
        setContactsArr(contacts)
        console.log("contacts", contacts);
      });
    }, [])
  
    useEffect(() => {
      fetch('/api/user').then((res) => res.json()).then((users) => {
        setUsersArr(users)
        console.log("users", users);
      })
    }, [])

    const { data: session, status: loading } = useSession();
    console.log(session, loading);
    return (
        <div className={styles.mainDiv}>            
                <a className={styles.googleBtn} onClick={() => signIn('google',{ callbackUrl: process.env.NEXT_PUBLIC_SERVER_URL })}>
                    <Image src="/google-login.png" alt="google-signin" width={250} height={60}/></a>
                <a className={styles.googleBtn} onClick={() => signIn('facebook',{ callbackUrl: process.env.NEXT_PUBLIC_SERVER_URL})}>
                    <Image src="/facebook-login.png" alt="facebook-signin" width={250} height={60}/></a>
        </div>
    )
}

