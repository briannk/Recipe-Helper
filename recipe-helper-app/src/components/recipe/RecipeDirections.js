// component render error may be caused by reducer running and
// updating state before component finishes rendering

import React, { useState, useEffect } from "react";
import RecipeDirection from "./RecipeDirection";
import "../../stylesheets/Recipe.css";

const RecipeDirections = ({
  directionsList,
  handleUpdate = () => {},
  toEdit,
}) => {
  // assigns incrementing keys to Direction list to track changes
  // const [itemId, setItemId] = useState(0);
  let directionsElem;
  let itemId = 0;
  let updateDirection = (dispatchObj) => {
    handleUpdate(dispatchObj);
  };

  let addDirection = () => {
    let dispatchObj = { type: "SET_DIRECTION", payload: { listId: itemId } };
    itemId++;
    handleUpdate(dispatchObj);
  };

  let placeholder;
  // cannot rely on state as it does not appear to update in time
  // for the next iteration, resulting in duplicate keys

  if (directionsList.length !== 0) {
    placeholder = directionsList.map((directionsItem, index) => {
      let returnElem = (
        <RecipeDirection
          key={itemId}
          listId={itemId}
          directionProp={directionsItem}
          handleChange={updateDirection}
          toEdit={toEdit}
        />
      );
      itemId++;
      return returnElem;
    });
  } else {
    addDirection();
  }
  directionsElem = (
    <div className="recipe-directions">
      <ol>{placeholder}</ol>
    </div>
  );

  return (
    <section>
      <div className="section-title">Directions</div>
      {directionsElem}

      {toEdit && (
        <button type="button" onClick={addDirection}>
          + Add Direction
        </button>
      )}
    </section>
  );
};

export default RecipeDirections;
