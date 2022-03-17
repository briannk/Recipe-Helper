import React, { useEffect, useRef } from "react";
import { TiDeleteOutline } from "react-icons/ti";

const RecipeIngredient = ({
  listId,
  ingredientProp,
  handleChange,
  toEdit = false,
}) => {
  let ingredientElem, ingredientElemItem;

  console.log("ingredientProp ", ingredientProp);
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
    // console.log("test: ", foo);
    let dispatchObj = {
      type: "REMOVE_INGREDIENT",
      payload: { target: target, listId },
    };
    handleChange(dispatchObj);
  };

  console.log("ingredient: ", toEdit);
  console.log("ingredient, listId: ", listId);

  let qMarker;
  let iMarker;

  let checkQEmpty = (node) => {
    qMarker = node;
  };
  let checkIEmpty = (node) => {
    iMarker = node;
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

    // ingredientElemItem = ingredientProp.ingredientName ? (
    //   <input
    //     ref={checkIEmpty}
    //     type="text"
    //     name="item"
    //     className="recipe-ingredient-item"
    //     value={ingredientProp.ingredientName}
    //     maxLength="128"
    //     onChange={handleChangeSet}
    //   />
    // ) : (
    //   <input
    //     ref={checkIEmpty}
    //     type="text"
    //     name="item"
    //     className="recipe-ingredient-item"
    //     onChange={handleChangeSet}
    //     placeholder="filet mignon"
    //     value={""}
    //     maxLength="128"
    //   />
    // );
  } else {
    ingredientElem = ingredientProp;
    // ingredientElemItem = (
    //   <div className="recipe-ingredient-item">
    //     {ingredientProp.ingredientName}
    //   </div>
    // );
  }

  useEffect(() => {
    if (ingredientProp === "") {
      let dummyObj = { target: qMarker };
      let dispatchObj = { payload: { event: dummyObj } };
      handleChange(dispatchObj);
    }
  }, [qMarker]);
  // useEffect(() => {
  //   if (ingredientProp.ingredientName === "") {
  //     let dummyObj = { target: iMarker };
  //     let dispatchObj = { payload: { event: dummyObj } };
  //     handleChange(dispatchObj);
  //   }
  // }, [iMarker]);

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
        {/* {ingredientElemItem} */}
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
