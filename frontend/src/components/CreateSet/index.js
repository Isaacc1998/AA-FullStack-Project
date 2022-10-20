import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as flashcardActions from "../../store/flashcard";
import * as setActions from "../../store/flashcardSet";
import { NavLink } from "react-router-dom";
import NewCard from "./newCard";
import { Redirect } from "react-router-dom";
import "./CreateSet.css";
let i = 2;
//add functionality to prevent not logged in user from creating set (should redirect to login modal)
function CreateSet() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => {
  //   return state.session.user;
  // });
  let sets = useSelector((state) => state.sets);
  const [title, setTitle] = useState();
  const [slots, setSlots] = useState([{ num: 1 }, { num: 2 }]);
  const [setId, setSetId] = useState();

  // useEffect(() => {}, [slots.length]);
  useEffect(() => {
    if (Object.keys(sets).length > 0) {
      sets = {};
    }
  }, []);

  useEffect(() => {
    let length = Object.keys(sets).length;
    if (length > 0) {
      console.log(Object.keys(sets)[length - 1]);
      setSetId(Object.keys(sets)[length - 1]);
    }
  }, [sets]);
  const handleAdd = (e) => {
    // console.log(i);
    e.preventDefault();
    i += 1;
    let temp = [...slots];
    temp.push({ num: i });
    setSlots(temp);
  };
  const handleCreate = (e) => {
    e.preventDefault();
    return dispatch(setActions.create({ title: title }));
    // let set_id = Object.keys(sets)[0].id;
    // console.log(sets);
    // setSetId(set_id);
  };

  console.log(slots);

  return (
    <div className="background3">
      <h2 className="createNew">Create a new study set</h2>
      <div className="createForm">
        <div className="addTitle">
          <span className="titleHead">Title</span>
          <input
            className="titleText"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <textarea
          className="description"
          name="description"
          placeholder="Add a description..."
        ></textarea>
      </div>
      <div className="addCards">
        {slots.map((card) => (
          <React.Fragment key={card.num}>
            <NewCard setId={setId} num={card.num}></NewCard>
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
