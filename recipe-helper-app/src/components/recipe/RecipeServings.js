import React, { useEffect } from "react";

const styles = "text-2xl p-4";

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
        className={styles}
        onChange={handleChange}
        defaultValue={servings}
      />
    ) : (
      <input
        ref={checkEmpty}
        type="text"
        className={styles}
        onChange={handleChange}
        placeholder="2"
      />
    );
  } else {
    servingsElem = <div className={styles}>{servings}</div>;
  }

  useEffect(() => {
    if (servings === "") {
      let dispatchObj = { payload: { event: { target: marker } } };
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
