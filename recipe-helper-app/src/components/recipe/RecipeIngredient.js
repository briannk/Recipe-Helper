import React from "react";
import { CgCloseR } from "react-icons/cg";
import recipeReducer from "./recipeReducer";

const ingredientStyles = "p-2 flex gap-2 items-center";
const inputStyles = "p-2 w-full";

const RecipeIngredient = ({
  uuid,
  ingredientProp,
  handleChange,
  toEdit = false,
}) => {
  let ingredientElem;

  // wrapper to avoid having to use arrow function in onchange
  let handleChangeSet = (e) => {
    handleChange({
      type: "SET_INGREDIENT",
      payload: { value: e.target.value, uuid },
    });
  };

  let handleChangeRemove = (e) => {
    handleChange({
      type: "REMOVE_INGREDIENT",
      payload: { uuid },
    });
  };

  if (toEdit) {
    ingredientElem = ingredientProp ? (
      <input
        type="text"
        name="ingredient"
        className={inputStyles}
        value={ingredientProp}
        onChange={handleChangeSet}
      />
    ) : (
      <input
        type="text"
        name="ingredient"
        className={inputStyles}
        onChange={handleChangeSet}
        placeholder="8 oz steak"
        value={""}
      />
    );
  } else {
    ingredientElem = (
      <label htmlFor={uuid} className="cursor-pointer">
        {ingredientProp}
      </label>
    );
  }

  return (
    <li>
      <div className={ingredientStyles}>
        {
          // checkboxes are cosmetic
          !toEdit && (
            <input
              type="checkbox"
              id={uuid}
              onClick={(e) => {
                e.target.parentNode.classList.toggle("checked");
              }}
              className="cursor-pointer"
            />
          )
        }
        {ingredientElem}
        {toEdit && (
          <button type="button" onClick={handleChangeRemove}>
            <CgCloseR size={24} />
          </button>
        )}
      </div>
    </li>
  );
};

export default RecipeIngredient;
