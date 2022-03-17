import React, { useEffect } from "react";

const RecipeServings = ({
  servings,
  handleUpdate = () => {},
  toEdit = false,
}) => {
  let handleChange = (e) => {
    let dispatchObj = { type: "SET_SERVINGS", payload: { event: e } };
    handleUpdate(dispatchObj);
  };
  let servingsElem;
  let marker;

  let checkEmpty = (node) => {
    marker = node;
  };

  if (toEdit) {
    servingsElem = servings ? (
      <input
        ref={checkEmpty}
        type="text"
        className="recipe-servings"
        onChange={handleChange}
        defaultValue={servings}
      />
    ) : (
      <input
        ref={checkEmpty}
        type="text"
        className="recipe-servings"
        onChange={handleChange}
        placeholder="2"
      />
    );
  } else {
    servingsElem = <div className="recipe-servings">{servings}</div>;
  }

  useEffect(() => {
    if (servings === "") {
      let dummyObj = { target: marker };
      console.log("!!!dummyObj ", dummyObj);
      let dispatchObj = { payload: { event: dummyObj } };
      handleUpdate(dispatchObj);
    }
  }, [marker]);
  return (
    <section>
      <div className="section-title">Servings</div>
      {servingsElem}
    </section>
  );
};

export default RecipeServings;
