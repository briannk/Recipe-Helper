import React, { useState } from "react";
import "../../stylesheets/RecipeImg.css";

const RecipeImg = ({ path }) => {
  // stores the image being uploaded
  const [image, setImage] = useState(path);
  const [uploadedImage, setUploadedImage] = useState();

  let uploadImage = (e) => {
    setUploadedImage(e.target.files[0]);
  };

  let imgPath = uploadedImage
    ? URL.createObjectURL(uploadedImage)
    : path || "/assets/placeholder.png";

  return (
    <>
      <div
        className="overlay hide"
        onClick={(e) => e.target.classList.add("hide")}
      >
        <div className="full-image-wrapper">
          <img src={imgPath} alt="" className="full-image" />
        </div>
      </div>
      <div className="md:p-4 w-full md:w-2/5 flex flex-col items-center">
        <img
          src={imgPath}
          alt=""
          className="w-full object-cover"
          onClick={() => {
            let overlay = document.querySelector(".overlay");
            overlay.classList.remove("hide");
          }}
        />
        <label htmlFor="upload" className="edit-photo-button">
          [ Upload Photo ]
        </label>
        <input
          type="file"
          id="upload"
          accept="image/png, image/jpeg"
          onChange={uploadImage}
        />
      </div>
    </>
  );
};

export default RecipeImg;
