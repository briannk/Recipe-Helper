// component render error may be caused by reducer running and
// updating state before component finishes rendering

import React, { useState, useEffect } from "react";
import RecipeDirection from "./RecipeDirection";
import "../stylesheets/Recipe.css";

const RecipeDirections = ({
  directionsList,
  handleUpdate = () => {},
  toEdit,
}) => {
  // const [directionsNode, setDirectionsNode] = useState();
  // NOT the data for the Directions, stores the components
  // const [newDirection, setNewDirection] = useState([]);
  console.log("directionsList ", directionsList);
  console.log("toEdit", toEdit);
  // assigns incrementing keys to Direction list to track changes
  // const [itemId, setItemId] = useState(0);
  let directionsElem;
  let itemId = 0;
  let updateDirection = (dispatchObj) => {
    handleUpdate(dispatchObj);
  };

  let addDirection = () => {
    console.log("adding Direction");
    let dispatchObj = { type: "SET_DIRECTION", payload: { listId: itemId } };
    itemId++;
    handleUpdate(dispatchObj);
    // console.log("Directions: ", Directions);
    // setNewDirection([
    //   ...newDirection,
    //   <RecipeDirection
    //     key={itemId}
    //     listId={itemId}
    //     handleChange={updateDirection}
    //     toEdit
    //   />,
    // ]);
    // setItemId((prev) => {
    //   return prev + 1;
    // });
    // setItemId(itemId + 1);
    // console.log("new nodes: ", newDirection);
  };

  let placeholder;
  // cannot rely on state as it does not appear to update in time
  // for the next iteration, resulting in duplicate keys

  if (directionsList.length !== 0) {
    placeholder = directionsList.map((directionsItem, index) => {
      console.log("mappin");
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
      console.log("id updated to: ", itemId);
      return returnElem;
    });
    // setItemId(itemId);
  } else {
    console.log("else");
    addDirection();
  }
  directionsElem = (
    <div className="recipe-directions">
      <ol>{placeholder}</ol>
    </div>
  );

  // useEffect(() => {
  //   let placeholder;
  //   // cannot rely on state as it does not appear to update in time
  //   // for the next iteration, resulting in duplicate keys
  //   let itemId = 0;
  //   if (directionsList.length !== 0) {
  //     placeholder = directionsList.map((directionsItem, index) => {
  //       console.log("mappin");
  //       let returnElem = (
  //         <RecipeDirection
  //           key={itemId}
  //           listId={itemId}
  //           directionProp={directionsItem}
  //           handleChange={updateDirection}
  //           toEdit
  //         />
  //       );
  //       itemId++;
  //       console.log("id updated to: ", itemId);
  //       return returnElem;
  //     });
  //     setItemId(itemId);
  //   } else {
  //     console.log("else");
  //     addDirection();
  //   }
  //   directionsElem = <div className="recipe-directions">{placeholder}</div>;
  //   setDirectionsNode(directionsElem);
  // }, [directionsList]);

  useEffect(() => {
    console.log("use effect itemId: ", itemId);
  }, [directionsList]);

  return (
    <section>
      <div className="section-title">Directions</div>
      {directionsElem}
      {/* {newDirection} */}

      {toEdit && (
        <button type="button" onClick={addDirection}>
          + Add Direction
        </button>
      )}
    </section>
  );
};

export default RecipeDirections;
