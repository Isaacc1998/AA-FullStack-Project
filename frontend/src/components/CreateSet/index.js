import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as flashcardActions from "../../store/flashcard";
import "./CreateSet.css";

//add functionality to prevent not logged in user from creating set (should redirect to login modal)
function CreateSet() {
  const dispatch = useDispatch();

  return (
    <div className="background3">
      <h2 className="createNew">Create a new study set</h2>
      <div className="createForm">
        <div className="addTitle">
          <span className="titleHead">Title</span>
          <input className="titleText" type="text" />
        </div>
        <div className="description"></div>
      </div>
    </div>
  );
}

export default CreateSet;
