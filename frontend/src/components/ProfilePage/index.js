import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
// import { NavLink, Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import * as setActions from "../../store/flashcardSet";
import FlashcardSet from "../FlashcardSet";
import "./ProfilePage.css";

function ProfilePage() {
  let history = useHistory();
  const dispatch = useDispatch();
  const sets = useSelector((state) => state.sets);
  const [set, setSet] = useState(-1);

  useEffect(() => {
    dispatch(setActions.getUserFlashcardSets());
  }, []);

  // if (set !== -1) {
  //   //how to call this in the App while passing in params?
  //   // return <FlashcardSet set={set}></FlashcardSet>;
  //   // return <Redirect to={`/flashcardSet/${set.id}`} />;
  //   history.push(`/flashcardSet/${set.id}`);
  // }

  const handleClick = (set) => {
    //in this case set is actually setId
    return history.push(`/flashcardSet/${set}`);
  };

  return (
    <div className="background">
      <div className="setsContainer">
        {/* <div className="searchSets">
          <input
            className="search"
            type="text"
            placeholder="Search your sets"
          />
        </div> */}
        {Object.keys(sets).map((set) => (
          <div
            key={sets[set].id}
            className="set"
            onClick={(e) => {
              setSet(sets[set]);
              console.log(set);
              handleClick(set);
            }}
          >
            <div className="setDetails">
              {`${sets[set].length} Terms | ${sets[set].name}`}
            </div>
            <div key={set.author_id} className="setHeader">
              {sets[set].title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
