import React, { useState } from "react";
import { Link } from "gatsby";
import Lolly from "../components/Lolly";
import * as styles from "../style/main.module.css";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import shortid from "shortid";


const LoolyAppData = gql`
  {
    hello
  }
`;

const ADD_LOLLYDATA = gql`
  mutation createLolly(
    $color1: String!
    $color2: String!
    $color3: String!
    $resciever: String!
    $message: String!
    $sender: String!
    $lollyPath: String!
  ) {
    createLolly(
      color1: $color1
      color2: $color2
      color3: $color3
      resciever: $resciever
      message: $message
      sender: $sender
      lollyPath: $lollyPath
    ) {
      resciever
      message
      sender
      lollyPath
    }
  }
`;

export default function App() {

  const url = window.location.href;

  const { loading, error } = useQuery(LoolyAppData);
  const [createLolly, { data }] = useMutation(ADD_LOLLYDATA);
  // console.log(data);

  // colors Input //
  const [color1, setcolor1] = useState("#d52358");
  const [color2, setcolor2] = useState("#e95946");
  const [color3, setcolor3] = useState("#deaa43");

  // Data Inputs field //
  const [toField, settoField] = useState("");
  const [messageField, setmessageField] = useState("");
  const [fromField, setfromField] = useState("");

  // Add btn Function
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((toField, messageField, fromField)) {
      const id = shortid.generate();
      createLolly({
        variables: {
          color1: color1,
          color2: color2,
          color3: color3,
          resciever: toField,
          message: messageField,
          sender: fromField,
          lollyPath: id,
        },
      });
    } else {
      alert("The Inputs Values Are Empty Please Fill It First!");
    }
    settoField("");
    setmessageField("");
    setfromField("");
    // navigate(`/show-lolly?${lollyPath.id}`)
  };

  // Loading
  if (loading) {
    return (
      <div className={styles.loader_Container}>
        <div className={styles.loader}></div>
      </div>
    );
  }
  // Eroor
  if (error) {
    return "There is some Error===>";
  }

  return (
    <div>
      <h2 className={styles.heading}>Lolly App</h2>
      <div className={styles.mainAppContainer}>
        <div className={styles.mainContainer}>
          <Lolly top={color1} middle={color2} bottom={color3} />
          {!data ? (
            <>
              <div className={styles.Colors_input}>
                <input
                  className={styles.colorSearch}
                  type="color"
                  value={color1}
                  onChange={(e) => setcolor1(e.target.value)}
                />
                <input
                  className={styles.colorSearch}
                  type="color"
                  value={color2}
                  onChange={(e) => setcolor2(e.target.value)}
                />
                <input
                  className={styles.colorSearch}
                  type="color"
                  value={color3}
                  onChange={(e) => setcolor3(e.target.value)}
                />
              </div>
              <div className={styles.allInputs}>
                To :
                <input
                  value={toField}
                  onChange={(e) => settoField(e.target.value)}
                  placeholder="To"
                  type="text"
                />
                Say something nice :
                <textarea
                  value={messageField}
                  onChange={(e) => setmessageField(e.target.value)}
                  placeholder="Enter Your Message!"
                  cols="30"
                  rows="10"
                ></textarea>
                From :
                <input
                  value={fromField}
                  onChange={(e) => setfromField(e.target.value)}
                  placeholder="From"
                  type="text"
                />
                <button onClick={handleSubmit} className={styles.sndBtn}>
                    Generate Lolly
                </button>
              </div>
            </>
          ) : (
            <div className={styles.result}>
              <h4>Share lolly with this link:</h4>
              <h3>{`${url}/${data.createLolly.lollyPath}`}</h3>
              <div className={styles.res_detail}>
                <p>Hello : {data.createLolly.resciever.toUpperCase()}</p>
                <p>Message : {data.createLolly.message}</p>
                <p>From : {data.createLolly.sender.toUpperCase()}</p>
              </div>
              <div className={styles.anotherLollyCont}>
                <Link className={styles.anotherLoly} to="/">
                  <p>Try Another Lolly</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
