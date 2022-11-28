import img1 from "./images/bear.png";
import img2 from "./images/cat.png";
import img3 from "./images/cat.png";
import img4 from "./images/chicken.png";
import img5 from "./images/dog.png";
import img6 from "./images/giraffe.png";
import img7 from "./images/panda.png";
import img8 from "./images/rabbit.png";
import img9 from "./images/weasel.png";

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

const getProfileImage = () => {
  let arr = [img1, img2, img3, img4, img5, img6, img7, img8];
  let data = arr[Math.floor(Math.random() * arr.length)];
  let filename;
  switch (arr.indexOf(data)) {
    case 0:
      filename = "bear.png";
    case 1:
      filename = "cat.png";

    case 2:
      filename = "chicken.png";

    case 3:
      filename = "dog.png";

    case 4:
      filename = "giraffe.png";

    case 5:
      filename = "panda.png";

    case 6:
      filename = "rabbit.png";

    case 7:
      filename = "bear.png";
  }
  return convertURLtoFile(data, filename);
};

export default getProfileImage;
