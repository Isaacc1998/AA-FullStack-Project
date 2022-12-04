import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as flashcardActions from "../../store/flashcard";
import * as setActions from "../../store/flashcardSet";
import { NavLink, useHistory } from "react-router-dom";
import NewCard from "./newCard";
import { Redirect } from "react-router-dom";
import "./CreateSet.css";
let i = 2;
//add functionality to prevent not logged in user from creating set (should redirect to login modal)
function CreateSet() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => {
    return state.session.user;
  });
  let sets = useSelector((state) => state.sets);
  const [title, setTitle] = useState("");
  const [slots, setSlots] = useState([{ num: Math.random() * 100000 }]);
  const [setId, setSetId] = useState();
  const [cardNum, setCardNum] = useState();
  const [filled, setFilled] = useState({});
  const [errors, setErrors] = useState([]);
  const [deleteCard, setDeleteCard] = useState(0);
  // useEffect(() => {}, [slots.length]);
  useEffect(() => {
    if (cardNum) {
      let temp = [];
      for (let j = 0; j < slots.length; j++) {
        temp.push(slots[j]);
      }

      temp.splice(cardNum - 1, 1);

      // for (let j = 0; j < temp.length; j++) {
      //   temp[j].num = j + 1;
      // }
      setSlots(temp);
      // i = temp.length;
      console.log(temp, "dem slots 2");
    }
  }, [deleteCard]);

  useEffect(() => {
    if (slots.length > 1) {
      slots.length = 1;
    }
    if (Object.keys(sets).length > 0) {
      sets = {};
    }
  }, []);

  useEffect(() => {
    let length = Object.keys(sets).length;
    if (length > 0) {
      // console.log(Object.keys(sets)[length - 1]);
      setSetId(Object.keys(sets)[length - 1]);
    }
  }, [sets]);

  if (!sessionUser) return <Redirect to="/login" />;

  const handleAdd = (e) => {
    // console.log(i);
    e.preventDefault();
    // i += 1;
    let temp = [...slots];
    console.log(temp, "on add");
    // temp.push({ num: slots.length + 1 });
    temp.push({ num: Math.random() * 1000000 });

    setSlots(temp);
  };
  const handleCreate = (e) => {
    e.preventDefault();
    let errorMessages = document.getElementsByClassName("createErrorMessage");
    for (let j = errorMessages.length - 1; j >= 0; j--) {
      errorMessages[j].remove();
    }
    let good = true;
    let temp = [...errors];
    let valid = !Object.values(filled).includes(false);
    let containsTrue = Object.values(filled).includes(true);

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
    } else if (!valid || Object.values(filled).length !== slots.length) {
      temp.push(
        <div className="createErrorMessage">
          * You cannot have blank terms or definitions on cards!
        </div>
      );
      setErrors(temp);
    } else if (good === false) {
    } else {
      return dispatch(setActions.create({ title: title }));
    }

    // let set_id = Object.keys(sets)[0].id;
    // console.log(sets);
    // setSetId(set_id);
  };

  // console.log(slots);
  if (setId) {
    setTimeout(() => {
      return history.push("home");
    });
  }

  return (
    <div className="background3">
      <div className="createNew">
        Create a new study set
        <div className="createErrorList">{errors}</div>
      </div>
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
        {slots.map((card, index) => {
          return (
            <React.Fragment key={card.num}>
              <NewCard
                setId={setId}
                num={index + 1}
                slots={slots}
                setSlots={setSlots}
                setCardNum={setCardNum}
                deleteCard={deleteCard}
                setDeleteCard={setDeleteCard}
                filled={filled}
                setFilled={setFilled}
                keyNum={card.num}
              ></NewCard>
            </React.Fragment>
          );
        })}
      </div>
      <div className="addSlot" onClick={handleAdd}>
        <div className="num2">{slots.length + 1}</div>
        <div className="add">ADD CARD</div>
      </div>
      <button type="button" onClick={handleCreate} id="submitSet">
        Create
      </button>
    </div>
  );
}

export default CreateSet;
