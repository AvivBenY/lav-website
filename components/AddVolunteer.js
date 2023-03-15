import { useState, useEffect } from "react";
import { useInfo } from "../Context/Context";
import styles from "../styles/AddressBook.module.css";
// import '../styles/AddressBook.module.css'
import { FormLabel, Button, TextField } from "@mui/material";

export default function AddVolunteer() {
  const [description, setDescription] = useState("");
  const [lavArea, setLavArea] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("e", e);
      const volunteer = {
        lavArea: e.target.lavArea.value,
        name: e.target.name.value,
        phone: e.target.phone.value,
        phone: e.target.description.value,
      };
      const res = await fetch("/api/volunteer", {
        method: "POST",
        body: JSON.stringify(volunteer),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();
      setDescription("");
      setLavArea("");
      setName("");
      setPhone("");
      setIsSent(!isSent);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.vForm}>
      <form className={styles.formContent} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.volContent}>
          <p>פרטי התקשרות:</p>
          <FormLabel className={styles.formItem} htmlFor="lavArea">
            איזור:
          </FormLabel>
          <TextField
            placeholder="דרום / מרכז / ירושלים / צפון"
            value={lavArea}
            onChange={(e) => setLavArea(e.target.value)}
            required
            id="lavArea"
            type="text"
            name="lavArea"
          />
          <FormLabel className={styles.formItem} htmlFor="name">
            שם:
          </FormLabel>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            id="name"
            type="text"
            name="name"
          />
          <FormLabel className={styles.formItem} htmlFor="phone">
            טלפון:
          </FormLabel>
          <TextField
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            id="phone"
            type="text"
            name="phone"
          />
          <FormLabel className={styles.formItem} htmlFor="desc">
            פרטים נוספים:
          </FormLabel>
          <TextField
            placeholder="רכב / מיקום / פרטים נוספים"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="desc"
            type="text"
            name="description"
          />
          <br />
          <Button variant="contained" color="primary" type="submit">
            שלח
          </Button>
          {isSent && (
            <div>
              <p>הטופס נשלח בהצלחה!</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
