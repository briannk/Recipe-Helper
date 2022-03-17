import React, { useRef, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";

const RecipeTag = ({ listId, tagProp, handleChange, toEdit = false }) => {
  console.log("toEdit ", toEdit);
  let handleChangeSet = (e) => {
    let dispatchObj = {
      type: "SET_TAG",
      payload: { node: e.currentTarget, listId },
    };
    handleChange(dispatchObj);
  };

  let handleChangeRemove = (e) => {
    // pass the target as opposed to e since currentTarget
    // is resolved during event propagation and won't be
    // available once passed
    let target = e.currentTarget;
    // console.log("test: ", foo);
    let dispatchObj = {
      type: "REMOVE_TAG",
      payload: { target: target, listId },
    };
    handleChange(dispatchObj);
  };

  let marker = useRef(null);

  let checkEmpty = (node) => {
    marker = node;
  };

  let tagElem;

  if (toEdit) {
    tagElem = tagProp ? (
      <input
        ref={checkEmpty}
        className="recipe-tag"
        onChange={handleChangeSet}
        value={tagProp}
        maxLength="32"
      />
    ) : (
      <input
        ref={checkEmpty}
        className="recipe-tag"
        onChange={handleChangeSet}
        placeholder="Lunch"
        maxLength="32"
        value={""}
      />
    );
  } else {
    tagElem = tagProp;
  }

  useEffect(() => {
    if (tagProp === "") {
      let dummyObj = { target: marker };
      console.log("!!!dummyObj ", dummyObj);
      let dispatchObj = { payload: { event: dummyObj } };
      handleChange(dispatchObj);
    }
  }, [marker]);

  return (
    <div className="recipe-tag">
      {tagElem}
      {toEdit && (
        <button type="button" onClick={handleChangeRemove}>
          <TiDeleteOutline />
        </button>
      )}
    </div>
  );
};

export default RecipeTag;
