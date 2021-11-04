import React from "react";
import Lolly from "../components/Lolly";
import * as styles from "../style/main.module.css";
import { navigate } from "gatsby";

export default function Homeindex() {
  return (
    <div>
      <h2 className={styles.heading}>Lolly App</h2>
      <div className={styles.firstPageLollies}>
        <Lolly top="#4287f5" middle="#e95946" bottom="#deaa43" />
        <Lolly top="#d52878" middle="#780e56" bottom="#f5a142" />
        <Lolly top="#f5a142" middle="#17006b" bottom="#780e56" />
      </div>
      <div className={styles.firstPageBtn}>
        <button onClick={() => navigate("/App")}>Create Lolly</button>
      </div>
    </div>
  );
}
