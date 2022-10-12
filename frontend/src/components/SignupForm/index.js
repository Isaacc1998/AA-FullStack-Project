import React, { useState, useEffect } from "react";
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
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (errors.length > 0) {
      document.getElementById("errors").style.display = "block";
    }
  }, [errors]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(sessionActions.signup({ email, username, password })).catch(
      async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };

  return (
    <>
      <form id="form" onSubmit={handleSubmit}>
        <div className="signup">
          <h2 className="title">Sign Up</h2>

          <div id="errors">
            {errors.map((error) => (
              <div key={error}> • {error}</div>
            ))}
          </div>
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
