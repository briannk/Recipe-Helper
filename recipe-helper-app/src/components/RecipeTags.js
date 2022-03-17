import React from "react";
import RecipeTag from "./RecipeTag";
import "../stylesheets/Recipe.css";

const RecipeTags = ({ tagsList, handleUpdate = () => {}, toEdit }) => {
  let tagsElem;
  let itemId = 0;

  let updateTag = (dispatchObj) => {
    handleUpdate(dispatchObj);
  };

  let addTag = () => {
    let dispatchObj = {
      type: "SET_TAG",
      payload: { listId: itemId },
    };
    handleUpdate(dispatchObj);
    itemId++;
  };

  let temp;
  if (tagsList.length !== 0) {
    temp = tagsList.map((tagItem) => {
      let returnElem = (
        <RecipeTag
          key={itemId}
          listId={itemId}
          tagProp={tagItem}
          handleChange={updateTag}
          toEdit={toEdit}
        />
      );
      itemId++;
      return returnElem;
    });
  } else {
    addTag();
  }

  tagsElem = <div className="recipe-tags">{temp}</div>;

  return (
    <section>
      {tagsElem}
      {toEdit && (
        <button type="button" onClick={addTag}>
          + Add Tag
        </button>
      )}
    </section>
  );
};

export default RecipeTags;
