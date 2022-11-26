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
  const [set, setSet] = useState();
  useEffect(() => {
    dispatch(resetSets());
    dispatch(setActions.getUserFlashcardSets());
    dispatch(setActions.getAllFlashcardSets());
  }, []);

  // if (set !== -1) {
  //   //how to call this in the App while passing in params?
  //   // return <FlashcardSet set={set}></FlashcardSet>;
  //   // return <Redirect to={`/flashcardSet/${set.id}`} />;
  //   history.push(`/flashcardSet/${set.id}`);
  // }
  console.log(sets.userSets);

  const handleClick = (set) => {
    //in this case set is actually setId
    return history.push(`/flashcardSet/${set}`);
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
        {sets.userSets &&
          Object.keys(sets.userSets).map((set) => (
            <div
              key={sets.userSets[set].id}
              className="set"
              onClick={(e) => {
                setSet(sets[set]);
                console.log(set);
                handleClick(set);
              }}
            >
              <div className="setDetails">
                {`${sets.userSets[set].length} Terms | ${sets.userSets[set].name}`}
              </div>
              <div key={set.author_id} className="setHeader">
                {sets.userSets[set].title}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProfilePage;
