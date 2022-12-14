import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import Image1 from "./images/git-logo.png";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaAngellist } from "react-icons/fa";
import "./loginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (errors.length > 0) {
      document.getElementById("errors").style.display = "block";
    }
  }, [errors]);

  if (currentUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.login({ credential, password })).catch(
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

  const handleClick = (e) => {
    e.preventDefault();
    setCredential("Demo");
    setPassword("password");
    return dispatch(
      sessionActions.login({ credential: "Demo", password: "password" })
    );
  };

  return (
    <div className="login-container">
      <form id="form" onSubmit={handleSubmit}>
        <div className="login">
          <h2 className="title-login">Log In</h2>
          <div id="errors">
            {errors.map((error) => (
              <div className="error" key={error}>
                {" "}
                • {error}
              </div>
            ))}
          </div>
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
          <button id="submit-password" className="submit" type="submit">
            Log in
          </button>
          <input
            onClick={handleClick}
            className="submit"
            type="button"
            value="Log in as Demo User"
          />
        </div>
      </form>
      <div className="fav-container">
        <div className="favicons">
          <a href="https://github.com/Isaacc1998">
            <BsGithub
              className="git-logo"
              size="2.5rem"
              color="pink"
            ></BsGithub>
          </a>
          <a href="https://www.linkedin.com/in/isaac-choi-38636723b/">
            <BsLinkedin
              className="linked-logo"
              size="2.5rem"
              color="pink"
            ></BsLinkedin>
          </a>
          <a href="https://angel.co/u/isaac-s-choi">
            <FaAngellist
              className="angel-logo"
              size="2.5rem"
              color="pink"
            ></FaAngellist>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
