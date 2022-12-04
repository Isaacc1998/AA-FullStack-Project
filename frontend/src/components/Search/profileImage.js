import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as flashcardActions from "../../store/flashcard";
import * as userActions from "../../store/user";
import "./Search.css";

function ProfileImage({ set }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.allUsers);
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    dispatch(userActions.getAllUsers());
  }, []);

  useEffect(() => {
    if (users) {
      setProfileImage(users[set.authorId].photoURL);
    }
  }, [users]);

  let image;
  if (profileImage) {
    image = <img className="previewProfileImage" src={profileImage} alt="" />;
  } else {
    image = "";
  }
  return <div>{image}</div>;
}

export default ProfileImage;
