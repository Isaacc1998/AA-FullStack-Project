import { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as userActions from "../../store/user";
import "./Settings.css";

function Settings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const file = useRef(null);
  const sessionUser = useSelector((state) => {
    return state.session.user;
  });
  const users = useSelector((state) => {
    return state.users.user;
  });
  // const user = useSelector((state) => {
  //   return Object.values(state.session.user)[0];
  // });

  // const user2 = useSelector((state) => {
  //   return Object.values(state.users.user)[0];
  // });
  const [images, setImages] = useState([]);

  let photo = "";
  if (sessionUser) {
    photo = Object.values(sessionUser)[0].photoURL;
  }

  let tempImages = [];
  if (users) {
    tempImages = Object.values(users)[0].images;
  }

  const [profilePic, setProfilePic] = useState(
    // Object.values(sessionUser)[0].photoURL
    photo
  );
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  // useEffect(() => {
  //   setImages(Object.values(sessionUser)[0].images);
  // }, [Object.values(sessionUser)[0].images]);

  useEffect(() => {
    dispatch(userActions.getUser(Object.values(sessionUser)[0].id));
  }, []);

  useEffect(() => {
    if (tempImages.length > 0) {
      setImages(Object.values(users)[0].images);
    }
  }, [tempImages]);

  useEffect(() => {
    if (photo) {
      setProfilePic(Object.values(sessionUser)[0].photoURL);
    }
    // console.log("changed PROFILEPIC");
  }, [photo]);

  useEffect(() => {
    let userId = Object.keys(sessionUser)[0];

    const formData = new FormData();

    setTimeout(() => {
      if (imageFile && imageURL) {
        // *is session not updating correctly?
        // console.log("hit imagefile");
        formData.append("user[photo]", imageFile);
        let array = Object.values(sessionUser)[0].images;
        // console.log(array, "array before");
        if (array.length === 13) {
          array.shift();
        }
        // console.log(imageURL, "this is URL");
        array.push(imageURL);
        // console.log(array, "array after");
        formData.append("user[pastimages][]", array);
        if (array.length > 0) {
          // console.log(array, "dispatched");
          dispatch(userActions.update({ formData: formData, id: userId }));
        }
        // history.push("/settings");
      }
    }, 500);
  }, [imageFile]);

  const handleChange = (e) => {
    const temp = e.currentTarget.files[0];
    if (temp) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(temp);
      fileReader.onload = () => {
        setImageURL(fileReader.result);
        setImageFile(temp);
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
  // console.log(images, " this is images");

  return (
    <div className="background10">
      <div className="profile-settings-container">
        <div className="settings-box-title">
          <img src={profilePic} className="user-image"></img>
          <div className="profilePicture-header">Profile Picture</div>
        </div>
        <div className="profile-selector-box">
          <h3 className="choose-header">Choose your profile picture</h3>
          <div className="image-gallery">
            {images &&
              images.map((image) => {
                // console.log(image, " this is an image");
                let preview = image ? (
                  <img src={image} alt="" className="past-image" />
                ) : null;
                return preview;
              })}
          </div>
          <div className="or-divider">
            <div className="or-text">or</div>
          </div>
          <form className="upload-own" onClick={handleClick}>
            <div className="upload-own-text">Upload your own photo</div>
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
