import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as flashcardActions from "../../store/flashcard";
import * as setActions from "../../store/flashcardSet";
import * as userActions from "../../store/user";
import Flashcard from "./flashcard";
import { resetCards } from "../../store/flashcard";
import "./FlashcardSet.css";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { BsCircle } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { CiCircleMore } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

let i = 0;
let filled = 0;

// function ForceUpdate() {
//   const [change, setChange] = useState(0);
//   return () => setChange(change + 1);
// }

function FlashcardSet() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setId } = useParams();
  const sets = useSelector((state) => state.sets);
  const set = sets[setId];
  const flashcards = useSelector((state) => state.flashcards);
  const sessionUser = useSelector((state) => {
    return state.session.user;
  });
  const users = useSelector((state) => state.users);
  const [card, setCard] = useState();
  const [done, setDone] = useState(false);
  const [username, setUsername] = useState();
  const array = Object.keys(flashcards).map((key) => {
    return flashcards[key];
  });

  useEffect(() => {
    dispatch(resetCards());
    i = 0;
  }, []);

  useEffect(() => {
    setCard(array[i]);
    let progress = document.getElementById("fill");
    filled = ((i + 1) / array.length) * 100;
    progress.style.width = `${filled}%`;
  }, [array]);

  useEffect(() => {
    // dispatch(setActions.getUserFlashcardSets());
    dispatch(setActions.getAllFlashcardSets());
    dispatch(flashcardActions.getFlashcards(setId));
  }, []);
  // console.log(sets);
  // console.log(set);
  useEffect(() => {
    console.log(set);
    setTimeout(() => {
      dispatch(userActions.getUser(set.authorId));
      setUsername(users[set.authorId].user.username);
    }, 10);
  }, []);

  useEffect(() => {
    if (done === true) {
      return history.push(`/users/${sessionUser.id}`);
    }
  }, [done]);

  useEffect(() => {
    if (username !== sessionUser.username && username) {
      console.log(username);
      console.log(sessionUser.username);
      document.getElementById("more").style.display = "none";
      document.getElementById("editCircle").style.display = "none";
    }
  }, [username]);

  const handleLeft = (e) => {
    if (i > 0) {
      setCard(array[i - 1]);
      i -= 1;

      let progress = document.getElementById("fill");
      filled = ((i + 1) / array.length) * 100;
      progress.style.width = `${filled}%`;

      let card = document.getElementById("card");
      card.classList.toggle("slideLeft");

      setTimeout(() => {
        card.classList.toggle("slideLeft");
      }, 310);
    }
  };

  const handleRight = (e) => {
    if (i < array.length - 1) {
      setCard(array[i + 1]);
      i += 1;

      let progress = document.getElementById("fill");
      filled = ((i + 1) / array.length) * 100;
      progress.style.width = `${filled}%`;

      let card = document.getElementById("card");
      card.classList.toggle("slideRight");

      setTimeout(() => {
        card.classList.toggle("slideRight");
      }, 310);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    return history.push(`/editSet/${setId}`);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setDone(true);
    return dispatch(setActions.remove(setId));
    // return history.push(`/users/${sessionUser.id}`);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    document.getElementById("delete").style.display = "block";
  };
  const numbers = { number: i + 1, length: array.length };
  return (
    <div className="outerBox">
      <div className="background2">
        {set && <div className="title">{set.title}</div>}
        <div className="progressBar">
          <div className="fill" id="fill"></div>
        </div>
        <Flashcard flashcard={{ ...card, ...numbers }}></Flashcard>
        <div className="directions">
          <div className="previous" onClick={handleLeft}>
            &lt;
          </div>
          <div className="next" onClick={handleRight}>
            &gt;
          </div>
        </div>
      </div>
      <div className="bottomStuff">
        <div className="ownerInfo">
          <div className="botLeft">
            <div className="by">Created by</div>
            <div className="creator">{set && set.name}</div>
          </div>
        </div>
        <div className="botRight">
          <div className="icons">
            <div className="addTo">
              <CiCirclePlus size="3rem" />
            </div>
            <div className="editCircle" id="editCircle" onClick={handleEdit}>
              <BsCircle size="2.5rem"></BsCircle>
              <div className="pencil">
                <HiOutlinePencil size="1.3rem" />
              </div>
            </div>
            <div onClick={handleDrop} className="more" id="more">
              <CiCircleMore className="more" size="3rem" />
            </div>
          </div>
          <div className="delete" id="delete">
            <div className="trash">
              <MdDeleteOutline size="1.5rem" color="white"></MdDeleteOutline>
            </div>
            <div className="deleteText" onClick={handleDelete}>
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashcardSet;
