import React, { useEffect } from "react";

const RecipeName = ({ name, handleUpdate = () => {}, toEdit = false }) => {
  let handleChange = (e) => {
    let dispatchObj = { type: "SET_NAME", payload: { event: e } };
    handleUpdate(dispatchObj);
  };

  let marker;

  let checkEmpty = (node) => {
    marker = node;
  };
  let nameElem;
  if (toEdit) {
    nameElem = name ? (
      <input
        ref={checkEmpty}
        type="text"
        className="recipe-name"
        defaultValue={name}
        onChange={handleChange}
        maxLength="64"
      />
    ) : (
      <input
        ref={checkEmpty}
        type="text"
        className="recipe-name"
        placeholder="Mustard Steak au Poivre"
        onChange={handleChange}
        maxLength="64"
      />
    );
  } else {
    nameElem = <div className="recipe-name">{name}</div>;
  }

  useEffect(() => {
    if (name === "") {
      let dispatchObj = { payload: { target: marker } };
      handleUpdate(dispatchObj);
    }
  }, [marker]);

  return (
    <>
      {toEdit && <p>Name of the recipe</p>}
      {nameElem}
    </>
  );
};

export default RecipeName;
