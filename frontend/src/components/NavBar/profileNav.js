import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./profile.css";
function ProfileNav({ user }) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    document.getElementById("dropdown").style.display = "block";
  };

  return (
    <>
      <div onClick={handleClick} className="user">
        <img
          className="user"
          src="../images/defaultprofile.png"
          alt="profile"
        />
      </div>
      <div id="dropdown" className="dropdown">
        <div className="userInfo">
          <img src="../images/defaultprofile.png" alt="profile" />
          <div>{user.username}</div>
          <div>{user.email}</div>
        </div>
        <div className="options">
          <NavLink id="profile" className="nav" exact to="/users/:userId">
            Profile
          </NavLink>
          <NavLink id="settings" className="nav" to="/settings">
            Settings
          </NavLink>
          <NavLink id="logout" className="nav" to="/">
            Logout
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default ProfileNav;
