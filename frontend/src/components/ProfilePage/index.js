import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
// import { NavLink, Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import * as setActions from "../../store/flashcardSet";
import "./ProfilePage.css";

function ProfilePage() {
  const dispatch = useDispatch();
  const sets = useSelector((state) => state.sets);
  const [setId, setSetId] = useState(-1);

  useEffect(() => {
    dispatch(setActions.getUserFlashcardSets());
  }, []);

  if (setId !== -1) {
    console.log(setId);
    return <Redirect to={`/flashcardSet/${setId}`} />;
  }

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
              setSetId(set);
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
