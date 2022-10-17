import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as flashcardActions from "../../store/flashcard";
import * as setActions from "../../store/flashcardSet";
import Flashcard from "./flashcard";
import "./FlashcardSet.css";

function FlashcardSet({ set }) {
  const dispatch = useDispatch();
  const flashcards = useSelector((state) => {
    return state.flashcards;
  });
  console.log(flashcards);
  const [card, setCard] = useState();

  useEffect(() => {
    dispatch(flashcardActions.getFlashcards(set.id));
  }, []);
  return (
    <div className="background2">
      <Flashcard></Flashcard>
    </div>
  );
}

export default FlashcardSet;
