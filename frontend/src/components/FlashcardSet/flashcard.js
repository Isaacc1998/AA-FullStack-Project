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

  let image;
  if (flashcard.photoURL !== null) {
    image = (
      <div className="backImageContainer">
        <img
          className="backImage"
          id="backImage"
          src={flashcard.photoURL}
          alt=""
        />
      </div>
    );
  } else {
    image = "";
  }
  return (
    <div className="outer">
      <div className="card" id="card" onClick={handleClick}>
        <div className="front">
          <div className="label">Term</div>
          <div className="tracker">
            {flashcard.number + " / " + flashcard.length}
          </div>
          {flashcard && <div className="body-front">{flashcard.front}</div>}
        </div>
        <div className="back">
          <div className="label">Definition</div>
          <div className="tracker">
            {flashcard.number + " / " + flashcard.length}
          </div>
          {flashcard && (
            <div className="body">
              <div className="back-body">{flashcard.back}</div>
              {image}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
