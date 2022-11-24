import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as flashcardActions from "../../store/flashcard";
import { BiImageAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

import "./CreateSet.css";

function NewCard({
  setId,
  num,
  submit,
  slots,
  setSlots,
  setCardNum,
  deleteCard,
  setDeleteCard,
}) {
  const dispatch = useDispatch();
  const file = useRef(null);
  const [term, setTerm] = useState();
  const [definition, setDefinition] = useState();
  const [hover, setHover] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  // console.log(setId);

  useEffect(() => {
    if (setId) {
      // dispatch(
      //   flashcardActions.create({
      //     front: term,
      //     back: definition,
      //     set_id: setId,
      //   })
      // );
      const formData = new FormData();
      formData.append("flashcard[front]", term);
      formData.append("flashcard[back]", definition);
      formData.append("flashcard[set_id]", setId);

      if (imageFile) {
        formData.append("flashcard[photo]", imageFile);
      }
      dispatch(flashcardActions.create({ formData: formData, set_id: setId }));
    }
  }, [setId]);

  useEffect(() => {
    if (submit === true) {
      flashcardActions.create({
        front: term,
        back: definition,
        set_id: setId,
      });
    }
  }, [submit]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setImageFile(file);
        setImageURL(fileReader.result);
      };
      let icons = document.getElementsByClassName("imageIcon");
      let labels = document.getElementsByClassName("imageLabel");
      icons[num - 1].style.display = "none";
      labels[num - 1].style.display = "none";

      let images = document.getElementsByClassName("imagePreview");
      images[num - 1].style.display = "block";
    }
  };

  const handleClick = () => {
    file.current.click();
  };

  const handleDeleteImage = () => {
    setImageFile(null);
    setImageURL(null);
    let icons = document.getElementsByClassName("imageIcon");
    let labels = document.getElementsByClassName("imageLabel");
    icons[num - 1].style.display = "block";
    labels[num - 1].style.display = "block";
    let images = document.getElementsByClassName("imagePreview");
    images[num - 1].style.display = "none";
  };

  const preview = imageURL ? (
    <img src={imageURL} alt="" className="cardImage" />
  ) : null;
  return (
    <div className="newCard">
      <div className="cardNum">
        {num}
        <MdDeleteOutline
          size="1.5rem"
          color={hover3 ? "orange" : "white"}
          className="trashImage2"
          onClick={() => {
            // let temp = [...slots];
            // temp.splice(num - 1, 1);
            // setSlots(temp);
            setCardNum(num);
            setDeleteCard(deleteCard + 1);
          }}
          onMouseOver={() => setHover3(true)}
          onMouseOut={() => setHover3(false)}
        ></MdDeleteOutline>
      </div>
      <div className="cardInfo">
        <div className="cardRight">
          <input
            className="termInput"
            type="text"
            placeholder="Enter Term"
            onChange={(e) => setTerm(e.target.value)}
          />
          <div className="termBorder"></div>
          <div className="term">TERM</div>
        </div>
        <div className="cardLeft">
          <input
            className="defInput"
            type="text"
            placeholder="Enter Definition"
            onChange={(e) => setDefinition(e.target.value)}
          />
          <div className="termBorder"></div>
          <div className="definition">DEFINITION</div>
        </div>
        <div
          className="addImage"
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          <form className="imageIcon" id="imageIcon" onSubmit={handleSubmit}>
            <BiImageAlt
              size="1.7rem"
              color={hover ? "yellow" : "white"}
              id="imageIcon"
              onClick={handleClick}
            ></BiImageAlt>
            <input
              className="fileButton"
              ref={file}
              onChange={handleChange}
              type="file"
              id={num}
            />
          </form>
          <div className="imageLabel" id="imageLabel">
            IMAGE
          </div>
          <div className="imagePreview" id="imagePreview">
            {preview}
            <div
              className="trashC"
              onMouseOver={() => setHover2(true)}
              onMouseOut={() => setHover2(false)}
              onClick={handleDeleteImage}
            >
              <MdDeleteOutline
                size="1.25rem"
                color={hover2 ? "black" : "white"}
                className="trashImage"
              ></MdDeleteOutline>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCard;
