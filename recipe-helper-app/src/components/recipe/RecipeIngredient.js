import React, { useEffect, useRef } from "react";
import { TiDeleteOutline } from "react-icons/ti";

const RecipeIngredient = ({
  listId,
  ingredientProp,
  handleChange,
  toEdit = false,
}) => {
  let ingredientElem;

  // wrapper to avoid having to use arrow function in onchange
  let handleChangeSet = (e) => {
    // if(e.target.value === ""){
    //   return false;
    // }
    let dispatchType;
    if (e.target.name === "ingredient") {
      dispatchType = "SET_INGREDIENT";
    } else if (e.target.name === "item") {
      dispatchType = "SET_INGREDIENT_ITEM";
    } else {
      console.log("no dispatch type");
      return;
    }
    let dispatchObj = { type: dispatchType, payload: { event: e, listId } };
    handleChange(dispatchObj);
  };

  let handleChangeRemove = (e) => {
    // pass the target as opposed to e since currentTarget
    // is resolved during event propagation and won't be
    // available once passed
    let target = e.currentTarget;
    let dispatchObj = {
      type: "REMOVE_INGREDIENT",
      payload: { target: target, listId },
    };
    handleChange(dispatchObj);
  };

  let qMarker;

  let checkQEmpty = (node) => {
    qMarker = node;
  };

  if (toEdit) {
    ingredientElem = ingredientProp ? (
      <input
        ref={checkQEmpty}
        type="text"
        name="ingredient"
        className="recipe-ingredient"
        value={ingredientProp}
        onChange={handleChangeSet}
      />
    ) : (
      <input
        ref={checkQEmpty}
        type="text"
        name="ingredient"
        className="recipe-ingredient"
        onChange={handleChangeSet}
        placeholder="8 oz steak"
        value={""}
      />
    );
  } else {
    ingredientElem = ingredientProp;
  }

  useEffect(() => {
    if (ingredientProp === "") {
      let dispatchObj = { payload: { event: { target: qMarker } } };
      handleChange(dispatchObj);
    }
  }, [qMarker]);

  return (
    <li>
      <div className="recipe-ingredient">
        {
          // checkboxes are cosmetic
          !toEdit && (
            <input
              type="checkbox"
              onClick={(e) => {
                e.target.parentNode.classList.toggle("checked");
              }}
            />
          )
        }
        {ingredientElem}
        {toEdit && (
          <button type="button" onClick={handleChangeRemove}>
            <TiDeleteOutline />
          </button>
        )}
      </div>
    </li>
  );
};

export default RecipeIngredient;
