import React from "react";
import "./CreateSet.css";

function NewCard({ num }) {
  // console.log(num);
  return (
    <div className="newCard">
      <div className="cardNum">{num}</div>
      <div className="cardInfo">
        <div className="cardRight">
          <input className="termInput" type="text" placeholder="Enter Term" />
          <div className="termBorder"></div>
          <div className="term">TERM</div>
        </div>
        <div className="cardLeft">
          <input
            className="defInput"
            type="text"
            placeholder="Enter Definition"
          />
          <div className="termBorder"></div>
          <div className="definition">DEFINITION</div>
        </div>
      </div>
    </div>
  );
}

export default NewCard;
