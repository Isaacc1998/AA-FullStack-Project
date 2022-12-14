import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as setActions from "../../store/flashcardSet";
import * as userActions from "../../store/user";
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
      for (let i = 0; i < 12; i++) {
        temp.push(Object.values(sets)[Math.floor(Math.random() * maxLength)]);
      }
      setArray(temp);
    }
  }, [sets]);
  if (!sessionUser) return <Redirect to="/splash" />;

  return (
    <div className="background4">
      <div id="b4"></div>
      <h3 className="homeHeader">Study Sets</h3>
      <div className="flexContainer">
        <div className="rows">
          {array &&
            array.slice(0, 4).map((set) => {
              return (
                <div className="setComponent">
                  <SetDisplay set={set}></SetDisplay>
                </div>
              );
            })}
        </div>
        <div className="rows">
          {array &&
            array.slice(4, 8).map((set) => {
              return (
                <div className="setComponent">
                  <SetDisplay set={set}></SetDisplay>
                </div>
              );
            })}
        </div>
        <div className="rows">
          {array &&
            array.slice(8, 12).map((set) => {
              return (
                <div className="setComponent">
                  <SetDisplay set={set}></SetDisplay>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
