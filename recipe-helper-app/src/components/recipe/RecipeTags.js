import React, { useEffect } from "react";
import RecipeTag from "./RecipeTag";
import "../../stylesheets/Recipe.css";

const RecipeTags = ({ tagsList, handleUpdate = () => {}, toEdit }) => {
  let addTag = (e) => {
    handleUpdate({
      type: "SET_TAG",
      payload: {},
    });
  };

  let list;
  if (tagsList.length !== 0) {
    list = Object.entries(tagsList).map(([uuid, tagItem]) => {
      return (
        <RecipeTag
          key={uuid}
          uuid={uuid}
          tagProp={tagItem}
          handleChange={handleUpdate}
          toEdit={toEdit}
        />
      );
    });
  }

  useEffect(() => {
    if (Object.keys(tagsList).length === 0 && toEdit) {
      addTag();
    }
  }, [tagsList]);

  return (
    <section className="my-4">
      <div className="p-4 flex flex-wrap gap-2 w-full lg:w-fit">{list}</div>

      {toEdit && (
        <button
          type="button"
          onClick={addTag}
          className="border-2 rounded border-orange-300 p-2 mx-4 hover:bg-orange-300/70 hover:text-white transition-all duration-200"
        >
          + Add Tag
        </button>
      )}
    </section>
  );
};

export default RecipeTags;
