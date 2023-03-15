import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Header.module.css";
import { useSession } from "next-auth/react";
import { useState } from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";

export default function MyLink() {
  const [subHeader, setSubHeader] = useState("");
  const { data: session, status: loading } = useSession();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.container}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Image src={"/menu.png"} alt="" width={50} height={50} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className={styles.menu}>
          <Link href="/">
            <Image
              className={styles.navBtn}
              src="/logo.png"
              alt="logo"
              width={50}
              height={50}
              onClick={() => {
                handleClose();
                setSubHeader("דף הבית");
              }}
            />
          </Link>
          <MenuItem>
            <Link href="/about">
              <a
                onClick={() => {
                  setSubHeader("אודות הארגון");
                  handleClose();
                }}
                className={styles.navBtn}
              >
                אודות
              </a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/howToHelp">
              <a
                onClick={() => {
                  setSubHeader("איך אפשר לעזור");
                  handleClose();
                }}
                className={styles.navBtn}
              >
                אני רוצה לעזור
              </a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/gallery">
              <a
                onClick={() => {
                  setSubHeader("גלריה");
                  handleClose();
                }}
                className={styles.navBtn}
              >
                גלריה
              </a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/contactUs">
              <a
                onClick={() => {
                  setSubHeader("צור קשר");
                  handleClose();
                }}
                className={styles.navBtn}
              >
                צור קשר
              </a>
            </Link>
          </MenuItem>
          {session && (
            <MenuItem>
              <Link href="/addressBook">
                <a
                  onClick={() => {
                    setSubHeader("פרטי משפחות");
                    handleClose();
                  }}
                  className={styles.navBtn}
                >
                  פרטי משפחות
                </a>
              </Link>
            </MenuItem>
          )}
          {!session ? (
            <MenuItem>
              <Link href="/login">
                <a
                  onClick={() => {
                    setSubHeader("כניסת משתמש");
                    handleClose();
                  }}
                  className={styles.navBtn}
                >
                  כניסת משתמש
                </a>
              </Link>
            </MenuItem>
          ) : (
            <MenuItem>
              <Link href="/logout">
                <a
                  onClick={() => {
                    setSubHeader("התנתקות");
                    handleClose();
                  }}
                  className={styles.navBtn}
                >
                  התנתקות
                </a>
              </Link>
            </MenuItem>
          )}
        </div>
      </Menu>
    </div>
  );

  // const [subHeader, setSubHeader] = useState("");
  // const { data: session, status: loading } = useSession();

  // return (
  //   <div className={styles.dropdown}>
  //     <div className={styles.dropbtn}>
  //       <Image src={"/menu.png"} alt="" width={50} height={50} />
  //     </div>
  //     <div className={styles.content}>
  //       <Link href="/">
  //         <a onClick={() => setSubHeader("דף הבית")} className={styles.navBtn}>
  //           <Image src="/logo.png" alt="" width={50} height={50} />
  //         </a>
  //       </Link>
  //       <Link href="/about">
  //         <a
  //           onClick={() => setSubHeader("אודות הארגון")}
  //           className={styles.navBtn}
  //         >
  //           אודות
  //         </a>
  //       </Link>

  //       <Link href="/howToHelp">
  //         <a
  //           onClick={() => setSubHeader("איך אפשר לעזור")}
  //           className={styles.navBtn}
  //         >
  //           אני רוצה לעזור
  //         </a>
  //       </Link>
  //       <Link href="/gallery">
  //         <a onClick={() => setSubHeader("גלריה")} className={styles.navBtn}>
  //           גלריה
  //         </a>
  //       </Link>
  //       <Link href="/contactUs">
  //         <a onClick={() => setSubHeader("צור קשר")} className={styles.navBtn}>
  //           צור קשר
  //         </a>
  //       </Link>
  //       {session && (
  //         <Link href="/addressBook">
  //           <a
  //             onClick={() => setSubHeader("פרטי משפחות")}
  //             className={styles.navBtn}
  //           >
  //             פרטי משפחות
  //           </a>
  //         </Link>
  //       )}
  //       {!session ? (
  //         <Link href="/login">
  //           <a
  //             onClick={() => setSubHeader("כניסת משתמש")}
  //             className={styles.navBtn}
  //           >
  //             כניסת משתמש
  //           </a>
  //         </Link>
  //       ) : (
  //         <Link href="/logout">
  //           <a
  //             onClick={() => setSubHeader("התנתקות")}
  //             className={styles.navBtn}
  //           >
  //             התנתקות
  //           </a>
  //         </Link>
  //       )}
  //     </div>
  //   </div>
  // );
}
