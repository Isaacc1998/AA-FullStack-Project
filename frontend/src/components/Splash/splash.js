import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Splash.css";

function Splash() {
  const history = useHistory();
  useEffect(() => {
    return history.push("/login");
  }, []);
  return (
    <>
      {/* <h1 className="welcome">Welcome to Flashlet</h1>
      <div className="splash-text">A study tool</div>
      <div className="splash-text">to create digital flashcards</div> */}
    </>
  );
}

export default Splash;
