import React from 'react';
import * as styles from "../style/main.module.css";
import Lolly from '../components/Lolly';
import { navigate } from 'gatsby'
// import { useQuery, useMutation } from "@apollo/client";



// const GetData = gql`
//   {
//     getData{

//     }
//   }
// `;


export default function Dynamic({url , msg , res , from}) {
    console.log('DATA==========>>>>>>>',url , msg , res , from)
    // let sender = localStorage.getItem("snd");
    // let recive = localStorage.getItem("rcv");
    // let message = localStorage.getItem("message");
    // let path = localStorage.getItem("path");
    // let c1 = localStorage.getItem("c1");
    // let c2 = localStorage.getItem("c2");
    // let c3 = localStorage.getItem("c3");
    // 🚀
    return (
        <div>
            <div className="result">
              <h4>Share lolly with this link </h4>
              <h3>{`${url}`}</h3>
              <div className="res_detail">
                <p className="to">Hello : {res}</p>
                <p className="message">Message : {msg}</p>
                <p className="from">From : {from}</p>
              </div>
            </div>
            {/* <div className={styles.getDAta}>
                <Lolly top={c1} middle={c2} bottom={c3} />
                <div className={styles.desc}>
                    <h2 className={styles.share}>Share This Link With Friends <span className={styles.downArrow}>☟</span> </h2>
                    <h2>{`https://lolliesapp.netlify.app/${path}`}</h2>
                    <h2><span className={styles.hey}>Welcome : </span>{recive}</h2>
                    <h2>Message: {message}</h2>
                    <h2>From: {sender}</h2>
                    <h2 className={styles.anotherLolly} onClick={() => navigate('/')}>Create Another Lolly</h2>
                </div>
               
            </div> */}
        </div>
    )
}
