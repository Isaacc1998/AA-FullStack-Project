import { useDispatch, useSelector } from "react-redux";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Row from "./row";
import "./Search.css";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as setActions from "../../store/flashcardSet";
// let count = 1;
function Search() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const sets = useSelector((state) => {
    return state.sets;
  });
  const [value, setValue] = useState();
  const [arr, setArr] = useState();
  const [count, setCount] = useState(1);

  useEffect(() => {
    dispatch(setActions.getAllFlashcardSets);
  }, []);

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let name = params.get("q");
    setValue(name);
    let matches = Object.values(sets)
      .filter((set) => {
        let title = set.title.toLowerCase();
        return title.startsWith(name.toLowerCase());
      })
      .sort((a, b) => {
        return a.title.length - b.title.length;
      });

    let rows = [];

    for (let i = 0; i < count; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        if (matches.length === 0) {
          break;
        }
        row.push(matches.shift());
      }
      //push in the component passing in row as prop for component
      rows.push(<Row key={i} row={row} />);
    }

    if (matches.length === 0) {
      document.getElementById("viewMore").style.display = "none";
    }
    setArr(rows);
  }, [location, count]);

  const handleClick = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };
  return (
    <div className="background8">
      <div className="bigSearchContainer">
        <div className="bigGlass">
          <HiMagnifyingGlass
            size="2rem"
            color="white"
            fontWeight="900"
          ></HiMagnifyingGlass>
        </div>
        <input
          className="bigSearch"
          value={value}
          placeholder="Search Study Sets..."
          onChange={(e) => {
            e.preventDefault();
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              return history.push(`/search?q=${e.target.value}`);
            }
          }}
        ></input>
      </div>

      <div className="categoryTab">All results</div>
      <h2 className="study-sets-header">Study Sets</h2>
      <div className="searchedSets">{arr}</div>
      <div className="viewMore" id="viewMore" onClick={handleClick}>
        View more
      </div>
    </div>
  );
}

export default Search;
