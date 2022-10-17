import React, { useState, useEffect } from "react";
import "./FlashcardSet.css";

function FlashcardSet() {
  return (
    <div className="background">
      <div className="card">
        <div className="front">
          <div className="label"></div>
          <div className="tracker"></div>
          <div className="body"></div>
        </div>
        <div className="back">
          <div className="label"></div>
          <div className="tracker"></div>
          <div className="body"></div>
        </div>
      </div>
    </div>
  );
}

export default FlashcardSet;
