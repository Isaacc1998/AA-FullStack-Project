import { useHistory } from "react-router-dom";
import "./Search.css";

function Row({ row }) {
  const history = useHistory();
  //   const handleClick = (e) => {
  //     e.preventDefault();
  //     return history.push(`flashcardSet/${e.target.display.id}`);
  //   };
  return (
    <div className="searchRow">
      {row.map((display) => {
        return (
          <div
            className="searchSetDisplay"
            onClick={() => {
              return history.push(`/flashcardSet/${display.id}`);
            }}
          >
            <div className="searchSetTitle">{display.title}</div>
            <div className="searchSetNumber">{display.length} terms</div>
            <div className="searchSetAuthor">{display.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Row;
