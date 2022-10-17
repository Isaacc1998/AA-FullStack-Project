import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProfilePage from "./components/ProfilePage";
import NavBar from "./components/NavBar";
import FlashcardSet from "./components/FlashcardSet";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  window.onclick = (e) => {
    if (!e.target.matches(".menu-dropdown") && !e.target.matches(".create")) {
      let menu = document.getElementById("createMenu");
      menu.style.display = "none";
    }
    if (!e.target.matches(".dropdown") && !e.target.matches(".user")) {
      let dropdown = document.getElementById("dropdownProfile");
      dropdown.style.display = "none";
    }
  };

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/"></Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/home"></Route>
        <Route path="/profilePage">
          <ProfilePage />
        </Route>
        <Route path="/createSet"></Route>
        <Route path="/createFolder"></Route>
        <Route path="/createClass"></Route>
        <Route path="/search"></Route>
        <Route path="/users/:userId">
          <ProfilePage />
        </Route>
        <Route path="/flashcardSet/:setId">
          <FlashcardSet />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
