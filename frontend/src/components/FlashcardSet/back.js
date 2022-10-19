import React from "react";
import "./FlashcardSet.css";

function Back({ body }) {
  return (
    <div className="back">
      <div className="label"></div>
      <div className="tracker"></div>
      <div className="body">{body}</div>
    </div>
  );
}

export default Back;
