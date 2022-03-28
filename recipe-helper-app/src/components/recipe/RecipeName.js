import React from "react";

const styles = "text-5xl p-4 w-full lg:w-fit";

const RecipeName = ({ name, handleUpdate = () => {}, toEdit = false }) => {
  let handleChange = (e) => {
    handleUpdate({ type: "SET_NAME", payload: { value: e.target.value } });
  };

  let nameElem;
  if (toEdit) {
    nameElem = name ? (
      <input
        type="text"
        className={styles}
        defaultValue={name}
        onChange={handleChange}
        maxLength="64"
      />
    ) : (
      <input
        type="text"
        className={styles}
        placeholder="Mustard Steak au Poivre"
        onChange={handleChange}
        maxLength="64"
      />
    );
  } else {
    nameElem = name;
  }

  return (
    <>
      {toEdit && <p className="m-2 text-xl">Name of the recipe</p>}
      <div className={styles}>{nameElem}</div>
    </>
  );
};

export default RecipeName;
