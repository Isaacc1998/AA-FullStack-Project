import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as setActions from "../../store/flashcardSet";
import * as userActions from "../../store/user";
import "./Home.css";

function SetDisplay({ set }) {
  //   console.log(set);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [username, setUsername] = useState();
  //   console.log(users);

  useEffect(() => {
    dispatch(userActions.getUser(set.authorId));
    if (Object.keys(users).includes(set.authorId)) {
      setUsername(users[set.authorId].username);
    }
  }, []);
  //   console.log(users);
  return (
    <div className="preview">
      <div className="previewTitle">{set.title}</div>
      <div className="previewNum">{set.length}</div>
      <div className="previewAuthor">{username}</div>
    </div>
  );
}

export default SetDisplay;
