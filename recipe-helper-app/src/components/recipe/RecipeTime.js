import React, { useEffect } from "react";

const styles = "text-2xl p-4";

const RecipeTime = ({ time, handleUpdate = () => {}, toEdit = false }) => {
  let handleChange = (e) => {
    let dispatchObj = { type: "SET_TIME", payload: { event: e } };
    handleUpdate(dispatchObj);
  };

  let timeElem;
  let marker;

  let checkEmpty = (node) => {
    marker = node;
  };

  if (toEdit) {
    timeElem = time ? (
      <div className="recipe-time">
        <input
          ref={checkEmpty}
          type="text"
          className={styles}
          onChange={handleChange}
          defaultValue={time}
        />
      </div>
    ) : (
      <div className="recipe-time">
        <input
          ref={checkEmpty}
          type="text"
          className={styles}
          onChange={handleChange}
          placeholder="1 hour prep, 30 minutes cooking"
        />
        {/* H
            <input
              type="text"
              className="recipe-time-minutes"
              placeholder="30"
              maxlength="59"
            />
            M */}
      </div>
    );
  } else {
    timeElem = <div className={styles}>{time}</div>;
  }

  useEffect(() => {
    if (time === "") {
      let dispatchObj = { payload: { event: { target: marker } } };
      handleUpdate(dispatchObj);
    }
  }, [marker]);
  return (
    <section>
      <div className="section-title">Time to Cook</div>
      {timeElem}
    </section>
  );
};

export default RecipeTime;
