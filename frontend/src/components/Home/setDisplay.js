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
  const allUsers = useSelector((state) => state.users.allUsers);
  const flashcards = useSelector((state) => state.flashcards);
  const [image, setImage] = useState();
  const [username, setUsername] = useState();
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    // if () {

    // }
    // dispatch(userActions.getUser(set.authorId));
    if (set) {
      dispatch(flashcardActions.getFlashcards(set.id));
      dispatch(userActions.getAllUsers());
    }
    setTimeout(() => {
      // setUsername(users[set.authorId].user.username);
    }, 100);
  }, [set]);

  useEffect(() => {
    if (allUsers) {
      let pic = allUsers[set.authorId].photoURL;
      setProfileImage(pic);
    }
  }, [allUsers]);

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

  let preview;
  // console.log(set, "this is set");
  // console.log(profileImage);
  // if (allUsers[set.authorId].photoURL) {
  if (profileImage) {
    preview = <img className="previewProfileImage" src={profileImage} alt="" />;
  } else {
    preview = "";
  }
  return (
    <div className="preview" onClick={handleClick}>
      <div className="previewTitle">{set.title}</div>
      <div className="previewNum">{set.length} Terms</div>
      <div className="previewAuthor">
        {preview}
        {set.name}
      </div>
      <img className="previewImage" src={image} alt="" />
    </div>
  );
}

export default SetDisplay;
