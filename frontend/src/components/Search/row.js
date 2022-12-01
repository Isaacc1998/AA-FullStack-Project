import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as flashcardActions from "../../store/flashcard";
import Image from "./image";
import ProfileImage from "./profileImage";
import "./Search.css";

function Row({ row }) {
  const history = useHistory();
  //   const handleClick = (e) => {
  //     e.preventDefault();
  //     return history.push(`flashcardSet/${e.target.display.id}`);
  //   };

  return (
    <div className="searchRow">
      {row &&
        row.map((display) => {
          return (
            <div
              className="searchSetDisplay"
              onClick={(e) => {
                e.preventDefault();
                return history.push(`/flashcardSet/${display.id}`);
              }}
            >
              <div className="searchSetTitle">{display.title}</div>
              <div className="searchSetNumber">{display.length} terms</div>
              <div className="searchSetAuthor">
                <ProfileImage set={display} />
                {display.name}
              </div>
              <Image set={display} />
            </div>
          );
        })}
    </div>
  );
}

export default Row;
