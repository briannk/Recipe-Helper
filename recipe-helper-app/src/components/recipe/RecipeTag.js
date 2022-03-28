import React, { useRef } from "react";
import { VscChromeClose } from "react-icons/vsc";

const tagStyles =
  "border rounded-full flex justify-center items-center border-orange-400/90 bg-orange-400/90 hover:border-orange-300 hover:bg-orange-300 py-1 px-4 w-fit max-w-full text-white text-lg transition duration-200 cursor-pointer gap-2";
const inputStyles =
  "bg-transparent border-none focus:border-none focus:outline-none";

const RecipeTag = ({ uuid, tagProp, handleChange, toEdit = false }) => {
  let handleChangeSet = (e) => {
    handleChange({
      type: "SET_TAG",
      payload: { value: e.target.value, uuid },
    });
  };

  let handleChangeRemove = (e) => {
    handleChange({
      type: "REMOVE_TAG",
      payload: { value: e.target.value, uuid },
    });
  };

  let tagElem;

  if (toEdit) {
    tagElem = tagProp ? (
      <input
        className={inputStyles}
        onChange={handleChangeSet}
        value={tagProp}
        maxLength="32"
      />
    ) : (
      <input
        className={inputStyles}
        onChange={handleChangeSet}
        placeholder="Lunch"
        maxLength="32"
        value={""}
      />
    );
  } else {
    tagElem = tagProp;
  }

  return (
    <div className={tagStyles}>
      {tagElem}
      {toEdit && (
        <button
          type="button"
          onClick={handleChangeRemove}
          className="flex justify-center items-center"
        >
          <VscChromeClose size={32} />
        </button>
      )}
    </div>
  );
};

export default RecipeTag;
