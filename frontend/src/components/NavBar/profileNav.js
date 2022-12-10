import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import profileImg from "./images/defaultprofile.png";
import getProfileImage from "./profilePics";
import * as userActions from "../../store/user";
import { resetSets } from "../../store/flashcardSet";
import { resetCards } from "../../store/flashcard";
import { removeUsers } from "../../store/user";
import "./profile.css";

function ProfileNav({ user }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users.user);
  let photo;
  if (users) {
    photo = Object.values(users)[0].photoURL;
  }
  const [userImage, setUserImage] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const image = getProfileImage();
    // let userId = user.id;
    let userId = Object.keys(sessionUser)[0];
    let user = Object.values(sessionUser)[0];
    if (user.photoURL === null) {
      const formData = new FormData();
      formData.append("user[email]", user.email);
      formData.append("user[username]", user.username);
      // console.log(image, "this is imageFile");
      formData.append("user[photo]", image);
      dispatch(userActions.update({ formData: formData, id: userId }));
    }
    dispatch(userActions.getUser(userId));
  }, [sessionUser]);

  useEffect(() => {
    if (users) {
      setUserImage(Object.values(users)[0].photoURL);
      setCurrentUser(Object.values(users)[0]);
    }
  }, [photo]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(resetSets());
    dispatch(resetCards());
    dispatch(removeUsers());
    dispatch(sessionActions.logout());
  };
  const handleClick = (e) => {
    e.preventDefault();
    document.getElementById("dropdownProfile").style.display = "block";
  };

  return (
    <div className="profileDropdown">
      <div onClick={handleClick} className="user">
        <img className="user" src={userImage} alt="" />
      </div>

      <div id="dropdownProfile" className="dropdownProfile">
        <div className="dropContainer">
          <div className="userInfo">
            <img className="pic2" src={userImage} alt="" />
            <div className="text">
              <div className="stuff1">
                {currentUser && currentUser.username}
              </div>
              <div className="stuff2">{currentUser && currentUser.email}</div>
            </div>
          </div>
          <div className="options">
            <NavLink
              id="profileNav"
              className="nav"
              exact
              to={`/users/${Object.keys(sessionUser)[0]}`}
            >
              Profile
            </NavLink>
            <NavLink id="settingsNav" className="nav" to="/settings">
              Settings
            </NavLink>
          </div>
          <div onClick={logout}>
            <NavLink to="/splash" id="logoutNav" className="nav">
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileNav;
