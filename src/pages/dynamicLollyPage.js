import React from "react";
import Lolly from "../components/Lolly";


export default function DynamicLollyPage({ pageContext }) {
  console.log(pageContext)
 
  return (
    <div>
      <h5 className="sharableLinkContainer">Your sharable link: </h5>
      <span className="sharableLink">
        {`${url}/${pageContext.lollyPath}`}
      </span>
      <div className="recievedContentContainer">
        <Lolly          
          top={pageContext.color1}
          middle={pageContext.color2}
          bottom={pageContext.color3}
        />

        <div className="recievedTextContainer">
          <h3>HI {pageContext.resciever}</h3>
          <p>{pageContext.message}</p>
          <h4>From: {pageContext.sender}</h4>
        </div>
      </div>
    </div>
  )
}

