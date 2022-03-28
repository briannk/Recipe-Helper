import React from "react";
import { CgCloseR } from "react-icons/cg";

const directionStyles = "p-2 flex gap-2";
const inputStyles = "p-2 h-16";

const RecipeDirection = ({
  uuid,
  directionProp,
  handleChange,
  toEdit = false,
}) => {
  let handleChangeSet = (e) => {
    handleChange({
      type: "SET_DIRECTION",
      payload: { value: e.target.value, uuid },
    });
  };

  let handleChangeRemove = (e) => {
    handleChange({
      type: "REMOVE_DIRECTION",
      payload: { uuid },
    });
  };
  let directionElem;

  if (toEdit) {
    directionElem = directionProp ? (
      <textarea
        className={inputStyles}
        onChange={handleChangeSet}
        value={directionProp}
        maxLength="256"
      />
    ) : (
      <textarea
        className={inputStyles}
        onChange={handleChangeSet}
        placeholder="Cook until 125F then deglaze the pan with mustard."
        maxLength="256"
      />
    );
  } else {
    directionElem = directionProp;
  }

  return (
    <div className={directionStyles}>
      {directionElem}
      {toEdit && (
        <button type="button" onClick={handleChangeRemove}>
          <CgCloseR size={24} />
        </button>
      )}
    </div>
  );
};

export default RecipeDirection;
