import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const handleClick = (e) => {
    e.preventDefault();
    document.getElementById("createMenu").classList.toggle("display");
  };
  return (
    <div className="navbar">
      <NavLink id="home" exact to="/">
        Home
      </NavLink>
      <div className="dropdown">
        <button onClick={handleClick} className="create">
          Create
        </button>
        <div id="createMenu" className="menu-dropdown">
          <NavLink id="studyset" exact to="/createSet">
            Study set
          </NavLink>
          <NavLink id="folder" exact to="/createFolder">
            Folder
          </NavLink>
          <NavLink id="class" exact to="/createClass">
            Class
          </NavLink>
        </div>
      </div>
      <input type="text" placeholder="Study sets, questions..." />
    </div>
  );
}

export default NavBar;
