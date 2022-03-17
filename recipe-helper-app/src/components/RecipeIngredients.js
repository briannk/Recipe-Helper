import React, { useState, useEffect } from "react";
import RecipeIngredient from "./RecipeIngredient";
import "../stylesheets/Recipe.css";

const RecipeIngredients = ({
  ingredientsList,
  handleUpdate = () => {},
  toEdit,
}) => {
  // const [ingredientsNode, setIngredientsNode] = useState();
  // NOT the data for the ingredients, stores the components
  // const [newIngredient, setNewIngredient] = useState([]);
  console.log("ingredientsList ", ingredientsList);
  // assigns incrementing keys to ingredient list to track changes
  // const [itemId, setItemId] = useState(0);
  let ingredientsElem;
  let itemId = 0;
  let updateIngredient = (dispatchObj) => {
    // make reducer to check input type and update appropriate attribute
    // update the ingredient, then update its state to pass back to parent
    handleUpdate(dispatchObj);
  };

  let addIngredient = () => {
    console.log("adding ingredient");
    // console.log("ingredients: ", ingredients);
    // setNewIngredient([
    //   ...newIngredient,
    //   <RecipeIngredient
    //     key={itemId}
    //     listId={itemId}
    //     handleChange={updateIngredient}
    //     toEdit
    //   />,
    // ]);
    // setItemId((prev) => {
    //   return prev + 1;
    // });
    // // setItemId(itemId + 1);
    // console.log("new nodes: ", newIngredient);
    let dispatchObj = {
      type: "SET_INGREDIENT",
      payload: { listId: itemId },
    };

    handleUpdate(dispatchObj);

    // dispatchObj = {
    //   type: "SET_INGREDIENT_ITEM",
    //   payload: { listId: itemId },
    // };

    // handleUpdate(dispatchObj);

    itemId++;
  };

  let placeholder;
  // cannot rely on state as it does not appear to update in time
  // for the next iteration, resulting in duplicate keys

  // setItemId(0);
  if (ingredientsList.length !== 0) {
    console.log("if");
    placeholder = ingredientsList.map((ingredientItem, index) => {
      console.log("mappin");
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
      console.log("id updated to: ", itemId);
      // setItemId(itemId + 1);
      return returnElem;
    });
    // setItemId(itemId);
  } else {
    console.log("else");
    addIngredient();
  }
  ingredientsElem = (
    <div className="recipe-ingredients">
      <ul>{placeholder}</ul>
    </div>
  );

  // useEffect(() => {
  //   let placeholder;
  //   // cannot rely on state as it does not appear to update in time
  //   // for the next iteration, resulting in duplicate keys
  //   let itemId = 0;
  //   // setItemId(0);
  //   if (ingredientsList.length !== 0) {
  //     console.log("if");
  //     placeholder = ingredientsList.map((ingredientItem, index) => {
  //       console.log("mappin");
  //       let returnElem = (
  //         <RecipeIngredient
  //           key={itemId}
  //           listId={itemId}
  //           ingredientProp={ingredientItem}
  //           handleChange={updateIngredient}
  //           toEdit
  //         />
  //       );
  //       itemId++;
  //       console.log("id updated to: ", itemId);
  //       // setItemId(itemId + 1);
  //       return returnElem;
  //     });
  //     setItemId(itemId);
  //   } else {
  //     console.log("else");
  //     addIngredient();
  //   }
  //   ingredientsElem = <div className="recipe-ingredients">{placeholder}</div>;
  //   setIngredientsNode(ingredientsElem);
  //   console.log("ingredientsElem: ", ingredientsElem);
  // }, [ingredientsList]);

  useEffect(() => {
    console.log("use effect itemId: ", itemId);
  }, [itemId]);

  return (
    <section>
      <div className="section-title">Ingredients</div>

      {ingredientsElem}
      {/* {newIngredient} */}
      {toEdit && (
        <button type="button" onClick={addIngredient}>
          + Add Ingredient
        </button>
      )}
    </section>
  );
};

export default RecipeIngredients;
