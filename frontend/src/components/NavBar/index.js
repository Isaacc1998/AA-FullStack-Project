import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const sessionUser = useSelector((state) => {
    return state.session.user;
  });
  let page;
  window.onclick = (e) => {
    if (!e.target.matches(".menu-dropdown") && !e.target.matches(".create")) {
      let menu = document.getElementById("createMenu");
      menu.style.display = "none";
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    document.getElementById("createMenu").style.display = "block";
  };

  return (
    <div className="navbar">
      <div className="leftNav">
        <h2 id="logo">Flashlet</h2>
        <div>
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
        <div className="auth">
          <NavLink id="login" className="nav" exact to="/login">
            Log in
          </NavLink>
          <NavLink id="signup" className="nav" exact to="/signup">
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
