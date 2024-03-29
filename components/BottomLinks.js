import Link from "next/link";
import React from "react";
import styles from "../styles/Bottom.module.css";
import BottomContact from "./BottomContact";

export default function BottomLinks() {
  return (
    <>
      <div className={styles.bottomDiv}>
        <Link href="/contactUs">
          <div className={styles.bottomLink}>יצירת קשר</div>
        </Link>
        <Link href="/howToHelp">
          <div className={styles.bottomLink}>
            <p>
              רוצים להצטרף לעשייה? <br /> לחצו כאן
            </p>
          </div>
        </Link>
      </div>
      <BottomContact />
    </>
  );
}
