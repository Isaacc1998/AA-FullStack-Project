import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as flashcardActions from "../../store/flashcard";

import "./Edit.css";

function PreCard({ id, setId, num, preTerm, preDefinition, submit }) {
  const dispatch = useDispatch();
  const [term, setTerm] = useState();
  const [definition, setDefinition] = useState();

  useEffect(() => {
    setTerm(preTerm);
    setDefinition(preDefinition);
  }, []);

  useEffect(() => {
    if (submit === true) {
      dispatch(
        flashcardActions.update({
          id: id,
          front: term,
          back: definition,
          set_id: setId,
        })
      );
    }
  }, [submit]);
  return (
    <div className="newCard">
      <div className="cardNum">{num}</div>
      <div className="cardInfo">
        <div className="cardRight">
          <input
            className="termInput"
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <div className="termBorder"></div>
          <div className="term">TERM</div>
        </div>
        <div className="cardLeft">
          <input
            className="defInput"
            type="text"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          />
          <div className="termBorder"></div>
          <div className="definition">DEFINITION</div>
        </div>
      </div>
    </div>
  );
}

export default PreCard;
