import { useState } from "react";
import AddVolunteer from "./AddVolunteer";
import styles from "../styles/HowToHelp.module.css";

export default function HowToHelp() {
  const [toggleForm, setToggleForm] = useState(false);
  return (
    <div className={styles.mainDiv}>
      <div className={styles.header}>הצטרפו למשפחה!</div>
      <div className={styles.infoDiv}>
        <div className={styles.enEventInfo}>
          <p>Visit Us</p>
          <p>
            Jerusalem: <br /> Tuesday
          </p>
          <p>
            Mahne Yehuda Market <br /> 20:00 - 23:00
          </p>
          <p>
            Ramat-Gan: <br /> Thursday
          </p>
          <p>
            Rambam Squar <br /> 20:00 - 23:00
          </p>
        </div>
        <div className={styles.hebEventInfo}>
          <p className={styles.try}>זמני חלוקות</p>
          <p>
            ירושלים: <br /> יום שלישי
          </p>
          <p>
            {" "}
            שוק מחנה יהודה <br /> 20:00 - 23:00
          </p>
          <p>
            :מרכז <br /> יום חמישי
          </p>
          <p>
            כיכר רמבם/אורדע רמת גן <br /> 20:00 - 23:00
          </p>
        </div>
      </div>
      <button
        className={styles.toggleBtn}
        onClick={() => setToggleForm(!toggleForm)}
      >
        צרו איתי קשר !
      </button>
      {toggleForm === true ? <AddVolunteer /> : null}
    </div>
  );
}
