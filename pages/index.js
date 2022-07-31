import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import settings from "../setting/setting-development";

export default function Home() {

  const [familiesArr, setFamiliesArr] = useState([])
  const [contactsArr, setContactsArr] = useState([])
  const [usersArr, setUsersArr] = useState([])
  // const [isSigned, setIsSigned] = useState(false)

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

  return (
    <div className={styles.container}>
      <Head>
        <title>ל.א.ו</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div>
        <Image className={styles.mainImg} src='/newHomePic.png' alt="" width={1700} height={600} />
      </div>
      <div className={styles.aboutDiv}>
        <Link href='/about'><div className={styles.bottomLink}>
          <p>ל.א.ו הוא ארגון ללא מטרות רווח שהוקם<br />כדי ליצור אחדות בעם ישראל בעזרת נתינה לאחר
            <br /><br /> <span>לחצו כאן לסיפור המלא שלנו</span>
          </p>
        </div>
        </Link>
      </div >

    </div >
  )
}