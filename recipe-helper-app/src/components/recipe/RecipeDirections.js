import React, { useEffect } from "react";
import RecipeDirection from "./RecipeDirection";
import "../../stylesheets/Recipe.css";

const RecipeDirections = ({
  directionsList,
  handleUpdate = () => {},
  toEdit,
}) => {
  let addDirection = () => {
    handleUpdate({ type: "SET_DIRECTION", payload: {} });
  };

  let list = null;

  if (Object.keys(directionsList).length !== 0) {
    list = Object.entries(directionsList).map(([uuid, directionsItem]) => {
      let returnElem = (
        <li key={uuid}>
          <RecipeDirection
            uuid={uuid}
            directionProp={directionsItem}
            handleChange={handleUpdate}
            toEdit={toEdit}
          />
        </li>
      );
      return returnElem;
    });
  } else {
    if (!toEdit) {
      list = <div>No directions provided.</div>;
    }
  }

  useEffect(() => {
    if (Object.keys(directionsList).length === 0 && toEdit) {
      addDirection();
    }
  }, [directionsList]);

  return (
    <section className="my-4">
      <div className="section-title">Directions</div>
      <div className="my-2">
        <ol>{list}</ol>
      </div>

      {toEdit && (
        <button
          type="button"
          onClick={() => addDirection()}
          className="border-2 rounded border-orange-300 p-2 mx-4 hover:bg-orange-300/70 hover:text-white transition-all duration-200"
        >
          + Add Direction
        </button>
      )}
    </section>
  );
};

export default RecipeDirections;
