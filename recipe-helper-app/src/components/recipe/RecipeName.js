import React, { useEffect } from "react";

const styles = "font-mono text-5xl p-4 mt-4";

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
        className={styles}
        defaultValue={name}
        onChange={handleChange}
        maxLength="64"
      />
    ) : (
      <input
        ref={checkEmpty}
        type="text"
        className={styles}
        placeholder="Mustard Steak au Poivre"
        onChange={handleChange}
        maxLength="64"
      />
    );
  } else {
    nameElem = <div className={styles}>{name}</div>;
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
