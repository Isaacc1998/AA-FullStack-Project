import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupForm from "./components/SignupForm";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <h1 id="logo">Flashlet</h1>
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/createSet"></Route>
        <Route path="/createFolder"></Route>
        <Route path="/createClass"></Route>
        <Route path="/search"></Route>
        <Route path="/users/:userId"></Route>
      </Switch>
    </div>
  );
}

export default App;
