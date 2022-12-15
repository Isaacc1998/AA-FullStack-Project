import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as setActions from "../../store/flashcardSet";
import * as userActions from "../../store/user";
import * as flashcardActions from "../../store/flashcard";
import { Redirect } from "react-router-dom";
import SetDisplay from "./setDisplay";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  //
  const sets = useSelector((state) => {
    return state.sets;
  });
  const sessionUser = useSelector((state) => {
    return state.session.user;
  });

  // const [filled, setFilled] = useState(false);
  const [array, setArray] = useState([]);
  const [rows, setRows] = useState();

  useEffect(() => {
    let view = document.getElementById("b4");
    setTimeout(() => {
      view.style.display = "none";
    }, 1500);
  }, []);

  useEffect(() => {
    dispatch(setActions.getAllFlashcardSets());
    dispatch(userActions.getAllUsers());
  }, []);

  useEffect(() => {
    let maxLength = Object.keys(sets).length;

    if (Object.values(sets).length > 12) {
      let temp = [];
      let tracker = {};
      for (let i = 0; i < 12; i++) {
        let randomNum = Math.floor(Math.random() * maxLength);
        while (randomNum in tracker) {
          randomNum = Math.floor(Math.random() * maxLength);
        }
        tracker[randomNum] = randomNum;
        temp.push(Object.values(sets)[randomNum]);
      }
      setArray(temp);
    }
  }, [sets]);
  if (!sessionUser) return <Redirect to="/splash" />;

  let view1 = [];
  let view2 = [];
  let view3 = [];
  if (array.length === 12) {
    for (let k = 0; k < 4; k++) {
      let set = array[k];
      view1.push(
        <div key={`${set.id}`} className="setComponent">
          <SetDisplay key={`${set.id}`} set={set}></SetDisplay>
        </div>
      );
    }
    for (let k = 4; k < 8; k++) {
      let set = array[k];
      view2.push(
        <div key={`${set.id}`} className="setComponent">
          <SetDisplay key={`${set.id}`} set={set}></SetDisplay>
        </div>
      );
    }
    for (let k = 8; k < 12; k++) {
      let set = array[k];
      view3.push(
        <div key={`${set.id}`} className="setComponent">
          <SetDisplay key={`${set.id}`} set={set}></SetDisplay>
        </div>
      );
    }
  }

  return (
    <div className="background4">
      <div id="b4"></div>
      <h3 className="homeHeader">Study Sets</h3>
      <div className="flexContainer">
        <div className="rows">{view1}</div>
        <div className="rows">{view2}</div>
        <div className="rows">{view3}</div>

        {/* <div className="rows">
          {array &&
            array.slice(0, 4).map((set) => {
              return (
                <div key={`${set.id}`} className="setComponent">
                  <SetDisplay key={`${set.id}`} set={set}></SetDisplay>
                </div>
              );
            })}
        </div>
        <div className="rows">
          {array &&
            array.slice(4, 8).map((set) => {
              return (
                <div key={`${set.id}`} className="setComponent">
                  <SetDisplay key={`${set.id}`} set={set}></SetDisplay>
                </div>
              );
            })}
        </div>
        <div className="rows">
          {array &&
            array.slice(8, 12).map((set) => {
              return (
                <div key={`${set.id}`} className="setComponent">
                  <SetDisplay key={`${set.id}`} set={set}></SetDisplay>
                </div>
              );
            })}
        </div> */}
      </div>
    </div>
  );
}

export default Home;
