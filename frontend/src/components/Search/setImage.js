import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as flashcardActions from "../../store/flashcard";
import "./Search.css";

function SetImage({ set }) {
  const dispatch = useDispatch();
  const flashcards = useSelector((state) => state.flashcards);
  const [frontImage, setFrontImage] = useState();

  useEffect(() => {
    dispatch(flashcardActions.getFlashcards(set.id));
  }, []);

  useEffect(() => {
    let matches = Object.values(flashcards).filter((card) => {
      return card.setId === set.id;
    });
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].photoURL !== null) {
        setFrontImage(matches[i].photoURL);
        break;
      }
    }
  }, [flashcards]);

  let image;
  if (frontImage) {
    image = <img className="previewSetImage" src={frontImage} alt="" />;
  } else {
    image = "";
  }
  return <div>{image}</div>;
}

export default SetImage;
