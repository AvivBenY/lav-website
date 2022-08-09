import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "../styles/Header.module.css";
import { useSession } from "next-auth/react";
import { useState } from "react";
export default function Header() {
  const { data: session, status: loading } = useSession();
  const [subHeader, setSubHeader] = useState("");

  useEffect(() => {
    setSubHeader("דף הבית");
  }, []);

  return (
    <div className={styles.mainDiv}>
      <nav className={styles.navBar}>
        {session && (
          <Link href="/addressBook">
            <a
              onClick={() => setSubHeader("פרטי משפחות")}
              className={styles.navBtn}
            >
              פרטי משפחות
            </a>
          </Link>
        )}
        {!session ? (
          <Link href="/login">
            <a
              onClick={() => setSubHeader("כניסת משתמש")}
              className={styles.navBtn}
            >
              כניסת משתמש
            </a>
          </Link>
        ) : (
          <Link href="/logout">
            <a
              onClick={() => setSubHeader("התנתקות")}
              className={styles.navBtn}
            >
              התנתקות
            </a>
          </Link>
        )}
        <Link href="/contactUs">
          <a onClick={() => setSubHeader("צור קשר")} className={styles.navBtn}>
            צור קשר
          </a>
        </Link>
        <Link href="/gallery">
          <a onClick={() => setSubHeader("גלריה")} className={styles.navBtn}>
            גלריה
          </a>
        </Link>
        <Link href="/howToHelp">
          <a
            onClick={() => setSubHeader("איך אפשר לעזור")}
            className={styles.navBtn}
          >
            אני רוצה לעזור
          </a>
        </Link>
        <Link href="/about">
          <a
            onClick={() => setSubHeader("אודות הארגון")}
            className={styles.navBtn}
          >
            אודות
          </a>
        </Link>
        <Link href="/">
          <a onClick={() => setSubHeader("דף הבית")} className={styles.navBtn}>
            <Image src="/logo.png" alt="" width={50} height={50} />
          </a>
        </Link>
      </nav>
      <div className={styles.subHeader}>
        <div className={styles.navIndex}>{subHeader}</div>
        <Image
          className={styles.navLogo}
          src="/logo.png"
          alt="logo"
          width={45}
          height={45}
        />
      </div>
    </div>
  );
}
