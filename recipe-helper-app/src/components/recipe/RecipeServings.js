import React from "react";

const servingStyles = "text-2xl p-4";
const inputStyles = "w-full p-4 text-2xl";

const RecipeServings = ({
  servings,
  handleUpdate = () => {},
  toEdit = false,
}) => {
  let handleChange = (e) => {
    handleUpdate({
      type: "SET_SERVINGS",
      payload: { value: e.target.value },
    });
  };
  let servingsElem;

  if (toEdit) {
    servingsElem = servings ? (
      <input
        type="text"
        className={inputStyles}
        onChange={handleChange}
        defaultValue={servings}
      />
    ) : (
      <input
        type="text"
        className={inputStyles}
        onChange={handleChange}
        placeholder="2"
      />
    );
  } else {
    servingsElem = <div className={servingStyles}>{servings}</div>;
  }

  return (
    <section className="w-full">
      <div className="section-title">Servings</div>
      {servingsElem}
    </section>
  );
};

export default RecipeServings;
