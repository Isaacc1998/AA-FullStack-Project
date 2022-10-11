import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import "./loginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  if (currentUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential, password }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="login">
          <h2>Log In</h2>

          <input
            className="credential"
            type="text"
            value={credential}
            placeholder="Type your email address or username"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <label className="text">Email</label>
          <input
            className="password"
            type="password"
            value={password}
            placeholder="Type your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="text">Password</label>
          <button className="submit" type="submit">
            Log In
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginFormPage;
