import React from "react";

const timeStyles = "text-2xl p-4";
const inputStyles = "w-full p-4 text-2xl";

const RecipeTime = ({ time, handleUpdate = () => {}, toEdit = false }) => {
  let handleChange = (e) => {
    handleUpdate({ type: "SET_TIME", payload: { value: e.target.value } });
  };

  let timeElem;

  if (toEdit) {
    timeElem = time ? (
      <input
        type="text"
        className={inputStyles}
        onChange={handleChange}
        defaultValue={time}
      />
    ) : (
      <input
        type="text"
        className={inputStyles}
        onChange={handleChange}
        placeholder="1 hour prep, 30 minutes cooking"
      />
    );
  } else {
    timeElem = <div className={timeStyles}>{time}</div>;
  }

  return (
    <section className="w-full">
      <div className="section-title">Time to Cook</div>
      {timeElem}
    </section>
  );
};

export default RecipeTime;
