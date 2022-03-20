import React, { useState, useEffect } from "react";
import RecipeIngredient from "./RecipeIngredient";
import "../../stylesheets/Recipe.css";

const RecipeIngredients = ({
  ingredientsList,
  handleUpdate = () => {},
  toEdit,
}) => {
  let ingredientsElem;
  let itemId = 0;
  let updateIngredient = (dispatchObj) => {
    handleUpdate(dispatchObj);
  };

  let addIngredient = () => {
    let dispatchObj = {
      type: "SET_INGREDIENT",
      payload: { listId: itemId },
    };
    handleUpdate(dispatchObj);
    itemId++;
  };

  let placeholder;
  // cannot rely on state as it does not appear to update in time
  // for the next iteration, resulting in duplicate keys
  if (ingredientsList.length !== 0) {
    placeholder = ingredientsList.map((ingredientItem, index) => {
      let returnElem = (
        <RecipeIngredient
          key={itemId}
          listId={itemId}
          ingredientProp={ingredientItem}
          handleChange={updateIngredient}
          toEdit={toEdit}
        />
      );
      itemId++;
      return returnElem;
    });
  } else {
    addIngredient();
  }
  ingredientsElem = (
    <div className="recipe-ingredients">
      <ul>{placeholder}</ul>
    </div>
  );

  return (
    <section>
      <div className="section-title">Ingredients</div>

      {ingredientsElem}
      {toEdit && (
        <button type="button" onClick={addIngredient}>
          + Add Ingredient
        </button>
      )}
    </section>
  );
};

export default RecipeIngredients;
