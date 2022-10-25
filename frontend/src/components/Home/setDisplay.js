import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as setActions from "../../store/flashcardSet";
import * as userActions from "../../store/user";
import "./Home.css";

function SetDisplay({ set }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [username, setUsername] = useState();

  useEffect(() => {
    // if () {

    // }
    dispatch(userActions.getUser(set.authorId));
    setTimeout(() => {
      setUsername(users[set.authorId].user.username);
    }, 100);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    return history.push(`/flashcardSet/${set.id}`);
  };

  // console.log(username);

  return (
    <div className="preview" onClick={handleClick}>
      <div className="previewTitle">{set.title}</div>
      <div className="previewNum">{set.length} Terms</div>
      <div className="previewAuthor">{username}</div>
    </div>
  );
}

export default SetDisplay;
