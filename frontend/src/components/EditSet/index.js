import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as flashcardActions from "../../store/flashcard";
import * as setActions from "../../store/flashcardSet";
import { NavLink, useHistory, useParams } from "react-router-dom";
import NewCard from "./newCard";
import PreCard from "./preCard";
import { Redirect } from "react-router-dom";
import "./Edit.css";
let i = 0;

function EditSet() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setId } = useParams();
  const sessionUser = useSelector((state) => {
    return state.session.user;
  });
  let sets = useSelector((state) => state.sets);
  let cards = useSelector((state) => state.flashcards);
  const [title, setTitle] = useState();
  const [slots, setSlots] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [value, setValue] = useState();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (i > 0) {
      i = 0;
    }
    if (Object.keys(sets).length > 0) {
      sets = {};
    }
  }, []);

  useEffect(() => {
    if (Object.keys(cards).length > 0) {
      cards = {};
    }
  }, []);

  useEffect(() => {
    dispatch(flashcardActions.getFlashcards(setId));
  }, []);

  useEffect(() => {
    if (done === true) {
      dispatch(setActions.update({ title, setId }));
      return history.push(`/flashcardSet/${setId}`);
    }
  }, [done]);

  useEffect(() => {
    let temp = [];

    Object.keys(cards).forEach((card) => {
      i += 1;
      temp.push({ num: i });
    });

    // setSlots(temp);
  }, [cards]);

  //   useEffect(() => {
  //     let length = Object.keys(sets).length;
  //     if (length > 0) {
  //       // console.log(Object.keys(sets)[length - 1]);
  //       setSetId(Object.keys(sets)[length - 1]);
  //     }
  //   }, [sets]);

  const handleAdd = (e) => {
    // console.log(i);
    e.preventDefault();
    i += 1;
    let temp = [...slots];
    temp.push({ num: i });
    setSlots(temp);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setSubmit(true);
    return dispatch(setActions.update({ title, setId }));
  };

  //   if (submit === true) {
  //     setTimeout(() => {
  //       return history.push("home");
  //     });
  //   }
  return (
    <div className="background3">
      <h2 className="createNew">Edit study set</h2>
      <div className="createForm">
        <div className="addTitle">
          <span className="titleHead">Title</span>
          <input
            className="titleText"
            type="text"
            value={value}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <textarea
          className="description"
          name="description"
          placeholder="Add a description..."
        ></textarea>
      </div>
      <div className="preCards">
        {cards &&
          Object.keys(cards).map((card, idx) => {
            return (
              <React.Fragment key={idx + 1}>
                <PreCard
                  id={cards[card].id}
                  setId={setId}
                  num={idx + 1}
                  preTerm={cards[card].front}
                  preDefinition={cards[card].back}
                  submit={done}
                  setSubmit={setDone}
                ></PreCard>
              </React.Fragment>
            );
          })}
      </div>
      <div className="addCards">
        {slots.map((card) => (
          <React.Fragment key={card.num}>
            <NewCard setId={setId} num={card.num} submit={done}></NewCard>
          </React.Fragment>
        ))}
      </div>
      <div className="addSlot" onClick={handleAdd}>
        <div className="num2">{i + 1}</div>
        <div className="add">ADD CARD</div>
      </div>
      <div
        onClick={(e) => {
          // e.preventDefault();
          // console.log("clicked");
          setDone(true);
        }}
        id="submitSet"
      >
        Done
      </div>
    </div>
  );
}

export default EditSet;
