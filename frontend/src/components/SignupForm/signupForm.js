import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./signupForm.css";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(sessionActions.signup({ email, username, password }));
  };

  return (
    <>
      <form id="form" onSubmit={handleSubmit}>
        <div className="signup">
          <h2 className="title">Sign Up</h2>
          <label className="text">Email</label>
          <input
            className="email"
            type="text"
            value={email}
            placeholder="user@quizlet.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="text">Username</label>
          <input
            className="username"
            type="text"
            value={username}
            placeholder="quizletUser"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="text">Password</label>
          <input
            className="password2"
            type="password"
            value={password}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="submit" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default SignupForm;
