import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as flashcardActions from "../../store/flashcard";
import Flashcard from "./flashcard";
import "./FlashcardSet.css";
let i = 0;
let filled = 0;
// function ForceUpdate() {
//   const [change, setChange] = useState(0);
//   return () => setChange(change + 1);
// }

function FlashcardSet({ set }) {
  const dispatch = useDispatch();
  const flashcards = useSelector((state) => state.flashcards);
  const [card, setCard] = useState();

  const array = Object.keys(flashcards).map((key) => {
    return flashcards[key];
  });
  // if (array.length === 0) {
  //   ForceUpdate();
  // }
  useEffect(() => {
    setCard(array[i]);
    let progress = document.getElementById("fill");
    filled = ((i + 1) / array.length) * 100;
    progress.style.width = `${filled}%`;
  }, [array]);

  useEffect(() => {
    dispatch(flashcardActions.getFlashcards(set.id));
  }, []);

  const handleLeft = (e) => {
    if (i > 0) {
      setCard(array[i - 1]);
      i -= 1;

      let progress = document.getElementById("fill");
      filled = ((i + 1) / array.length) * 100;
      progress.style.width = `${filled}%`;

      let card = document.getElementById("card");
      card.classList.toggle("slideLeft");

      setTimeout(() => {
        card.classList.toggle("slideLeft");
      }, 310);
    }
  };

  const handleRight = (e) => {
    if (i < array.length - 1) {
      setCard(array[i + 1]);
      i += 1;

      let progress = document.getElementById("fill");
      filled = ((i + 1) / array.length) * 100;
      progress.style.width = `${filled}%`;

      let card = document.getElementById("card");
      card.classList.toggle("slideRight");

      setTimeout(() => {
        card.classList.toggle("slideRight");
      }, 310);
    }
  };

  const numbers = { number: i + 1, length: array.length };
  return (
    <div className="background2">
      <div className="title">{set.title}</div>
      <div className="progressBar">
        <div className="fill" id="fill"></div>
      </div>
      <Flashcard flashcard={{ ...card, ...numbers }}></Flashcard>
      <div className="directions">
        <div className="previous" onClick={handleLeft}>
          &lt;
        </div>
        <div className="next" onClick={handleRight}>
          &gt;
        </div>
      </div>
    </div>
  );
}

export default FlashcardSet;
