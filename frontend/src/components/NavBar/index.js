import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import ProfileNav from "./profileNav";
import "./NavBar.css";
//edit

function NavBar() {
  const sessionUser = useSelector((state) => {
    return state.session.user;
  });
  let display;

  if (sessionUser) {
    display = <ProfileNav user={sessionUser} />;
  } else {
    display = (
      <>
        <NavLink id="login" className="nav" exact to="/login">
          Log in
        </NavLink>
        <NavLink id="signup" className="nav" exact to="/signup">
          Sign up
        </NavLink>
      </>
    );
  }

  const handleClick = (e) => {
    e.preventDefault();
    document.getElementById("createMenu").style.display = "block";
  };

  return (
    <div className="navbar">
      <div className="leftNav">
        <h2 id="logo">Flashlet</h2>
        <div className="home">
          <NavLink id="home" exact to="/">
            Home
          </NavLink>
        </div>
        <div className="dropdown">
          <button onClick={handleClick} className="create">
            Create
          </button>
          <div id="createMenu" className="menu-dropdown">
            <NavLink id="studyset" className="nav" exact to="/createSet">
              Study set
            </NavLink>
            <NavLink id="folder" className="nav" exact to="/createFolder">
              Folder
            </NavLink>
            <NavLink id="class" className="nav" exact to="/createClass">
              Class
            </NavLink>
          </div>
        </div>
      </div>
      <div className="rightNav">
        <input type="text" placeholder="Study sets, questions..." />
        <div className="auth">{display}</div>
      </div>
    </div>
  );
}

export default NavBar;
