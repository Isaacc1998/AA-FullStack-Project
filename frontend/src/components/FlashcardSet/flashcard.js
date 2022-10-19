import React from "react";
import { useState } from "react";
import Front from "./front";
import Back from "./back";
import "./FlashcardSet.css";

function Flashcard({ flashcard }) {
  // const [side, setSide] = useState(true);
  // const handleClick = () => {
  //   setSide(!side);
  // };

  const handleClick = () => {
    let card = document.getElementById("card");
    card.classList.toggle("flip");
  };
  console.log(flashcard.number);
  return (
    <div className="outer">
      <div className="card" id="card" onClick={handleClick}>
        <div className="front">
          <div className="label">Term</div>
          <div className="tracker">
            {flashcard.number + " / " + flashcard.length}
          </div>
          {flashcard && <div className="body">{flashcard.front}</div>}
        </div>
        <div className="back">
          <div className="label">Definition</div>
          <div className="tracker">
            {flashcard.number + " / " + flashcard.length}
          </div>
          {flashcard && <div className="body">{flashcard.back}</div>}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
