import React from "react";
import "./FlashcardSet.css";

function Front({ body }) {
  return (
    <div className="front">
      <div className="label"></div>
      <div className="tracker"></div>
      <div className="body">{body}</div>
    </div>
  );
}

export default Front;
