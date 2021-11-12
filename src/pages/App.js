import React, { useState } from "react";
import Lolly from "../components/Lolly";
import * as styles from "../style/main.module.css";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import shortid from "shortid";
import Dynamic from '../pages/dynamic';
import Link from 'gatsby';
import { navigate } from 'gatsby';


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
      color1
      color2
      color3
      resciever
      message
      sender
      lollyPath
    }
  }
`;

export default function App() {

  // const url = window.location.href;
  const { loading, error } = useQuery(LoolyAppData);
  const [createLolly, { data }] = useMutation(ADD_LOLLYDATA);
  // console.log('DATA=============>>>',data);

  // colors Input //
  const [color1, setcolor1] = useState("#d52358");
  const [color2, setcolor2] = useState("#e95946");
  const [color3, setcolor3] = useState("#deaa43");

  // Data Inputs field //
  const [toField, settoField] = useState("");
  const [messageField, setmessageField] = useState("");
  const [fromField, setfromField] = useState("");

  // Add btn Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((toField, messageField, fromField)) {
      const id = shortid.generate();
      const result = await createLolly({
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
      // LocalStorage
      // localStorage.setItem('snd', result.data.createLolly.sender);
      // localStorage.setItem('rcv', result.data.createLolly.resciever);
      // localStorage.setItem('c1', result.data.createLolly.color1);
      // localStorage.setItem('c2', result.data.createLolly.color2);
      // localStorage.setItem('c3', result.data.createLolly.color3);
      // localStorage.setItem('message', result.data.createLolly.message);
      // localStorage.setItem('path', result.data.createLolly.lollyPath);
      // Navigate To Dynamic Page
      // navigate(`/my-dynamic?id=${result.data.createLolly.lollyPath}`)
    } else {
      alert("The Inputs Values Are Empty Please Fill It First!");
    }
    settoField("");
    setmessageField("");
    setfromField("");
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
                <div class={styles.cp_wrapper}>
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setcolor1(e.target.value)}
                  />
                </div>
                <div class={styles.cp_wrapper}>
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setcolor2(e.target.value)}
                  />
                </div>
                <div class={styles.cp_wrapper}>
                  <input
                    type="color"
                    value={color3}
                    onChange={(e) => setcolor3(e.target.value)}
                  />
                </div>

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
            <>
              <Dynamic
                url={data.createLolly.lollyPath}
                res={data.createLolly.resciever}
                msg={data.createLolly.message}
                from={data.createLolly.sender}
              />
              {/* {
                navigate(`/my-dynamic?id=${data.createLolly.lollyPath}`)
              } */}
            </>
            // </Link>
            // <div className="result">
            //   <h4>Share lolly with this link:</h4>
            //   <h3>{`https://vriual-lolly-gatsby.netlify.app/lollies/${data.createLolly.lollyPath}`}</h3>
            //   <div className="res_detail">
            //     <p className="to">Hello :{data.createLolly.resciever}</p>
            //     <p className="message">Message :{data.createLolly.message}</p>
            //     <p className="from">From :{data.createLolly.sender}</p>
            //   </div>
            // </div>
          )}

        </div>
      </div>
    </div>
  );
}
