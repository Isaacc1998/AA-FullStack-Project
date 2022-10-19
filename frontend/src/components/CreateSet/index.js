import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as flashcardActions from "../../store/flashcard";
import * as setActions from "../../store/flashcardSet";
import { NavLink } from "react-router-dom";
import NewCard from "./newCard";
import "./CreateSet.css";
let i = 2;
//add functionality to prevent not logged in user from creating set (should redirect to login modal)
function CreateSet() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => {
    return state.session.user;
  });
  const [slots, setSlots] = useState([]);
  const [front, setFront] = useState();
  const [back, setBack] = useState();
  const [setId, setSetId] = useState();

  const handleAdd = (e) => {
    // console.log(i);
    e.preventDefault();
    i += 1;
    let temp = [...slots];
    temp.push({ setId: setId, num: i });
    setSlots(temp);
    console.log(slots);
  };
  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(setActions);
  };

  useEffect(() => {}, [slots.length]);
  console.log(slots);

  return (
    <div className="background3">
      <h2 className="createNew">Create a new study set</h2>
      <div className="createForm">
        <div className="addTitle">
          <span className="titleHead">Title</span>
          <input className="titleText" type="text" />
        </div>
        <textarea
          className="description"
          name="description"
          placeholder="Add a description..."
        ></textarea>
      </div>
      <div className="addCards">
        <NewCard setId={setId} num={1}></NewCard>
        <NewCard setId={setId} num={2}></NewCard>
        {slots.map((card) => (
          <React.Fragment key={card.num}>
            <NewCard num={card.num}></NewCard>
          </React.Fragment>
        ))}
      </div>
      <div className="addSlot" onClick={handleAdd}>
        <div className="num2">{i + 1}</div>
        <div className="add">ADD CARD</div>
      </div>
      <button type="button" onClick={handleCreate} id="submitSet">
        Create
      </button>
    </div>
  );
}

export default CreateSet;
