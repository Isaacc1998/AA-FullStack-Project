import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaAngellist } from "react-icons/fa";
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

  const handleClick = (e) => {
    e.preventDefault();
    return dispatch(
      sessionActions.login({ credential: "Demo", password: "password" })
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

          <input
            className="email"
            type="text"
            value={email}
            placeholder="user@quizlet.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="text">Email</label>

          <input
            className="username"
            type="text"
            value={username}
            placeholder="quizletUser"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="text">Username</label>
          <input
            className="password2"
            type="password"
            value={password}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="text">Password</label>
          <button className="submit" type="submit">
            Sign Up
          </button>
          <input
            onClick={handleClick}
            className="submit"
            type="button"
            value="Log in as Demo User"
          />
        </div>
      </form>
      <div className="favicons">
        <a href="https://github.com/Isaacc1998">
          <BsGithub className="git-logo" size="2.5rem" color="pink"></BsGithub>
        </a>
        <a href="https://www.linkedin.com/in/isaac-choi-38636723b/">
          <BsLinkedin
            className="linked-logo"
            size="2.5rem"
            color="pink"
          ></BsLinkedin>
        </a>
        <FaAngellist
          className="angel-logo"
          size="2.5rem"
          color="pink"
        ></FaAngellist>
      </div>
    </>
  );
}

export default SignupForm;
