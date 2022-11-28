import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/user";
import "./Settings.css";

function Settings() {
  const dispatch = useDispatch();
  const file = useRef(null);
  const sessionUser = useSelector((state) => {
    return state.session.user;
  });
  const users = useSelector((state) => {
    return state.users.user;
  });
  let photo;
  if (users) {
    photo = Object.values(users)[0].photoURL;
  }

  const [profilePic, setProfilePic] = useState(
    Object.values(sessionUser)[0].photoURL
  );
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (users) {
      setProfilePic(photo);
    }
  }, [photo]);

  useEffect(() => {
    let userId = Object.keys(sessionUser)[0];

    const formData = new FormData();

    if (imageFile) {
      console.log(imageFile, "this is imageFile");
      formData.append("user[photo]", imageFile);
      dispatch(userActions.update({ formData: formData, id: userId }));
    }
  }, [imageFile]);

  const handleChange = (e) => {
    const temp = e.currentTarget.files[0];
    if (temp) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(temp);
      fileReader.onload = () => {
        setImageFile(temp);
        setImageURL(fileReader.result);
      };
    }
  };

  const handleClick = () => {
    file.current.click();
  };

  // const handleSubmit = async (e) => {
  //   console.log("hiiit");
  //   e.preventDefault();

  // };

  return (
    <div className="background10">
      <div className="profile-settings-container">
        <div className="settings-box-title">
          <img src={profilePic} className="user-image"></img>
          <div className="profilePicture-header">Profile Picture</div>
        </div>
        <div className="profile-selector-box">
          <h3 className="choose-header">Choose your profile picture</h3>
          <div className="image-gallery"></div>
          <div className="or-divider">
            <div className="or-text">or</div>
          </div>
          <form className="upload-own">
            <div className="upload-own-text" onClick={handleClick}>
              Upload your own photo
            </div>
            <input
              type="file"
              className="settingsFileButton"
              ref={file}
              onChange={handleChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
