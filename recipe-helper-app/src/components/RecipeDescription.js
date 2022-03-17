import React, { useEffect, useRef } from "react";

const RecipeDescription = ({
  description,
  handleUpdate = () => {},
  toEdit = false,
}) => {
  let marker = useRef(null);

  let checkEmpty = (node) => {
    marker = node;
  };
  let handleChange = (e) => {
    let dispatchObj = { type: "SET_DESCRIPTION", payload: { node: marker } };
    handleUpdate(dispatchObj);
  };

  let descriptionElem;

  if (toEdit) {
    descriptionElem = description ? (
      <textarea
        ref={checkEmpty}
        className="recipe-description"
        value={description}
        onChange={handleChange}
        maxLength="512"
      />
    ) : (
      <textarea
        ref={checkEmpty}
        className="recipe-description"
        placeholder="Have you ever wondered whether or not to add mustard to your steak? This recipe serves as my thesis on why mustard should be banned from use in all cuisine."
        onChange={handleChange}
        maxLength="512"
      />
    );
  } else {
    descriptionElem = <p className="recipe-description">{description}</p>;
  }

  useEffect(() => {
    if (description === "") {
      let dummyObj = { target: marker };
      console.log("!!!dummyObj ", dummyObj);
      let dispatchObj = { payload: { event: dummyObj } };
      handleUpdate(dispatchObj);
    }
  }, [marker]);

  return (
    <>
      {toEdit && <p>Brief description of the recipe</p>}
      {descriptionElem}
    </>
  );
};

export default RecipeDescription;
