import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as setActions from "../../store/flashcardSet";
import { Redirect } from "react-router-dom";
import SetDisplay from "./setDisplay";
import "./Home.css";
let array = [];
function Home() {
  const dispatch = useDispatch();
  const sets = useSelector((state) => {
    return state.sets;
  });
  const sessionUser = useSelector((state) => {
    return state.session.user;
  });
  // const [filled, setFilled] = useState(false);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    dispatch(setActions.getAllFlashcardSets());
  }, []);

  useEffect(() => {
    let maxLength = Object.keys(sets).length;
    // let length;
    // if (Object.keys(sets).length < 12) {
    //   length = Object.keys(sets).length;
    // } else {
    //   length = 12;
    // }
    if (Object.values(sets).length > 12) {
      for (let i = 0; i < 12; i++) {
        let temp = [];
        array.push(Object.values(sets)[Math.floor(Math.random() * maxLength)]);
        // setArr(temp);
        // console.log(Object.values(sets)[Math.floor(Math.random() * maxLength)]);
        // console.log(arr);
      }
    }
  }, [sets]);
  if (!sessionUser) return <Redirect to="/login" />;

  // console.log(sets);
  return (
    <div className="background4">
      <h3 className="homeHeader">Flashcard Sets</h3>
      <div className="rows">
        {array &&
          array.map((set) => (
            <React.Fragment key={set.id}>
              <SetDisplay set={set}></SetDisplay>
            </React.Fragment>
          ))}
      </div>
      {/* <div className="rows">
        {arr.slice(3, 5).map((set) => {
          return (
            <div className="setComponent">
              <SetDisplay set={set}></SetDisplay>;
            </div>
          );
        })}
      </div>
      <div className="rows">
        {arr.slice(6, 8).map((set) => {
          return (
            <div className="setComponent">
              <SetDisplay set={set}></SetDisplay>;
            </div>
          );
        })}
      </div>
      <div className="rows">
        {arr.slice(9, 11).map((set) => {
          return (
            <div className="setComponent">
              <SetDisplay set={set}></SetDisplay>;
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default Home;
