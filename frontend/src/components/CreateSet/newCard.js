import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as flashcardActions from "../../store/flashcard";

import "./CreateSet.css";

function NewCard({ setId, num }) {
  const dispatch = useDispatch();
  const [term, setTerm] = useState();
  const [definition, setDefinition] = useState();
  console.log(setId);
  useEffect(() => {
    if (setId) {
      console.log("hit");

      dispatch(
        flashcardActions.create({
          front: term,
          back: definition,
          set_id: setId,
        })
      );
    }
  }, [setId]);
  return (
    <div className="newCard">
      <div className="cardNum">{num}</div>
      <div className="cardInfo">
        <div className="cardRight">
          <input
            className="termInput"
            type="text"
            placeholder="Enter Term"
            onChange={(e) => setTerm(e.target.value)}
          />
          <div className="termBorder"></div>
          <div className="term">TERM</div>
        </div>
        <div className="cardLeft">
          <input
            className="defInput"
            type="text"
            placeholder="Enter Definition"
            onChange={(e) => setDefinition(e.target.value)}
          />
          <div className="termBorder"></div>
          <div className="definition">DEFINITION</div>
        </div>
      </div>
    </div>
  );
}

export default NewCard;
