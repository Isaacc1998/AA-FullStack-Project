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
      <form onSubmit={handleSubmit}>
        <div className="signup">
          <h2>Sign Up</h2>

          <input
            className="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="text">Email</label>
          <input
            className="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="text">Username</label>
          <input
            className="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="text">Password</label>
          <button className="submit" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default SignupForm;
