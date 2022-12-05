import img1 from "../NavBar/images/bear.png";
import img2 from "../NavBar/images/cat.png";
import img3 from "../NavBar/images/cat.png";
import img4 from "../NavBar/images/chicken.png";
import img5 from "../NavBar/images/dog.png";
import img6 from "../NavBar/images/giraffe.png";
import img7 from "../NavBar/images/panda.png";
import img8 from "../NavBar/images/rabbit.png";
import img9 from "../NavBar/images/weasel.png";

function convertURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

const processImage = () => {
  return convertURLtoFile(data, filename);
};

export default processImage;
