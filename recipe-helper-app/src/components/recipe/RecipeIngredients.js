import React, { useEffect } from "react";
import RecipeIngredient from "./RecipeIngredient";
import "../../stylesheets/Recipe.css";

const RecipeIngredients = ({
  ingredientsList,
  handleUpdate = () => {},
  toEdit,
}) => {
  let addIngredient = () => {
    let dispatchObj = {
      type: "SET_INGREDIENT",
      payload: {},
    };
    handleUpdate(dispatchObj);
  };

  let list;
  if (Object.keys(ingredientsList).length !== 0) {
    list = Object.entries(ingredientsList).map(([uuid, ingredientItem]) => {
      return (
        <RecipeIngredient
          key={uuid}
          uuid={uuid}
          ingredientProp={ingredientItem}
          handleChange={handleUpdate}
          toEdit={toEdit}
        />
      );
    });
  } else {
  }

  useEffect(() => {
    if (Object.keys(ingredientsList).length === 0 && toEdit) {
      addIngredient();
    }
  }, [ingredientsList]);

  return (
    <section className="my-4">
      <div className="section-title">Ingredients</div>

      <div className="my-2">
        <ul className="my-4">{list}</ul>
      </div>
      {toEdit && (
        <button
          type="button"
          onClick={addIngredient}
          className="border-2 rounded border-orange-300 p-2 mx-4 hover:bg-orange-300/70 hover:text-white transition-all duration-200"
        >
          + Add Ingredient
        </button>
      )}
    </section>
  );
};

export default RecipeIngredients;
