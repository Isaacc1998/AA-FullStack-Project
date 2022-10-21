import img1 from "./images/bear.png";
import img2 from "./images/cat.png";
import img3 from "./images/cat.png";
import img4 from "./images/chicken.png";
import img5 from "./images/dog.png";
import img6 from "./images/giraffe.png";
import img7 from "./images/panda.png";
import img8 from "./images/rabbit.png";
import img9 from "./images/weasel.png";

const getProfileImage = () => {
  let arr = [img1, img2, img3, img4, img5, img6, img7, img8];
  return arr[Math.floor(Math.random() * arr.length)];
};

export default getProfileImage;
