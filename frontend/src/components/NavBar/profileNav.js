import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./profile.css";
function ProfileNav({ user }) {
  const dispatch = useDispatch();
  // const [] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  const handleClick = (e) => {
    e.preventDefault();
    document.getElementById("dropdownProfile").style.display = "block";
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
      <div id="dropdownProfile" className="dropdownProfile">
        <div className="userInfo">
          <img src="../images/defaultprofile.png" alt="profile" />
          <div className="text">
            <div className="stuff">{user.username}</div>
            <div className="stuff">{user.email}</div>
          </div>
        </div>
        <div className="options">
          <NavLink id="profile" className="nav" exact to={`/users/${user.id}`}>
            Profile
          </NavLink>
          <NavLink id="settings" className="nav" to="/settings">
            Settings
          </NavLink>
          <NavLink onClick={logout} id="logout" className="nav" to="/">
            Logout
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default ProfileNav;
