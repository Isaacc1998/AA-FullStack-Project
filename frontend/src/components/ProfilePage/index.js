import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
// import { NavLink, Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import * as setActions from "../../store/flashcardSet";
import { resetSets } from "../../store/flashcardSet";
import NavBar from "../NavBar";
import flashcardSetReducer from "../../store/flashcardSet";
import FlashcardSet from "../FlashcardSet";
import "./ProfilePage.css";

function ProfilePage() {
  let history = useHistory();
  const dispatch = useDispatch();
  const sets = useSelector((state) => state.sets);
  const sessionUser = useSelector((state) => {
    return state.session.user;
  });
  const [userSets, setUserSets] = useState([]);
  useEffect(() => {
    // dispatch(resetSets());
    // dispatch(setActions.getUserFlashcardSets());
    dispatch(setActions.getAllFlashcardSets());
  }, []);

  useEffect(() => {
    let matches = Object.values(sets).filter((set) => {
      return set.authorId === Object.values(sessionUser)[0].id;
    });
    console.log(matches, "dis dem matches");
    setUserSets(matches);
  }, [sets]);

  // if (set !== -1) {
  //   //how to call this in the App while passing in params?
  //   // return <FlashcardSet set={set}></FlashcardSet>;
  //   // return <Redirect to={`/flashcardSet/${set.id}`} />;
  //   history.push(`/flashcardSet/${set.id}`);
  // }

  const handleClick = (set) => {
    //in this case set is actually setId
    return history.push(`/flashcardSet/${set.id}`);
  };
  return (
    <div className="background">
      <div className="setsContainer">
        <div className="profileHeader">Study sets</div>

        {/* <div className="searchSets">
          <input
            className="search"
            type="text"
            placeholder="Search your sets"
          />
  </div> */}
        {userSets.map((set) => {
          return (
            <div
              key={set.id}
              className="set"
              onClick={(e) => {
                handleClick(set);
              }}
            >
              <div className="setDetails">
                {`${set.length} Terms | ${set.name}`}
              </div>
              <div key={set.authorId} className="setHeader">
                {set.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfilePage;
