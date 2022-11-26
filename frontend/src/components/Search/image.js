import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as flashcardActions from "../../store/flashcard";
import "./Search.css";

function Image({ set }) {
  const dispatch = useDispatch();
  const flashcards = useSelector((state) => state.flashcards);
  const [image, setImage] = useState();

  useEffect(() => {
    dispatch(flashcardActions.getFlashcards(set.id));
  }, []);

  useEffect(() => {
    let matches = Object.values(flashcards).filter((card) => {
      return card.setId === set.id;
    });
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].photoURL !== null) {
        setImage(matches[i].photoURL);
        break;
      }
    }
  }, [flashcards]);

  return (
    <div>
      <img className="searchSetImage" src={image} alt="" />
    </div>
  );
}

export default Image;
