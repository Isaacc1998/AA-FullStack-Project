import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import profileImg from "./images/defaultprofile.png";
import getProfileImage from "./profilePics";
import { resetSets } from "../../store/flashcardSet";
import { resetCards } from "../../store/flashcard";
import { removeUsers } from "../../store/user";
import "./profile.css";

function ProfileNav({ user }) {
  const dispatch = useDispatch();
  // const [] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(resetCards());
    dispatch(resetSets());
    dispatch(removeUsers());
    dispatch(sessionActions.logout());
  };
  const handleClick = (e) => {
    e.preventDefault();
    document.getElementById("dropdownProfile").style.display = "block";
  };

  const image = getProfileImage();

  return (
    <div className="profileDropdown">
      <div onClick={handleClick} className="user">
        <img className="user" src={image} alt="profile" />
      </div>

      <div id="dropdownProfile" className="dropdownProfile">
        <div className="dropContainer">
          <div className="userInfo">
            <img className="pic2" src={image} alt="profile" />
            <div className="text">
              <div className="stuff1">{user.username}</div>
              <div className="stuff2">{user.email}</div>
            </div>
          </div>
          <div className="options">
            <NavLink
              id="profileNav"
              className="nav"
              exact
              to={`/users/${user.id}`}
            >
              Profile
            </NavLink>
            <NavLink id="settingsNav" className="nav" to="/settings">
              Settings
            </NavLink>
          </div>
          <div onClick={logout}>
            <NavLink to="/" id="logoutNav" className="nav">
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileNav;
