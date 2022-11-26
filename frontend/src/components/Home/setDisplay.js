import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as setActions from "../../store/flashcardSet";
import * as userActions from "../../store/user";
import * as flashcardActions from "../../store/flashcard";
import "./Home.css";

function SetDisplay({ set }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const flashcards = useSelector((state) => state.flashcards);
  const [image, setImage] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    // if () {

    // }
    dispatch(userActions.getUser(set.authorId));
    dispatch(flashcardActions.getFlashcards(set.id));
    setTimeout(() => {
      setUsername(users[set.authorId].user.username);
    }, 100);
  }, []);

  useEffect(() => {
    let matches = Object.values(flashcards).filter((card) => {
      return card.setId === set.id;
    });
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].photoURL !== null) {
        setImage(matches[i].photoURL);
        break;
      }
    }
  }, [flashcards]);

  const handleClick = (e) => {
    e.preventDefault();
    return history.push(`/flashcardSet/${set.id}`);
  };

  // console.log(username);

  return (
    <div className="preview" onClick={handleClick}>
      <div className="previewTitle">{set.title}</div>
      <div className="previewNum">{set.length} Terms</div>
      <div className="previewAuthor">{set.name}</div>
      <img className="previewImage" src={image} alt="" />
    </div>
  );
}

export default SetDisplay;
