import React, { useRef, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";

const RecipeDirection = ({
  listId,
  directionProp,
  handleChange,
  toEdit = false,
}) => {
  console.log("toEdit ", toEdit);
  let handleChangeSet = (e) => {
    let dispatchObj = {
      type: "SET_DIRECTION",
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
      type: "REMOVE_DIRECTION",
      payload: { event: target, listId },
    };
    handleChange(dispatchObj);
  };

  let marker = useRef(null);

  let checkEmpty = (node) => {
    marker = node;
  };

  let directionElem;

  if (toEdit) {
    directionElem = directionProp ? (
      <textarea
        ref={checkEmpty}
        className="recipe-direction"
        onChange={handleChangeSet}
        value={directionProp}
        maxLength="256"
      />
    ) : (
      <textarea
        ref={checkEmpty}
        className="recipe-direction"
        onChange={handleChangeSet}
        placeholder="Cook until 125F then deglaze the pan with mustard."
        maxLength="256"
      />
    );
  } else {
    directionElem = <div className="recipe-direction">{directionProp}</div>;
  }

  useEffect(() => {
    if (directionProp === "") {
      let dummyObj = { target: marker };
      console.log("!!!dummyObj ", dummyObj);
      let dispatchObj = { payload: { target: dummyObj } };
      handleChange(dispatchObj);
    }
  }, [marker]);

  return (
    <li>
      <div className="recipe-direction">
        {directionElem}
        {toEdit && (
          <button type="button" onClick={handleChangeRemove}>
            <TiDeleteOutline />
          </button>
        )}
      </div>
    </li>
  );
};

export default RecipeDirection;
