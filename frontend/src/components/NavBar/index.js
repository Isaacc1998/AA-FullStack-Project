import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import ProfileNav from "./profileNav";
import { HiChevronDown } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import * as setActions from "../../store/flashcardSet";
import "./NavBar.css";
//edit

function NavBar() {
  const ref = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => {
    return state.session.user;
  });
  const sets = useSelector((state) => {
    return state.sets;
  });
  const [search, setSearch] = useState();
  const [results, setResults] = useState();
  let display;
  if (sessionUser) {
    display = <ProfileNav user={sessionUser} />;
  } else {
    display = (
      <>
        <NavLink id="login" className="nav" exact to="/login">
          Log in
        </NavLink>
        <NavLink id="signup" className="nav" exact to="/signup">
          Sign up
        </NavLink>
      </>
    );
  }

  useEffect(() => {
    dispatch(setActions.getAllFlashcardSets);
  }, []);

  useEffect(() => {
    let matches = Object.values(sets)
      .filter((set) => {
        if ("title" in set) {
          let title = set.title.toLowerCase();
          return title.startsWith(search.toLowerCase());
        }
      })
      .sort((a, b) => {
        return a.title.length - b.title.length;
      })
      .slice(0, 6);
    if (search !== "") {
      setResults(matches);
    } else {
      document.getElementById("searchList").style.display = "none";
    }
  }, [search]);

  const handleClick = (e) => {
    e.preventDefault();
    document.getElementById("createMenu").style.display = "block";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    document.getElementById("searchList").style.display = "block";
  };

  window.onclick = (e) => {
    if (!e.target.matches(".search")) {
      let searchList = document.getElementById("searchList");
      searchList.style.display = "none";
    }
    if (
      !e.target.matches(".menu-dropdown") &&
      !e.target.matches(".create") &&
      !e.target.matches(".down") &&
      !e.target.matches(".invis")
    ) {
      let menu = document.getElementById("createMenu");
      menu.style.display = "none";
    }
    if (!e.target.matches(".dropdown") && !e.target.matches(".user")) {
      let dropdown = document.getElementById("dropdownProfile");
      dropdown.style.display = "none";
    }
  };

  // useEffect(() => {
  //   const handleMouse = (e) => {
  //     e.preventDefault();
  //     document.getElementById("searchList").style.display = "none";
  //   };

  //   const element = ref.current;

  // }, []);

  return (
    <div className="navbar">
      <div className="leftNav">
        <h2
          id="logo"
          onClick={() => {
            return history.push("/home");
          }}
        >
          Flashlet
        </h2>
        <div className="home">
          <NavLink id="home" to="/home">
            Home
          </NavLink>
        </div>
        <div className="dropdown">
          <div onClick={handleClick} className="create">
            Create
            <HiChevronDown className="down" size="1.5rem"></HiChevronDown>
            <div className="invis" onClick={handleClick}></div>
          </div>
          <div id="createMenu" className="menu-dropdown">
            <NavLink id="studyset" className="nav" exact to="/createSet">
              Study set
            </NavLink>
            {/* <NavLink id="folder" className="nav" exact to="/createFolder">
              Folder
            </NavLink>
            <NavLink id="class" className="nav" exact to="/createClass">
              Class
            </NavLink> */}
          </div>
        </div>
      </div>
      <div className="rightNav">
        {/* <div className="searchContainer"></div> */}
        <div className="glass">
          <HiMagnifyingGlass
            size="1.5rem"
            color="white"
            fontWeight="900"
          ></HiMagnifyingGlass>
        </div>
        <div className="searchContainer">
          <input
            className="search"
            id="search"
            type="text"
            placeholder="Study sets, questions..."
            value={search}
            onChange={handleSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                return history.push(`/search?q=${e.target.value}`);
              }
            }}
            ref={ref}
          />
          <div className="searchList" id="searchList">
            {results &&
              results.map((term) => {
                return (
                  <NavLink
                    className="searchTerm"
                    id="searchTerm"
                    onMouseEnter={() => {
                      document.getElementById("search").value = term.title;
                    }}
                    onMouseLeave={() => {
                      document.getElementById("search").value = search;
                    }}
                    // onClick={() => {}}
                    to={`/search?q=${term.title}`}
                  >
                    <HiMagnifyingGlass
                      size="1.5rem"
                      color="white"
                      fontWeight="900"
                    ></HiMagnifyingGlass>
                    <div className="searchText">{term.title}</div>
                  </NavLink>
                );
              })}
          </div>
        </div>
        <div className="auth">{display}</div>
      </div>
    </div>
  );
}

export default NavBar;
