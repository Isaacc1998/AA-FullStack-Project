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
  let temp;
  if (sets[setId]) {
    temp = sets[setId].title;
  }
  const [title, setTitle] = useState(temp);

  const [slots, setSlots] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [value, setValue] = useState();
  const [done, setDone] = useState(false);
  //actual card number displayed on card
  const [cardNum, setCardNum] = useState();
  //acts as counter just for useEffect
  const [deleteCard, setDeleteCard] = useState(0);
  //setting the id of preCard to be deleted
  const [deletePreCard, setDeletePreCard] = useState();
  const [deleteList, setDeleteList] = useState([]);
  const [filled, setFilled] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    let temp = [...slots];
    temp.splice(cardNum - 1, 1);
    setSlots(temp);
    i = temp.length;
  }, [deleteCard]);

  useEffect(() => {
    dispatch(
      flashcardActions.removeState({
        flashcardId: deletePreCard,
        set_id: setId,
      })
    );
    let temp = [...deleteList];
    temp.push(deletePreCard);
    setDeleteList(temp);
  }, [deletePreCard]);

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

  // useEffect(() => {
  //   dispatch(setActions.getFlashcardSet(setId));
  // }, []);

  useEffect(() => {
    if (done === true) {
      for (let j = 0; j < deleteList.length; j++) {
        dispatch(
          flashcardActions.remove({ flashcardId: deleteList[j], set_id: setId })
        );
      }
      dispatch(setActions.update({ title, setId }));
      return history.push(`/flashcardSet/${setId}`);
    }
  }, [done]);

  useEffect(() => {
    let temp = { ...filled };
    for (let k = 0; k < Object.keys(cards).length; k++) {
      temp[k] = true;
    }
    setFilled(temp);
  }, [cards]);

  useEffect(() => {
    let temp = [];

    Object.keys(cards).forEach((card) => {
      i += 1;
      temp.push({ num: Math.random() * 100000 });
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
    temp.push({ num: Math.random() * 100000 });
    setSlots(temp);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let errorMessages = document.getElementsByClassName("createErrorMessage");
    for (let j = errorMessages.length - 1; j >= 0; j--) {
      errorMessages[j].remove();
    }
    let good = true;
    let temp = [...errors];
    let valid = !Object.values(filled).includes(false);
    let containsTrue = Object.values(filled).includes(true);

    console.log(filled, "filled on submit");
    console.log(slots, "slots");
    console.log(cards, "cards");

    if (title === "") {
      temp.push(
        <div className="createErrorMessage">
          * You cannot leave the title blank!
        </div>
      );
      setErrors(temp);
      good = false;
    }
    if (containsTrue === false) {
      temp.push(
        <div className="createErrorMessage">
          * You must fill at least one card!
        </div>
      );
      setErrors(temp);
    } else if (
      !valid ||
      Object.values(filled).length !== Object.keys(cards).length + slots.length
    ) {
      temp.push(
        <div className="createErrorMessage">
          * You cannot have blank terms or definitions on cards!
        </div>
      );
      setErrors(temp);
    } else if (good === false) {
    } else {
      setDone(true);
    }
  };

  //   if (submit === true) {
  //     setTimeout(() => {
  //       return history.push("home");
  //     });
  //   }
  return (
    <div className="background3">
      <div className="createNew">
        Edit study set
        <div className="createErrorList">{errors}</div>
      </div>
      <div className="createForm">
        <div className="addTitle">
          <span className="titleHead">Title</span>
          <input
            className="titleText"
            type="text"
            value={title}
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
              <React.Fragment key={cards[card].id}>
                <PreCard
                  id={cards[card].id}
                  setId={setId}
                  num={idx + 1}
                  preTerm={cards[card].front}
                  preDefinition={cards[card].back}
                  submit={done}
                  setSubmit={setDone}
                  setDeletePreCard={setDeletePreCard}
                  filled={filled}
                  setFilled={setFilled}
                  keyNum={Object.keys(filled)[idx]}
                ></PreCard>
              </React.Fragment>
            );
          })}
      </div>
      <div className="addCards">
        {slots.map((card, index) => (
          <React.Fragment key={card.num}>
            <NewCard
              setId={setId}
              num={index + 1 + Object.keys(cards).length}
              submit={done}
              cardNum={index + 1}
              setCardNum={setCardNum}
              deleteCard={deleteCard}
              setDeleteCard={setDeleteCard}
              filled={filled}
              setFilled={setFilled}
              keyNum={card.num}
            ></NewCard>
          </React.Fragment>
        ))}
      </div>
      <div className="addSlot" onClick={handleAdd}>
        <div className="num2">
          {slots.length + 1 + Object.keys(cards).length}
        </div>
        <div className="add">ADD CARD</div>
      </div>
      <div onClick={handleUpdate} id="submitSet">
        Done
      </div>
    </div>
  );
}

export default EditSet;
