import React from "react";

const descStyles = "my-2 p-4 bg-orange-100 text-lg";
const taStyles = "p-2 h-32";

const RecipeDescription = ({
  description,
  handleUpdate = () => {},
  toEdit = false,
}) => {
  let handleChange = (e) => {
    handleUpdate({
      type: "SET_DESCRIPTION",
      payload: { value: e.target.value },
    });
  };

  let descriptionElem;

  if (toEdit) {
    descriptionElem = description ? (
      <textarea
        className={taStyles}
        value={description}
        onChange={handleChange}
        maxLength="512"
      />
    ) : (
      <textarea
        className={taStyles}
        placeholder="Have you ever wondered whether or not to add mustard to your steak? This recipe serves as my thesis on why mustard should be banned from use in all cuisine."
        onChange={handleChange}
        maxLength="512"
      />
    );
  } else {
    descriptionElem = <p className={descStyles}>{description}</p>;
  }

  return (
    <>
      {toEdit && <p className="m-2 text-xl">Brief description of the recipe</p>}
      {descriptionElem}
    </>
  );
};

export default RecipeDescription;
