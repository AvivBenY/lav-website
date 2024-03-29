import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";

export default function BottomContact() {
  const contact = `!יחד ולמעלה`;
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Image
          src="/logo.png"
          alt="ל.א.ו לוגו"
          width={60}
          height={70}
          className={styles.BottomLogo}
        />
        <p>{contact}</p>
      </div>
    </footer>
  );
}
